'use server';

import { AddPenalty } from '@/services/penalty.service';
import validateData from '@/utils/validateSchema';
import AddPenaltySchema from '@/validations/penalties/addPenalty.validation';
import { redirect } from 'next/navigation';

interface PipelineData {
  image_url: string;
  extracted_text?: string;
  error?: string;
}

export const addPenaltyAction = async (
  step: number,
  imageLink:string,
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
    if (!file || !(file instanceof File)) {
      throw new Error('Image file not found or invalid.');
    }

    const apiFormData = new FormData();
    apiFormData.append('file', file);

    const pipelineResponse = await fetch('http://localhost:8000/pipeline-document/', {
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

    console.log('🚀 ~ Pipeline Data:', pipelineData);

    // Redirect to the next step, passing the image_url via the URL parameters
    redirect(`/cars-limousines/penalties/add?step=1&image_url=${encodeURIComponent(imageUrl)}`);

  } else if (step === 1) {
    // Decode the image_url from the URL parameters and add it to the formDataObject
    // const encodedImageUrl = formData.get('image_url') as string;
    const imageUrl = decodeURIComponent(imageLink);
    if (!imageUrl) {
      console.log('🚀 ~ Initial State:', initialState);
      throw new Error('Missing image URL from the previous step.');
    }

    // Add the image_url to the formDataObject
    formDataObject.ExtractedImagePath = imageUrl;

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
      ExtractedImagePath: imageUrl,  // Make sure the image URL is included here
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