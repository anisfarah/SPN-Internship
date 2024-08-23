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
  const image = searchParams['image_url'];

  console.log("image", image);

  const addPenaltyWithStepAction = addPenaltyAction.bind(null, step, image);

  return (
    <Container desktopOnly>
      <DynamicFormWithSteps
        className="w-full max-w-md mx-auto"
        stepContainerFitWidth
        titles={['Upload', 'Verification']}
        config={[uploadPenaltyConfig, addPenaltyConfig]}
        action={addPenaltyWithStepAction}
        step={step}
      />
    </Container>
  );
}
