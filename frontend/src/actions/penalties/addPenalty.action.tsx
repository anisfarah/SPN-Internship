'use server';

import { AddPenalty } from '@/services/penalty.service';
import validateData from '@/utils/validateSchema';
import AddPenaltySchema from '@/validations/penalties/addPenalty.validation';
import { redirect } from 'next/navigation';
import Groq from "groq-sdk";

const groq = new Groq({ apiKey: process.env.NEXT_PUBLIC_GROQ_API_KEY });

interface PipelineData {
  image_url: string;
  extracted_text?: string;
  error?: string;
}

export const addPenaltyAction = async (
  step: number,
  imageLink: string,
  initialState: Record<string, any> = {},
  formData: FormData
): Promise<any> => {
  let addPenaltyResponse;
  const formDataObject: Record<string, any> = {};
  formData.forEach((value, key) => {
    if (key !== 'penaltyDocument' && !key.startsWith('$ACTION_')) {
      formDataObject[key] = value || null;
    }
  });

  console.log('🚀 ~ Converted FormData Object:', formDataObject);

  if (step === 0) {
    const file = formData.get('penaltyDocument');
    if (!file ) {
      throw new Error('Image file not found or invalid.');
    }

    const apiFormData = new FormData();
    apiFormData.append('file', file);

    const pipelineResponse = await fetch('http://127.0.0.1:8000/pipeline-document/', {
      method: 'POST',
      body: apiFormData,
    });

    if (!pipelineResponse.ok) {
      throw new Error(`HTTP error! status: ${pipelineResponse.status}`);
    }

    const pipelineData = await pipelineResponse.json() as PipelineData;

    if (pipelineData.error) {
      throw new Error(`Error processing the image: ${pipelineData.error}`);
    }

    const imageUrl = pipelineData.image_url;
    const extractedText = pipelineData.extracted_text;

    console.log('🚀 ~ Pipeline Data:', pipelineData);

    // Step 2: Send extracted text to Groq API to detect specific fields
    const prompt = `
    ### Instruction:
    You are given a user utterance that may contain car penalty violation details.
    Your task is to detect and identify all instances of the supplied Car Penalty Violation details entity types in the user utterance.
    
    List Of Entities:
    - id_penalty: Contravention notice number (only numeric characters).
    - registration: Registration of a car.
    - date_time: Dates and times of the offense.
    - location: Location of the offense.
    - description: Offense description.
    - amount: The monetary value of the fine (numeric value).
    - currency: The currency symbol or abbreviation (CHF, EUR, $, £, etc.).

    Respond in the following JSON format without any additional text:
    {
      "id_penalty": "value",
      "registration": "value",
      "date_time": "value",
      "location": "value",
      "description": "value",
      "amount": "value",
      "currency": "value"
    }

    Strictly output only JSON.
    ### utterance:
    ${extractedText}
    `;

    // Using the Groq SDK for chat completion
    let groqData;
    try {
      groqData = await groq.chat.completions.create({
        messages: [{ role: "user", content: prompt }],
        model: "llama3-8b-8192",
      });
    } catch (error) {
      console.error('Groq API error:', error);
      throw new Error(`Groq API error: ${error}`);
    }

    // Extract fields from Groq response
    const responseContent = groqData.choices[0]?.message?.content;
    let extractedFields = {};

    try {
      extractedFields = JSON.parse(responseContent || "{}");
    } catch (error) {
      console.error("Error parsing Groq response as JSON:", error);
      throw new Error("Groq response is not in JSON format.");
    }

    console.log("🚀 ~ Extracted Fields from Groq:", extractedFields);

    // Ensure extractedFields.amount is a string
    const amountField = extractedFields.amount ? String(extractedFields.amount) : '';

    // Use regular expressions to extract only the numeric amount and the currency
    const amountPattern = /(\d+(?:[.,]\d+)?)/;  // This extracts numeric values including decimals
    const currencyPattern = /(CHF|EUR|[$£€])/i; // This extracts currency symbols

    const amountMatch = amountField.match(amountPattern);
    const currencyMatch = amountField.match(currencyPattern);

    const amount = amountMatch ? amountMatch[0].replace(',', '.') : '';  // Convert any commas to dots for decimals
    const currency = currencyMatch ? currencyMatch[0] : extractedFields.currency || '';

    // Redirect to the next step, passing the extracted fields as URL parameters
    const query = new URLSearchParams({
      step: '1',
      image_url: encodeURIComponent(imageUrl),
      typePenalty: extractedFields.description || '',
      locationPenalty: extractedFields.location || '',
      InfractionNumberPenalty: extractedFields.id_penalty || '',
      CarPenalty: extractedFields.registration || '',
      AmountPenalty: amount || '',  // Use extracted numeric amount
      CurrencyPenalty: currency || ''  // Use extracted currency
    }).toString();
    
    redirect(`/cars-limousines/penalties/add?${query}`);
    
  } else if (step === 1) {
    // Decode the image_url from the URL parameters and add it to the formDataObject
    const imageUrl = decodeURIComponent(imageLink);
    if (!imageUrl) {
      console.log('🚀 ~ Initial State:', initialState);
      throw new Error('Missing image URL from the previous step.');
    }

    // Ensure the image_url is included in the final data sent to the backend
    const penaltyData = {
      Type: formDataObject.typePenalty,
      Location: formDataObject.locationPenalty,
      Infraction_number: formDataObject.InfractionNumberPenalty,
      Car: formDataObject.CarPenalty,
      Car_plate_number: formDataObject.CarPlateNumberPenalty || '',
      Infraction_date: formDataObject.InfractionDatePenalty || new Date().toISOString(),
      Amount: formDataObject.AmountPenalty,
      Currency: formDataObject.CurrencyPenalty,
      ExtractedImagePath: imageUrl  // Include the image URL here
    };

    const formValidation = validateData(penaltyData, AddPenaltySchema);
    if (formValidation !== null) {
      return formValidation;
    }

    try {
      addPenaltyResponse = await AddPenalty(penaltyData);
    } catch (error) {
      return { status: 500, alert: 'An unexpected error occurred.' };
    }

    if (addPenaltyResponse.status === 200 || addPenaltyResponse.status === 201) {
      console.log('🚀 ~ Penalty added successfully:', penaltyData);
      redirect('/cars-limousines/penalties');
    } else {
      console.log('🚀 ~ Error adding penalty:', addPenaltyResponse.alert);
      console.log('🚀 ~ Full Response:', addPenaltyResponse);
      return addPenaltyResponse;
    }
  }

  return addPenaltyResponse;
};
