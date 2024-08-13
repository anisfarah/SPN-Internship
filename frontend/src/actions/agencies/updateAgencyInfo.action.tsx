'use server';

import { UpdateAgencyInfo } from '@/services/agency.service';
import processFormData from '@/utils/cleanFormData';
import { slugify } from '@/utils/inputHelpers';
import { revalidateCurrentPath } from '@/utils/revalidateCurrentPath';
import validateData from '@/utils/validateSchema';
import updateAgencyInfoSchema from '@/validations/agencies/updateAgency.validation';
import { redirect } from 'next/navigation';

export const UpdateAgencyInfoAction = async (
  updateAgencyConfig: any,
  agencyName: string,
  initialState: any,
  formData: FormData
): Promise<any> => {
  let updateAgencyInfoResponse = initialState;

  // const updateAgencyConfig = await getUpdateAgencyInfoConfigFromData(agencyData);

  const formDataObject = processFormData(formData, updateAgencyConfig);
  const phoneNumber: any = JSON.parse(formDataObject.phoneNumber as string) as any;
  formDataObject.phoneNumber = phoneNumber.phone !== '' ? phoneNumber : null;
  for (const key in formDataObject) {
    if (
      (formDataObject[key] === '' && key !== 'name') ||
      formDataObject[key] === null ||
      key === 'country' ||
      key === 'cities'
    ) {
      delete formDataObject[key];
    }
  }
  if (formDataObject['catalog']) {
    const catalog = formDataObject['catalog']?.split(',');
    formDataObject['catalog'] = catalog;
  } else {
    formDataObject['catalog'] = [];
  }
  const formValidation = validateData(formDataObject, updateAgencyInfoSchema);

  if (formValidation !== null) {
    return formValidation;
  }

  try {
    const agencyId = formDataObject.id;
    delete formDataObject.id;
    updateAgencyInfoResponse = await UpdateAgencyInfo(formDataObject, agencyId);
  } catch (error) {
    return { status: 500, alert: 'Something went wrong' };
  }

  if (updateAgencyInfoResponse.status === 200) {
    if (formDataObject['name'] !== agencyName) {
      const slug = slugify(formDataObject.name);
      redirect(`${slug}?tab=profile&tab2=contact`);
    } else {
      revalidateCurrentPath();
    }
  } else {
    return updateAgencyInfoResponse;
  }
};
