import addOfferToServiceAction from '@/actions/transportationRequests/addOffreToService.action';
import getAddOfferToServiceConfig from '@/forms/transportationRequests/addOfferToService.config';
import { getServiceByRequest } from '@/services/request.service';

import Container from '@/components/ui/containers';
import { DynamicForm } from '@/components/ui/forms';

export default async function Page(props: any) {
  const { ref, service } = props.params;
  const serviceDetails = await getServiceByRequest(ref, service);
  const type = serviceDetails?.data?.type;
  const addOfferConfig = await getAddOfferToServiceConfig(ref, parseInt(service, 10), type);
  const AddOfferToServiceAction = addOfferToServiceAction.bind(null, ref, parseInt(service, 10));

  return (
    <Container>
      <DynamicForm config={addOfferConfig} action={AddOfferToServiceAction} />
    </Container>
  );
}
