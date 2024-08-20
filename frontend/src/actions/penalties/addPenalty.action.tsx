'use server';

import { extractDocument, extractText, AddPenalty } from '@/services/penalty.service';
import validateData from '@/utils/validateSchema';
import AddPenaltySchema from '@/validations/penalties/addPenalty.validation';
import { redirect } from 'next/navigation';

export const addPenaltyAction = async (
  step: number,
  initialState: any,
  formData: FormData
): Promise<any> => {
  let addPenaltyResponse;

  if (step === 0) {
    const penaltyDocument = formData.get('penaltyDocument');

    // Validate the file object by checking for typical File properties
    if (!penaltyDocument || typeof penaltyDocument !== 'object' || !('name' in penaltyDocument)) {
      console.error('FormData does not contain a valid file under the key "penaltyDocument".');
      return { status: null, alert: 'Please upload a valid document.' };
    }

    const extractedDocument = await extractDocument(penaltyDocument as File);
    if (!extractedDocument) {
      return { status: null, alert: 'Document extraction failed' };
    }

    // Pass the extracted document Blob to the extractText function
    const extractedText = await extractText(extractedDocument);
    if (!extractedText) {
      return { status: null, alert: 'Text extraction failed' };
    }

    console.log('Extracted text:', extractedText);

    // You can store or use the extracted text here
    addPenaltyResponse = { status: 100, alert: '' };
    redirect(`/cars-limousines/penalties/add?step=1`);

  } else if (step === 1) {
    // Convert FormData to an object
    const formDataObject: Record<string, any> = {};
    formData.forEach((value, key) => {
      formDataObject[key] = value || null;
    });

    // Convert numerical fields
    if (formDataObject.InfractionNumberPenalty) {
      formDataObject.InfractionNumberPenalty = Number(formDataObject.InfractionNumberPenalty);
    }
    if (formDataObject.AmountPenalty) {
      formDataObject.AmountPenalty = Number(formDataObject.AmountPenalty);
    }

    // Remove empty fields
    for (const key in formDataObject) {
      if (formDataObject[key] === null) {
        delete formDataObject[key];
      }
    }

    // Log the data being sent
    console.log('Sending data to AddPenalty:', formDataObject);

    // Validate the form data
    const formValidation = validateData(formDataObject, AddPenaltySchema);
    if (formValidation !== null) {
      return formValidation;
    }

    // Add the penalty using the AddPenalty service
    const response = await AddPenalty({
      Type: formDataObject.typePenalty,
      Location: formDataObject.locationPenalty,
      Infraction_number: formDataObject.InfractionNumberPenalty,
      Car: formDataObject.CarPenalty,
      Car_plate_number: formDataObject.CarPlateNumberPenalty,  // Include this if needed
      Infraction_date: formDataObject.InfractionDatePenalty || new Date().toISOString(),
      Amount: formDataObject.AmountPenalty,
      Currency: formDataObject.CurrencyPenalty,
    });

    // Log the response from the server
    console.log('Response from AddPenalty:', response);

    if (response.status === 200) {
      console.log('Redirecting to penalties list');
      redirect('/cars-limousines/penalties');
    } else {
      console.error('Failed to add penalty:', response.alert);
      return { status: response.status, alert: response.alert };
    }
  }

  return addPenaltyResponse;
};