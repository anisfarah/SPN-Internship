/* eslint-disable @typescript-eslint/no-unused-vars */
import addCollToServiceAction from '@/actions/transportationRequests/AddCollToService.action';
import updateRequestAction from '@/actions/transportationRequests/updateRequest.action';
import updateToggleRequestAction from '@/actions/transportationRequests/updateToggleRequest.action';
import getAddCollToServiceConfig from '@/forms/transportationRequests/addCollToServiceReq.config';
import getUpdateRequestConfig from '@/forms/transportationRequests/updateRequest.config';
import getupdateToggleRequestConfig from '@/forms/transportationRequests/updateToggleRequest.config';
import { formatDate } from '@/helpers/dateHelper';
import { GetRequestByReference } from '@/services/request.service';
import { CheckUsersForRequest } from '@/services/user.service';
import { capitalize } from '@/utils/inputHelpers';
import Link from 'next/link';

import AddCollaboratorIcon from '@/components/icons/addCollaboratorIcon';
import AddIcon from '@/components/icons/addIcon';
import DoubleArrowIcon from '@/components/icons/doubleArrowIcon';
import Button, { RoundedButton } from '@/components/ui/buttons';
import { CardTable } from '@/components/ui/cards';
import Form, { DynamicForm } from '@/components/ui/forms';
import { Autocomplete, HiddenInput, ToggleInput } from '@/components/ui/inputs';
import ProfilePicture from '@/components/ui/profilePicture';
import StatusBadge from '@/components/ui/statusBadge';
import UpdateContainer from '@/components/ui/updateContainer';

export default async function Page(props: any) {
  const { ref, serviceIndex } = props.params;
  const { response: requestResponse } = await GetRequestByReference(ref);
  const request = requestResponse?.data || null;

  const res = await CheckUsersForRequest();

  const collaborators =
    res?.response?.data?.map((user: any) => ({
      label: `${user.firstName} ${user.lastName}`, // Combine first and last name
      value: user.id
    })) || [];

  const addCollToServiceActionWithRef = addCollToServiceAction.bind(null, null, request?.reference);

  const updateToggleConfig = await getupdateToggleRequestConfig(request);
  const updateRequestToggleActionByRef = updateToggleRequestAction.bind(null, request?.reference);
  const formatServiceTypes = (services: any[]) => {
    const uniqueServices = new Set(services?.map((service) => capitalize(service.type)));

    return Array.from(uniqueServices).join(', ') || 'N/A';
  };

  const enquiryColumns = {
    title: 'Request Details',
    values: [
      { title: 'Service : ', value: formatServiceTypes(request?.services) },
      { title: 'Source : ', value: request?.source || '-' },
      { title: 'Customer : ', value: request?.customer || '-' },
      {
        title: 'Currency : ',
        value: request?.currency
          ? typeof request.currency === 'string'
            ? request.currency
            : `${request.currency.label} | ${request.currency.code}`
          : 'N/A'
      },
      {
        title: 'Status',
        value: request?.status || '-'
      }
    ]
  };
  const creationColumns = {
    title: 'CREATION DETAILS',
    values: [
      { title: 'Created At', value: formatDate(request?.createdAt) || 'N/A' },
      {
        title: 'Created By',
        value: request?.createdBy.firstName + ' ' + request?.createdBy.lastName || 'N/A'
      }
      // { title: 'Modified At', value: formatDate(request?.history[0]?.modifiedAt || '') || 'N/A' },
      // { title: 'Modified By', value: request?.history[0]?.modifiedBy || 'N/A' }
    ]
  };

  return (
    <div className="relative size-full">
      <div className="relative flex size-full flex-col items-center justify-center">
        <div className="relative flex size-full basis-full flex-col items-center justify-start gap-6 px-4 pb-20 sm:px-10 lg:pb-10">
          <div className="relative mx-auto grid w-full max-w-2xl grid-cols-1 justify-items-center gap-8 py-5 xl:max-w-none xl:grid-cols-3">
            {/* Request Details */}
            <RequestDetails request={request} enquiryColumns={enquiryColumns} />
            {/* Other Information */}
            <CardTable title={'OTHER INFORMATION'}>
              <DynamicForm
                action={updateRequestToggleActionByRef}
                config={updateToggleConfig}
                className="px-0 py-2 lg:px-0"
                fullWidth
              />
            </CardTable>
            {/* Creation Details */}
            <CreationDetails creationColumns={creationColumns} request={request} />
          </div>

          <div className="relative mx-auto mb-20 size-full max-w-2xl xl:mb-4 xl:max-w-none">
            <CardTable
              fullWidth
              title="Services details"
              IconOne={
                <Link href={`/cars-limousines/requests/add-request?ref=${request?.reference}`}>
                  <AddIcon className="size-3 cursor-pointer" />
                </Link>
              }
            >
              {' '}
              <div className="flex w-full flex-col gap-6 xl:hidden">
                {request?.services.length > 0 ? (
                  request.services.map((service: any, idx: any) => (
                    <CardTable
                      key={idx}
                      title={service.type}
                      isInner
                      IconOne={<DoubleArrowIcon className="size-5" />}
                    >
                      <div className="flex w-full flex-col gap-3 py-4 font-text">
                        <span className={`font-text text-sm font-medium uppercase`}>
                          {capitalize(service.type)}
                        </span>
                      </div>
                    </CardTable>
                  ))
                ) : (
                  <div className="h-32">No service has been added yet</div>
                )}
              </div>
              <div className="hidden w-full xl:block">
                {request?.services.length > 0 ? (
                  <table className="services-table w-full">
                    <thead>
                      <tr>
                        <th className="p-2 text-left font-text">SERVICES</th>
                        <th className="p-2 text-left font-text">COLLABORATORS</th>
                        <th className="p-2 text-left font-text">CARS</th>
                        <th className="p-2 text-left font-text">COUNTRY PICKUP</th>
                      </tr>
                    </thead>
                    <tbody>
                      {request.services.map((service: any, idx: any) => (
                        <>
                          <tr key={idx}>
                            <td className="p-2 text-sm font-light capitalize text-textColor">
                              {service.type}
                            </td>
                            <td className="p-2 text-sm font-light capitalize text-textColor">
                              <div className="mx-8 flex flex-row items-center p-2">
                                {service.collaborators && service.collaborators.length > 0 ? (
                                  service.collaborators.map((collaborator: any, index: any) => (
                                    <ProfilePicture
                                      className="-m-1 size-10 text-sm font-light"
                                      key={index}
                                      firstname={collaborator?.firstName}
                                      lastname={collaborator?.lastName}
                                    />
                                  ))
                                ) : (
                                  <span>No collaborators</span>
                                )}
                                <UpdateContainer
                                  icon={
                                    <div className="flex w-full justify-end">
                                      <AddCollaboratorIcon className="size-8" />
                                    </div>
                                  }
                                  title={`Edit Request Details ${idx}`}
                                >
                                  <Form action={addCollToServiceActionWithRef}>
                                    <HiddenInput name="index" value={idx} />
                                    <Autocomplete
                                      name="Add a Collaborator"
                                      options={collaborators}
                                      filterFields={['label']}
                                      displayFields={['label']}
                                    />
                                    <Button type="submit" label={'Add Collaborator'}></Button>
                                  </Form>
                                </UpdateContainer>
                              </div>
                            </td>
                            <td className="p-2 text-sm font-light capitalize text-textColor">
                              {service.details.products && service.details.products.length > 0 ? (
                                service.details.products.map((product: any, index: any) => (
                                  <Link key={index} href="#">
                                    {product.product}
                                  </Link>
                                ))
                              ) : (
                                <span>No cars</span>
                              )}
                            </td>

                            <td className="p-2 text-sm font-light capitalize text-textColor">
                              {service.details?.pickup?.location?.country || '-'}
                            </td>
                            <td>
                              <div className="flex justify-end">
                                <Link
                                  href={`/cars-limousines/requests/${request.reference}/${idx}`}
                                >
                                  <RoundedButton
                                    label={<DoubleArrowIcon className="size-5" />}
                                    className="group flex items-center justify-center rounded-full font-text text-2xl hover:fill-primary hover:text-primary"
                                  />
                                </Link>
                              </div>
                            </td>
                          </tr>
                          <tr key={`divider-${idx}`}>
                            <td colSpan={5}>
                              <hr className="my-2 border-gray-200" />
                            </td>
                          </tr>
                        </>
                      ))}
                    </tbody>
                  </table>
                ) : (
                  <div className="h-32">No service has been added yet</div>
                )}
              </div>
            </CardTable>
          </div>
        </div>
      </div>
      {/* <UpdateContainer title={'Edit Request Details'}>
        <DynamicForm config={addCollToService} action={addCollToServiceActionWithRef} />
      </UpdateContainer> */}
    </div>
  );
}

async function RequestDetails({ request, enquiryColumns }: any) {
  const updateRequestConfig = await getUpdateRequestConfig(request);
  const updateRequestActionByRef = updateRequestAction.bind(null, request?.reference);

  return (
    <CardTable
      title={enquiryColumns?.title}
      IconOne={
        <UpdateContainer title={'Edit Request Details'}>
          <DynamicForm config={updateRequestConfig} action={updateRequestActionByRef} />
        </UpdateContainer>
      }
    >
      <div className="flex w-full flex-col gap-3 overflow-hidden py-4 font-text">
        {enquiryColumns?.values.map(
          (col: any, idx: any) =>
            col.title && (
              <div className="flex w-full items-center justify-between gap-5" key={idx}>
                <span className={`font-text text-sm font-medium uppercase`}>{col.title}</span>
                <span className="truncate text-right text-sm font-light capitalize text-textColor">
                  {col.title === 'Status' ? (
                    <StatusBadge status={col.value} /> // Use StatusBadge for status
                  ) : (
                    col.value
                  )}
                </span>
              </div>
            )
        )}
      </div>
    </CardTable>
  );
}

function CreationDetails({ request, creationColumns }: any) {
  return (
    <CardTable title={creationColumns.title}>
      <div className="flex w-full flex-col gap-3 overflow-hidden py-4 font-text">
        {creationColumns.values.map(
          (col: any, idx: any) =>
            col.title && (
              <div className="flex w-full items-center justify-between gap-5" key={idx}>
                <span className={`font-text text-sm font-medium uppercase`}>{col.title}</span>
                <span className="truncate text-right text-sm font-light capitalize text-textColor">
                  {col.value}
                </span>
              </div>
            )
        )}
      </div>
    </CardTable>
  );
}

// function  ServiceDetails ({ request, serviceColumns }: any) {
//   return (
//     <CardTable
//               fullWidth
//               title="Services details"
//               IconOne={
//                 <Link href={`/cars-limousines/requests/add-request?ref=${request?.reference}`}>
//                   <AddIcon className="size-3 cursor-pointer" />
//                 </Link>
//               }
//             >
//               {' '}
//               <div className="flex w-full flex-col gap-6 xl:hidden">
//                 {request?.services.length > 0 ? (
//                   request.services.map((service: any, idx: any) => (
//                     <CardTable
//                       key={idx}
//                       title={service.type}
//                       isInner
//                       IconOne={<DoubleArrowIcon className="size-5" />}
//                     >
//                       <div className="flex w-full flex-col gap-3 py-4 font-text">
//                         <span className={`font-text text-sm font-medium uppercase`}>
//                           {capitalize(service.type)}
//                         </span>
//                       </div>
//                     </CardTable>
//                   ))
//                 ) : (
//                   <div className="h-32">No service has been added yet</div>
//                 )}
//               </div>
//               <div className="hidden w-full xl:block">
//                 {request?.services.length > 0 ? (
//                   <table className="services-table w-full">
//                     <thead>
//                       <tr>
//                         <th className="p-2 text-left font-text">SERVICES</th>
//                         <th className="p-2 text-left font-text">COLLABORATORS</th>
//                         <th className="p-2 text-left font-text">CARS</th>
//                         <th className="p-2 text-left font-text">COUNTRY PICKUP</th>
//                       </tr>
//                     </thead>
//                     <tbody>
//                       {request.services.map((service: any, idx: any) => (
//                         <>
//                           <tr key={idx}>
//                             <td className="p-2 text-sm font-light capitalize text-textColor">
//                               {service.type}
//                             </td>
//                             <td className="p-2 text-sm font-light capitalize text-textColor">
//                               <div className="mx-8 flex flex-row items-center  p-2">
//                                 {service.collaborators && service.collaborators.length > 0 ? (
//                                   service.collaborators.map((collaborator: any, index: any) => (
//                                     <ProfilePicture
//                                       className="-m-1 size-10 text-sm font-light"
//                                       key={index}
//                                       firstname={collaborator?.firstName}
//                                       lastname={collaborator?.lastName}
//                                     />
//                                   ))
//                                 ) : (
//                                   <span>No collaborators</span>
//                                 )}
//                                 <UpdateContainer
//                                   icon={
//                                     <div className="flex w-full justify-end">
//                                       <AddCollaboratorIcon className="size-8" />
//                                     </div>
//                                   }
//                                   title={`Edit Request Details ${idx}`}
//                                 >
//                                   <Form action={addCollToServiceActionWithRef}>
//                                     <HiddenInput name="index" value={idx} />
//                                     <Autocomplete
//                                       name="Add a Collaborator"
//                                       options={collaborators}
//                                       filterFields={['label']}
//                                       displayFields={['label']}
//                                     />
//                                     <Button type="submit" label={'Add Collaborator'}></Button>
//                                   </Form>
//                                 </UpdateContainer>
//                               </div>
//                             </td>
//                             <td className="p-2 text-sm font-light capitalize text-textColor">
//                               {service.details.products && service.details.products.length > 0 ? (
//                                 service.details.products.map((product: any, index: any) => (
//                                   <Link key={index} href="#">
//                                     {product.product}
//                                   </Link>
//                                 ))
//                               ) : (
//                                 <span>No cars</span>
//                               )}
//                             </td>

//                             <td className="p-2 text-sm font-light capitalize text-textColor">
//                               {service.details?.pickup?.location?.country || '-'}
//                             </td>
//                             <td>
//                               <div className="flex justify-end">
//                                 <Link
//                                   href={`/cars-limousines/requests/${request.reference}/${idx}`}
//                                 >
//                                   <RoundedButton
//                                     label={<DoubleArrowIcon className="size-5" />}
//                                     className="group flex items-center justify-center rounded-full font-text text-2xl hover:fill-primary hover:text-primary"
//                                   />
//                                 </Link>
//                               </div>
//                             </td>
//                           </tr>
//                           <tr key={`divider-${idx}`}>
//                             <td colSpan={5}>
//                               <hr className="my-2 border-gray-200" />
//                             </td>
//                           </tr>
//                         </>
//                       ))}
//                     </tbody>
//                   </table>
//                 ) : (
//                   <div className="h-32">No service has been added yet</div>
//                 )}
//               </div>
//             </CardTable>
//           </div>
