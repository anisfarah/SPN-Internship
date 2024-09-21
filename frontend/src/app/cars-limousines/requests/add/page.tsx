import AddRequestAction from '@/actions/transportationRequests/addRequest.action';
import AddServiceToExistingRequestAction from '@/actions/transportationRequests/addServiceToExistingRequest.action';
// eslint-disable-next-line import/no-named-as-default
import getAddRequestConfig from '@/forms/transportationRequests/addRequest.config';
// eslint-disable-next-line import/no-named-as-default
import getAddServiceToExistingRequestConfig from '@/forms/transportationRequests/requestService.config';

import Container from '@/components/ui/containers';
import { DynamicForm } from '@/components/ui/forms';

export default async function AddRequest({ searchParams }: { searchParams: { ref: string } }) {
  // if (searchParams?.ref) {
  //   const getAddServiceToExistingReq = await getAddServiceToExistingRequestConfig({
  //     ref: searchParams.ref
  //   });
  //   const AddServiceActionBind = AddServiceToExistingRequestAction.bind(
  //     null,
  //     getAddServiceToExistingReq
  //   );
  //   return (
  //     <Container>
  //       <DynamicForm config={getAddServiceToExistingReq} action={AddServiceActionBind} />
  //     </Container>
  //   );
  // } else {
  //   const addRequestConfig = await getAddRequestConfig();
  //   return (
  //     <Container>
  //       <DynamicForm config={addRequestConfig} action={AddRequestAction} />
  //     </Container>
  //   );
  // }

  const addRequestConfig = await getAddRequestConfig();

  return (
    <Container desktopOnly>
      <DynamicForm config={addRequestConfig} action={AddRequestAction} />
    </Container>
  );
}
