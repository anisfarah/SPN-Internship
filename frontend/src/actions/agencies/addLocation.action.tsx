'use server';

import { AddLocation } from '@/services/agency.service';
import processFormData from '@/utils/cleanFormData';
import { revalidateCurrentPath } from '@/utils/revalidateCurrentPath';
import validateData from '@/utils/validateSchema';
import { locationSchema } from '@/validations/agencies/updateAgency.validation';

export const addLocationAction = async (
  addAgencyLocationConfig: any,
  agencyId: string,
  initialState: any,
  formData: FormData
): Promise<any> => {
  let addLocationToAgencyResponse = initialState;

  const formDataObject = processFormData(formData, addAgencyLocationConfig);

  formDataObject.location = (JSON.parse(formData.get('location') as string) as any[])[0];
  const formValidation = validateData(formDataObject, locationSchema);
  if (formValidation !== null) {
    return formValidation;
  }
  try {
    addLocationToAgencyResponse = await AddLocation(formDataObject.location, agencyId);
  } catch (error) {
    return { status: 500, alert: 'Something went wrong' };
  }

  if (addLocationToAgencyResponse.status === 200) {
    revalidateCurrentPath();
  }

  return addLocationToAgencyResponse;
};
