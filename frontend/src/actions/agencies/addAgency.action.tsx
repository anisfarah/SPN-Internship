'use server';

import { AddAgency } from '@/services/agency.service';
import processFormData from '@/utils/cleanFormData';
import validateData from '@/utils/validateSchema';
import AddAgencySchema from '@/validations/agencies/addAgency.validation';
import { redirect } from 'next/navigation';

export const addAgencyAction = async (
  addAgencyConfig: any,
  initialState: any,
  formData: FormData
): Promise<any> => {
  let addAgencyResponse = initialState;

  console.log('🚀 ~ :', formData);
  const formDataObject = processFormData(formData, addAgencyConfig);

  const locations: any = JSON.parse(formDataObject.locations as string) as string;
  formDataObject.locations = locations.filter((value: any) => value.country !== '');
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
  }
  const formValidation = validateData(formDataObject, AddAgencySchema);
  // const validationResult = AddAgencySchema.safeParse(Object.fromEntries(formData));

  if (formValidation !== null) {
    return formValidation;
  }

  try {
    addAgencyResponse = await AddAgency(formDataObject);
  } catch (error) {
    return { status: 500, alert: 'Something went wrong' };
  }

  // If the request was successful, redirect to the login page else return the result (will be displayed in the alert component)
  if (addAgencyResponse.status === 200 || addAgencyResponse.status === 201) {
    // redirect('/manage-users/agencies');
    redirect('/accommodations/agencies');
  } else {
    return addAgencyResponse;
  }
};
