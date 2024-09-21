'use server';

import { EditLocation } from '@/services/agency.service';
import processFormData from '@/utils/cleanFormData';
import { revalidateCurrentPath } from '@/utils/revalidateCurrentPath';
import validateData from '@/utils/validateSchema';
import { locationSchema } from '@/validations/agencies/updateAgency.validation';

//TODO: correct validation
export const EditAgencyLocationAction = async (
  editLocationConfig: any,
  agencyId: string,
  index: number,
  initialState: any,
  formData: FormData
): Promise<any> => {
  let updateAgencyLocationsResponse = initialState;

  const formDataObject = processFormData(formData, editLocationConfig);

  formDataObject.location = (JSON.parse(formDataObject.location) as any[])[0];
  const formValidation = validateData(formDataObject, locationSchema);

  if (formValidation !== null) {
    return formValidation;
  }
  try {
    updateAgencyLocationsResponse = await EditLocation(formDataObject.location, index, agencyId);
  } catch (error) {
    return { status: 500, alert: 'Something went wrong' };
  }

  // If the request was successful, redirect to the login page else return the result (will be displayed in the alert component)
  if (updateAgencyLocationsResponse.status === 200) {
    revalidateCurrentPath();
  }

  return updateAgencyLocationsResponse;
};
