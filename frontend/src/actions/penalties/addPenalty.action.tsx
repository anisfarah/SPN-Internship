
// 'use server';

// import { AddPenalty } from '@/services/penalty.service';  // Import your service
// import validateData from '@/utils/validateSchema';
// import AddPenaltySchema from '@/validations/penalties/addPenalty.validation';
// import { redirect } from 'next/navigation';

// export const addPenaltyAction = async (
//   addPenaltyConfig: any,
//   initialState: any,
//   formData: FormData
// ): Promise<any> => {
//   let addPenaltyResponse;

//   // Convert FormData to a plain object, excluding any files like penaltyDocument
//   const formDataObject: Record<string, any> = {};
//   formData.forEach((value, key) => {
//     if (key !== 'penaltyDocument') {  // Exclude the penaltyDocument field
//       formDataObject[key] = value || null; // Set to null if empty
//     }
//   });

//   console.log('🚀 ~ Converted FormData Object:', formDataObject);

//   // Ensure numerical fields are converted
//   if (formDataObject.InfractionNumberPenalty) {
//     formDataObject.InfractionNumberPenalty = Number(formDataObject.InfractionNumberPenalty);
//   }
//   if (formDataObject.AmountPenalty) {
//     formDataObject.AmountPenalty = Number(formDataObject.AmountPenalty);
//   }

//   // Remove empty or null fields if you want to exclude them
//   for (const key in formDataObject) {
//     if (formDataObject[key] === null) {
//       delete formDataObject[key];
//     }
//   }

//   // Create the JSON object to send, following the structure expected by FastAPI
//   const penaltyData = {
//     Type: formDataObject.typePenalty,
//     Location: formDataObject.locationPenalty,
//     Infraction_number: formDataObject.InfractionNumberPenalty,
//     Car: formDataObject.CarPenalty,
//     Car_plate_number: formDataObject.CarPlateNumberPenalty || '',  // Optional field with fallback
//     Infraction_date: formDataObject.InfractionDatePenalty || new Date().toISOString(),  // Use current date if not provided
//     Amount: formDataObject.AmountPenalty,
//     Currency: formDataObject.CurrencyPenalty
//   };

//   console.log('🚀 ~ Penalty Data to be Sent:', penaltyData);

//   // Validate the processed data
//   const formValidation = validateData(penaltyData, AddPenaltySchema);
//   if (formValidation !== null) {
//     return formValidation;
//   }

//   try {
//     // Call your service to add penalty
//     addPenaltyResponse = await AddPenalty(penaltyData);
//   } catch (error) {
//     return { status: 500, alert: 'An unexpected error occurred.' };
//   }

//   if (addPenaltyResponse.status === 200 || addPenaltyResponse.status === 201) {
//     console.log('🚀 ~ Penalty added successfully:', penaltyData);
//     redirect('/cars-limousines/penalties');
//   } else {
//     console.log('🚀 ~ Error adding penalty:', addPenaltyResponse.alert);
//     console.log('🚀 ~ Full Response:', addPenaltyResponse);  // Log the full response for debugging
//     return addPenaltyResponse;
//   }
// };

'use server';

import { AddPenalty } from '@/services/penalty.service';
import validateData from '@/utils/validateSchema';
import AddPenaltySchema from '@/validations/penalties/addPenalty.validation';
import { redirect } from 'next/navigation';

export const addPenaltyAction = async (
  step: number,
  initialState: any,
  formData: FormData
): Promise<any> => {
  let addPenaltyResponse;

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

  // Show the converted FormData object in the console
  console.log('🚀 ~ Converted FormData Object:', formDataObject);

  if (step === 0) {
    addPenaltyResponse = { status: 100, alert: '' };
    redirect(`/cars-limousines/penalties/add?step=1`);  // Redirect to the second step
  } else if (step === 1) {
    const formValidation = validateData(formDataObject, AddPenaltySchema);
    if (formValidation !== null) {
      return formValidation;
    }

    // Call the AddPenalty service to add the penalty to the database
    const response = await AddPenalty({
      Type: formDataObject.typePenalty,
      Location: formDataObject.locationPenalty,
      Infraction_number: formDataObject.InfractionNumberPenalty,
      Car: formDataObject.CarPenalty,
      Car_plate_number: formDataObject.CarPlateNumberPenalty,
      Infraction_date: formDataObject.InfractionDatePenalty || new Date().toISOString(),  // Use current date if not provided
      Amount: formDataObject.AmountPenalty,
      Currency: formDataObject.CurrencyPenalty,
    });

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
