'use client';
import React, { useState, useEffect } from 'react';
import { useRouter, useSearchParams } from 'next/navigation'; // Updated import to get query params
import { addPenaltyAction } from '@/actions/penalties/addPenalty.action';
import { getAddPenaltyConfig } from '@/forms/penalties/addPenalty.config';
import Steps from '@/components/ui/steps'; 
import Container from '@/components/ui/containers';
import { DynamicForm } from '@/components/ui/forms';

const AddPenalty = () => {
  const searchParams = useSearchParams(); // Get search params
  const stepParam = parseInt(searchParams.get('step') || '0', 10); // Get 'step' from the URL, default to 0
  const [currentStep, setCurrentStep] = useState(stepParam + 1);
  
  // Use a generic type for the state
  const [penaltyConfig, setPenaltyConfig] = useState<any[]>(); 

  useEffect(() => {
    const fetchConfig = async () => {
      const config = await getAddPenaltyConfig();
      setPenaltyConfig(config);
    };

    fetchConfig();
  }, []);

  const stepsTitles = ['Upload', 'Verification'];

  if (!penaltyConfig) {
    return <div>Loading...</div>;
  }

  const addPenaltyWithConfigAction = addPenaltyAction.bind(null, penaltyConfig);

  return (
    <Container desktopOnly>
     <div className="flex justify-center mb-8">
        <Steps titles={stepsTitles} step={currentStep} />
      </div>

      <DynamicForm config={penaltyConfig} action={addPenaltyWithConfigAction} />
    </Container>
  );
};

export default AddPenalty;
