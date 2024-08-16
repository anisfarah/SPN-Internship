// 'use client';
// import React, { useState, useEffect } from 'react';
// import { useRouter, useSearchParams } from 'next/navigation';
// import { addPenaltyAction } from '@/actions/penalties/addPenalty.action';
// import { getAddPenaltyConfig } from '@/forms/penalties/addPenalty.config';
// import { getUploadPenaltyConfig } from '@/forms/penalties/uploadPenalty.config';
// import Container from '@/components/ui/containers';
// import { DynamicFormWithSteps } from '@/components/ui/forms';

// const AddPenalty = () => {
//   const searchParams = useSearchParams();
//   const router = useRouter();
//   const stepParam = parseInt(searchParams.get('step') || '0', 10);
//   const [currentStep, setCurrentStep] = useState(stepParam);
//   const [penaltyConfig, setPenaltyConfig] = useState<any[]>([]);
//   const [isUploading, setIsUploading] = useState(false);

//   useEffect(() => {
//     const fetchConfigs = async () => {
//       const uploadConfig = await getUploadPenaltyConfig();
//       const formConfig = await getAddPenaltyConfig();
//       setPenaltyConfig([uploadConfig, formConfig]);
//     };

//     fetchConfigs();
//   }, []);

//   const stepsTitles = ['Upload', 'Verification'];

//   const handleFileUpload = async (initialState: any, formData: FormData) => {
//     setIsUploading(true);

//     // Simulate the upload process
//     setTimeout(() => {
//       setIsUploading(false);
//       setCurrentStep(1); // Move to the next step (form)
//       router.push(`?step=1`);
//     }, 1000);
//   };

//   const handleFormSubmit = async (initialState: any, formData: FormData) => {
//     // Log all entries in FormData to see what is being captured
//     formData.forEach((value, key) => {
//       console.log(`FormData Key: ${key}, Value: ${value}`);
//     });

//     // Pass formData to the addPenaltyAction function
//     const response = await addPenaltyAction(penaltyConfig[1], initialState, formData);

//     // Handle the response
//     if (response.status === 200 || response.status === 201) {
//       console.log('Penalty added successfully:', response.data);
//       router.push('/cars-limousines/penalties');
//     } else {
//       console.log('Error adding penalty:', response.alert);
//     }
//   };

//   if (!penaltyConfig.length) {
//     return <div>Loading...</div>;
//   }

//   return (
//     <Container desktopOnly>
//       <DynamicFormWithSteps
//         config={penaltyConfig}
//         action={currentStep === 0 ? handleFileUpload : handleFormSubmit}
//         titles={stepsTitles}
//         stepContainerFitWidth
//         fullWidth
//         className="w-full max-w-md mx-auto"
//       />
//     </Container>
//   );
// };

// export default AddPenalty;
import Container from '@/components/ui/containers';
import { DynamicFormWithSteps } from '@/components/ui/forms';
import { getAddPenaltyConfig } from '@/forms/penalties/addPenalty.config';
import { getUploadPenaltyConfig } from '@/forms/penalties/uploadPenalty.config';
import { addPenaltyAction } from '@/actions/penalties/addPenalty.action';

export default async function AddPenalty({
  searchParams,
}: {
  searchParams: { [key: string]: any };
}) {
  const step = parseInt(searchParams['step'] ?? '0', 10);
  const uploadPenaltyConfig = await getUploadPenaltyConfig();
  const addPenaltyConfig = await getAddPenaltyConfig();

  const addPenaltyWithStepAction = addPenaltyAction.bind(null, step);

  return (
    <Container desktopOnly>
      <DynamicFormWithSteps
        className="w-full max-w-md mx-auto"
        titles={['Upload', 'Verification']}
        config={[uploadPenaltyConfig, addPenaltyConfig]}
        action={addPenaltyWithStepAction}
        step={step}  // Ensure this prop is needed
      />
    </Container>
  );
}
