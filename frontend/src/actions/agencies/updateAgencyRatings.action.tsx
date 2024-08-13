'use server';

import { UpdateAgencyInfo } from '@/services/agency.service';
import processFormData from '@/utils/cleanFormData';
import { revalidateCurrentPath } from '@/utils/revalidateCurrentPath';
import validateData from '@/utils/validateSchema';
import { updateAgencyRatingsSchema } from '@/validations/agencies/updateAgency.validation';

export const UpdateAgencyRatingsAction = async (
  updateRatingConfig: any,
  initialState: any,
  formData: FormData
): Promise<any> => {
  let updateAgencyRatingsResponse = initialState;
  // Clean and process the form data
  const formDataObject = processFormData(formData, updateRatingConfig);

  const formValidation = validateData(formDataObject, updateAgencyRatingsSchema);
  // If the validation fails, return the validation errors
  if (formValidation !== null) {
    return formValidation;
  }

  try {
    // Make a request to the backend to complete profile
    const agencyId = formData.get('id') as string;
    const rating = { rating: formDataObject };
    updateAgencyRatingsResponse = await UpdateAgencyInfo(rating, agencyId);
  } catch (error) {
    // If there is an error, return an error message
    return { status: 500, alert: 'Something went wrong' };
  }
  // If the request was successful, redirect to the login page else return the result (will be displayed in the alert component)
  if (updateAgencyRatingsResponse.status === 200) {
    revalidateCurrentPath();
  } else {
    return updateAgencyRatingsResponse;
  }
};
