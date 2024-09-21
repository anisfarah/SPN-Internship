'use server';

import getContactConfig from '@/forms/agencies/addContact.config';
import { UpdateAgencyInfo } from '@/services/agency.service';
import { validationError } from '@/types/validation.type';
import processFormData from '@/utils/cleanFormData';
import { refreshCurrentPage } from '@/utils/revalidateCurrentPath';
import validateData from '@/utils/validateSchema';
import { updateContactSchema } from '@/validations/agencies/updateAgency.validation';

export const updateAgencyContactsAction = async (
  contacts: any[],
  agencyId: string,
  initialState: any,
  formData: FormData
): Promise<
  | any
  | {
      status: number | null;
      alert: string | undefined;
    }
  | { errors: validationError }
> => {
  let result = initialState;

  // Get the complete profile config
  const updateContactConfig = await getContactConfig(contacts, agencyId);
  // Clean and process the form data
  const formDataObject = processFormData(formData, updateContactConfig);
  formDataObject.contact = formDataObject.contact.map((contact: any) => {
    contact.phoneNumbers = contact.phoneNumbers.map((phoneNumber: any) => {
      return JSON.parse(phoneNumber);
    });

    return contact;
  });
  const formValidation = validateData(formDataObject, updateContactSchema);

  if (formValidation !== null) {
    return formValidation;
  }
  try {
    // Make a request to the backend to complete profile
    const agencyId = formDataObject.id;
    const contact = formDataObject.contact;
    result = await UpdateAgencyInfo({ contact }, agencyId);
  } catch (error) {
    // If there is an error, return an error message
    return { status: 500, alert: 'Something went wrong' };
  }

  // If the request was successful, redirect to the login page else return the result (will be displayed in the alert component)
  if (result.status === 200) {
    refreshCurrentPage();
  } else {
    return result;
  }
};
