'use server';

import getNewCommentConfig from '@/forms/agencies/addComment.config';
import { AddComment } from '@/services/agency.service';
import { validationError } from '@/types/validation.type';
import processFormData from '@/utils/cleanFormData';
import { refreshCurrentPage } from '@/utils/revalidateCurrentPath';
import validateData from '@/utils/validateSchema';
import { commentValidationSchema } from '@/validations/agencies/updateAgency.validation';

export const updateAgencyCommentsAction = async (
  comments: any[],
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
  const addCommentConfig = await getNewCommentConfig(comments, agencyId);
  // Clean and process the form data
  const formDataObject = processFormData(formData, addCommentConfig);
  const formValidation = validateData(formDataObject, commentValidationSchema);
  if (formValidation !== null) {
    return formValidation;
  }
  try {
    // Make a request to the backend to complete profile
    const agencyId = formData.get('id') as string;
    const comment = formDataObject.comment;
    result = await AddComment(comment, agencyId);
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
