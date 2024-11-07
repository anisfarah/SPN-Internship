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
  
  // Ensure that searchParams are passed as initialData
  const uploadPenaltyConfig = await getUploadPenaltyConfig();
  const addPenaltyConfig = await getAddPenaltyConfig({
    typePenalty: searchParams['typePenalty'] || '',
    locationPenalty: searchParams['locationPenalty'] || '',
    InfractionNumberPenalty: searchParams['InfractionNumberPenalty'] || '',
    CarPenalty: searchParams['CarPenalty'] || '',
    AmountPenalty: searchParams['AmountPenalty'] || '',
    CurrencyPenalty: searchParams['CurrencyPenalty'] || '',
  });

  const image = searchParams['image_url'];

  console.log("🚀 ~ Loaded Penalty Data:", searchParams); // This will log to check

  const addPenaltyWithStepAction = addPenaltyAction.bind(null, step, image);

  return (
    <Container desktopOnly>
      <DynamicFormWithSteps
        className="w-full max-w-md mx-auto"
        stepContainerFitWidth
        titles={['Upload', 'Verification']}
        config={[uploadPenaltyConfig, addPenaltyConfig]}  // Configs passed here
        action={addPenaltyWithStepAction}
        step={step}
      />
    </Container>
  );
}
