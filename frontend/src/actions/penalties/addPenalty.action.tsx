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

  console.log('🚀 ~ :', formData);
  const formDataObject = processFormData(formData, addPenaltyConfig);

  let location = formDataObject.locationPenalty;

  if (formDataObject.InfractionNumberPenalty) {
    formDataObject.InfractionNumberPenalty = Number(formDataObject.InfractionNumberPenalty);
  }


  // Remove any unnecessary fields
  for (const key in formDataObject) {
    if (formDataObject[key] === '' || formDataObject[key] === null) {
      delete formDataObject[key];
    }
  }

  // Validate the data
  const formValidation = validateData(formDataObject, AddPenaltySchema);

  if (formValidation !== null) {
    return formValidation;
  }

  try {
    // Call API to add penalty
    addPenaltyResponse = { status: 200, data: formDataObject };
  } catch (error) {
    return { status: 500, alert: 'Something went wrong' };
  }

  if (addPenaltyResponse.status === 200 || addPenaltyResponse.status === 201) {
    redirect('/cars-limousines/penalties');
  } else {
    return addPenaltyResponse;
  }
};

