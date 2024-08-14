'use server';

import processFormData from '@/utils/cleanFormData';
import validateData from '@/utils/validateSchema';
import AddPenaltySchema from '@/validations/penalties/addPenalty.validation';
import { redirect } from 'next/navigation';

export const addPenaltyAction = async (
  addPenaltyConfig: any,
  initialState: any,
  formData: FormData
): Promise<any> => {
  let addPenaltyResponse = initialState;

  // Define formDataObject as a record with string keys and any values
  const formDataObject: Record<string, any> = {};

  // Convert FormData to a plain object
  formData.forEach((value, key) => {
    formDataObject[key] = value || null; // Set to null if empty
  });

  console.log('🚀 ~ Converted FormData Object:', formDataObject);

  // Ensure numerical fields are converted
  if (formDataObject.InfractionNumberPenalty) {
    formDataObject.InfractionNumberPenalty = Number(formDataObject.InfractionNumberPenalty);
  }

  if (formDataObject.AmountPenalty) {
    formDataObject.AmountPenalty = Number(formDataObject.AmountPenalty);
  }

  // Remove empty or null fields if you want to exclude them
  for (const key in formDataObject) {
    if (formDataObject[key] === null) {
      delete formDataObject[key];
    }
  }

  // Validate the processed data
  const formValidation = validateData(formDataObject, AddPenaltySchema);

  if (formValidation !== null) {
    return formValidation;
  }

  try {
    // Simulate API call to add penalty (Replace with real API call)
    addPenaltyResponse = { status: 200, data: formDataObject };
  } catch (error) {
    return { status: 500, alert: 'Something went wrong' };
  }

  if (addPenaltyResponse.status === 200 || addPenaltyResponse.status === 201) {
    console.log('🚀 ~ Penalty added successfully:', formDataObject);
    redirect('/cars-limousines/penalties');
  } else {
    console.log('🚀 ~ Error adding penalty:', addPenaltyResponse.alert);
    return addPenaltyResponse;
  }
};
