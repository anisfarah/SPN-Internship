import addBenchmarkToServiceAction from '@/actions/transportationRequests/addBenchmarkToService.action';
import AssignBenchmarkToOfferAction from '@/actions/transportationRequests/assignBenchmarkToOffer.action';
import updateBenchmarkToServiceAction from '@/actions/transportationRequests/updateBenchmarkToService.action';
import updateOfferToServiceAction from '@/actions/transportationRequests/updateOffreToService.action';
import updateServiceToExistingRequestAction from '@/actions/transportationRequests/UpdateServiceToExistingRequest.action';
// eslint-disable-next-line import/no-named-as-default
import getAddBechmarkToServiceConfig from '@/forms/transportationRequests/addBenchmarkToService.config';
// eslint-disable-next-line import/no-named-as-default
import getUpdateBenchmarkToServiceConfig from '@/forms/transportationRequests/updateBenchmarkToService.config';
// eslint-disable-next-line import/no-named-as-default
import getUpdateOfferToServiceConfig from '@/forms/transportationRequests/updateOffreToService.config';
import getUpdateServiceConfig from '@/forms/transportationRequests/updateService.config';
import { formatDate } from '@/helpers/dateHelper';
import { GetserviceByRequest } from '@/services/request.service';
import { capitalize } from '@/utils/inputHelpers';
import Link from 'next/link';

import AddIcon from '@/components/icons/addIcon';
import AddButtonModal from '@/components/ui/addButtonModal';
import { CardTable } from '@/components/ui/cards';
import DirectAssignButton from '@/components/ui/directAssignButton';
import { DynamicForm } from '@/components/ui/forms';
import { ToggleInput } from '@/components/ui/inputs';
import StatusBadge from '@/components/ui/statusBadge';
import UpdateContainer from '@/components/ui/updateContainer';

export default async function ServiceDetailPage(props: any) {
  const { ref, service } = props.params;

  const serviceDetails = await GetserviceByRequest(ref, service);
  console.log('🚀 ~ ServiceDetailPage ~ serviceDetails:', serviceDetails);
  const type = serviceDetails?.response?.data?.type
    ? serviceDetails?.response?.data?.type
    : 'Offre';
  const offers = serviceDetails.response?.data.offers || [];

  const updateServiceConfig = await getUpdateServiceConfig({
    reference: ref,
    index: parseInt(service, 10)
  });

  const UpdateServiceWithRefAction = updateServiceToExistingRequestAction.bind(null, ref);
  const UpdateServiceWithServiceIndexAction = UpdateServiceWithRefAction.bind(
    null,
    parseInt(service, 10)
  );
  const UpdateServiceWithConfigAction = UpdateServiceWithServiceIndexAction.bind(
    null,
    updateServiceConfig
  );

  const addBenchmarkConfig = await getAddBechmarkToServiceConfig(parseInt(service, 10), type);
  const AddBenchmarkToServiceAction = addBenchmarkToServiceAction.bind(null, null, ref);

  const benchmarks = serviceDetails.reponse?.data.benchmarks || [];

  const updateBenchmarkActions = await Promise.all(
    benchmarks.map(async (benchmark: any, idx: number) => {
      const updateBenchmarkConfig = await getUpdateBenchmarkToServiceConfig({
        reference: ref,
        serviceIndex: parseInt(service, 10),
        benchmarkIndex: idx
      });

      return {
        config: updateBenchmarkConfig,
        action: updateBenchmarkToServiceAction.bind(
          null,
          ref,
          parseInt(service, 10),
          idx,
          updateBenchmarkConfig
        )
      };
    })
  );

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const assignBenchmarkActions = benchmarks.map((benchmark: any, idx: number) => {
    return AssignBenchmarkToOfferAction.bind(null, ref, parseInt(service, 10), idx, {});
  });

  const updateOfferActions = await Promise.all(
    offers.map(async (offer: any, idx: number) => {
      const updateOfferConfig = await getUpdateOfferToServiceConfig({
        reference: ref,
        serviceIndex: parseInt(service, 10),
        offerIndex: idx
      });

      return {
        config: updateOfferConfig,
        action: updateOfferToServiceAction.bind(
          null,
          ref,
          parseInt(service, 10),
          idx,
          updateOfferConfig
        )
      };
    })
  );
  console.log('🚀 ~ renderDetails ~ serviceDetails?.response?.data:', serviceDetails?.response);

  const renderDetails = () => {
    // eslint-disable-next-line no-unsafe-optional-chaining
    const { type, details } = serviceDetails?.response?.data;
    // console.log('🚀 ~ renderDetails ~ serviceDetails:', serviceDetails);

    if (!details) return null;

    return (
      <div className="flex w-full flex-col gap-3 py-2 font-text">
        <div className="flex w-full items-center justify-between gap-5">
          <span className="font-text text-sm font-medium uppercase">Type :</span>
          <span className="truncate text-right text-sm font-light capitalize text-textColor">
            {capitalize(type) || '-'}
          </span>
        </div>
        <div className="flex w-full items-center justify-between gap-5">
          <span className="font-text text-sm font-medium uppercase">Pickup :</span>
          <span className="truncate text-right text-sm font-light capitalize text-textColor">
            {`${details.pickup?.location?.country || '-'}, ${details.pickup?.location?.city || '-'}, ${details.pickup?.location?.address || '-'}`}
          </span>
        </div>
        <div className="flex w-full items-center justify-between gap-5">
          <span className="font-text text-sm font-medium uppercase">Dropoff :</span>
          <span className="truncate text-right text-sm font-light capitalize text-textColor">
            {`${details.dropoff?.location?.country || '-'}, ${details.dropoff?.location?.city || '-'}, ${details.dropoff?.location?.address || '-'}`}
          </span>
        </div>
        <div className="flex w-full items-center justify-between gap-5">
          <span className="font-text text-sm font-medium uppercase">Arrival Date :</span>
          <span className="truncate text-right text-sm font-light capitalize text-textColor">
            {formatDate(details.dropoff?.date) || '-'}
          </span>
        </div>
        <div className="flex w-full items-center justify-between gap-5">
          <span className="font-text text-sm font-medium uppercase">Departure Date :</span>
          <span className="truncate text-right text-sm font-light capitalize text-textColor">
            {formatDate(details.pickup?.date) || '-'}
          </span>
        </div>
        <div className="flex w-full items-center justify-between gap-5">
          <span className="font-text text-sm font-medium uppercase">Guest :</span>
          <span className="truncate text-right text-sm font-light capitalize text-textColor">
            {details.guest || '-'}
          </span>
        </div>
        <div className="flex w-full items-center justify-between gap-5">
          <span className="font-text text-sm font-medium uppercase">Small Luggage Count :</span>
          <span className="truncate text-right text-sm font-light capitalize text-textColor">
            {details.smallLuggageCount ?? '-'}
          </span>
        </div>
        <div className="flex w-full items-center justify-between gap-5">
          <span className="font-text text-sm font-medium uppercase">Big Luggage Count :</span>
          <span className="truncate text-right text-sm font-light capitalize text-textColor">
            {details.bigLuggageCount ?? '-'}
          </span>
        </div>
        <div className="flex w-full items-center justify-between gap-5">
          <span className="font-text text-sm font-medium uppercase">Kids Count :</span>
          <span className="truncate text-right text-sm font-light capitalize text-textColor">
            {details.kidsCount ?? '-'}
          </span>
        </div>
        <div className="flex w-full items-center justify-between gap-5">
          <span className="font-text text-sm font-medium uppercase">Babies Count :</span>
          <span className="truncate text-right text-sm font-light capitalize text-textColor">
            {details.babiesCount ?? '-'}
          </span>
        </div>
        <div className="flex w-full items-center justify-between gap-5">
          <span className="font-text text-sm font-medium uppercase">Requested Duration :</span>
          <span className="truncate text-right text-sm font-light capitalize text-textColor">
            {details.requestedDuration ?? '-'}
          </span>
        </div>
        <div className="flex w-full items-center justify-between gap-5">
          <span className="font-text text-sm font-medium uppercase">KM Included :</span>
          <span className="truncate text-right text-sm font-light capitalize text-textColor">
            {details.kmIncluded ?? '-'}
          </span>
        </div>
      </div>
    );
  };

  const renderOtherInformation = () => {
    const { details, comments } = serviceDetails.data;

    return (
      <div className="flex w-full flex-col gap-3 overflow-hidden py-4 text-left font-text">
        {/* Display comments if available */}
        {comments &&
          comments.length > 0 &&
          comments.map((comment: string, index: number) => (
            <p key={index} className="text-sm font-light capitalize text-textColor">
              {comment}
            </p>
          ))}

        {/* Display pickup withMeetAndGreet toggle */}
        <div className="flex w-full items-center justify-between gap-5">
          <span className="font-text text-sm font-medium uppercase">
            Pickup With Meet And Greet:
          </span>
          <ToggleInput
            name="pickupWithMeetAndGreet"
            checked={details.pickup.withMeetAndGreet}
            disabled={true}
            placeholderActive="Yes"
            placeholderInactive="No"
          />
        </div>

        {/* Display dropoff withMeetAndGreet toggle */}
        <div className="flex w-full items-center justify-between gap-5">
          <span className="font-text text-sm font-medium uppercase">
            Dropoff With Meet And Greet:
          </span>
          <ToggleInput
            name="dropoffWithMeetAndGreet"
            checked={details.dropoff.withMeetAndGreet}
            disabled={true}
            placeholderActive="Yes"
            placeholderInactive="No"
          />
        </div>
      </div>
    );
  };

  const renderBenchmarks = () => {
    return (
      <div className="relative mx-auto mb-20 size-full xl:mb-4">
        <CardTable
          fullWidth
          title="BENCHMARK DETAILS"
          IconOne={
            <AddButtonModal
              title="Add Benchmark"
              content={
                <DynamicForm config={addBenchmarkConfig} action={AddBenchmarkToServiceAction} />
              }
            />
          }
        >
          <div className="hidden w-full xl:block">
            {benchmarks.length > 0 ? (
              <table className="services-table w-full">
                <thead>
                  <tr>
                    <th className="p-2 text-left font-text">SOURCE</th>
                    <th className="p-2 text-left font-text">PRODUCT</th>
                    <th className="p-2 text-left font-text">PRICE</th>
                    <th className="p-2 text-left font-text">QUANTITY</th>
                    <th className="p-2 text-left font-text">TOTAL</th>
                    <th className="p-2 text-left font-text">EXTRA COSTS</th>
                    <th className="p-2 text-left font-text">CREATED BY</th>
                    <th className="p-2 text-left font-text">UPDATED BY</th>
                    <th className="p-2 text-left font-text">ACTIONS</th>
                    <th className="p-2 text-left font-text">ASSIGN TO OFFRE</th>
                  </tr>
                </thead>
                <tbody>
                  {benchmarks.map((benchmark: any, idx: number) => (
                    <tr key={idx}>
                      <td className="p-2 text-sm font-light capitalize text-textColor">
                        {benchmark.source}
                      </td>
                      <td className="p-2 text-sm font-light capitalize text-textColor">
                        {benchmark.details[0].product}
                      </td>
                      <td className="p-2 text-sm font-light capitalize text-textColor">
                        {benchmark.details[0].price}
                      </td>
                      <td className="p-2 text-sm font-light capitalize text-textColor">
                        {benchmark.details[0].quantity}
                      </td>
                      <td className="p-2 text-sm font-light capitalize text-textColor">
                        {benchmark.details[0].price * benchmark.details[0].quantity}
                      </td>
                      <td className="p-2 text-sm font-light capitalize text-textColor">
                        {benchmark.details[0].extraCosts
                          ? Object.keys(benchmark.details[0].extraCosts).map(
                              (key: string, costIdx: number) => (
                                <div key={costIdx}>
                                  <span>
                                    {key === 'freeWaitingTime'
                                      ? `Free Waiting Time: ${benchmark.details[0].extraCosts[key]} minutes`
                                      : `${key}, ${benchmark.details[0].extraCosts[key].amount} ${benchmark.details[0].extraCosts[key].currency.code}`}
                                  </span>
                                </div>
                              )
                            )
                          : 'N/A'}
                      </td>
                      <td className="p-2 text-sm font-light capitalize text-textColor">
                        {benchmark.createdBy}
                      </td>
                      <td className="p-2 text-sm font-light capitalize text-textColor">
                        {benchmark.updatedBy || 'Not Updated Yet'}
                      </td>
                      <td className="p-2 text-sm font-light capitalize text-textColor">
                        <div className="flex items-center">
                          <UpdateContainer title={`Edit Benchmark ${idx + 1}`} idx={idx}>
                            <DynamicForm
                              config={updateBenchmarkActions[idx].config}
                              action={updateBenchmarkActions[idx].action}
                            />
                          </UpdateContainer>
                        </div>
                      </td>
                      <td className="p-2 text-sm font-light capitalize text-textColor">
                        <DirectAssignButton
                          reference={ref}
                          serviceIndex={parseInt(service, 10)}
                          benchmarkIndex={idx}
                        >
                          <AddIcon className="size-3 cursor-pointer" />
                        </DirectAssignButton>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            ) : (
              <div className="h-32">No benchmark has been added yet</div>
            )}
          </div>
        </CardTable>
      </div>
    );
  };

  const renderOffers = () => {
    return (
      <div className="relative mx-auto mb-20 size-full xl:mb-4">
        <CardTable
          fullWidth
          title="OFFER DETAILS"
          IconOne={
            <Link href={`/cars-limousines/requests/${ref}/${service}/add-offre`}>
              <AddIcon className="size-3 cursor-pointer" />
            </Link>
          }
        >
          <div className="hidden w-full xl:block">
            {offers.length > 0 ? (
              <table className="services-table w-full">
                <thead>
                  <tr>
                    <th className="p-2 text-left font-text">PRODUCT</th>
                    <th className="p-2 text-left font-text">PRICE</th>
                    <th className="p-2 text-left font-text">QUANTITY</th>
                    <th className="p-2 text-left font-text">ADJUSTMENT RATE</th>
                    <th className="p-2 text-left font-text">CURRENCY</th>
                    <th className="p-2 text-left font-text">TOTAL PRICE</th>
                    <th className="p-2 text-left font-text">STATUS</th>
                    <th className="p-2 text-left font-text">EXPIRY DATE</th>
                    <th className="p-2 text-left font-text">CREATED BY</th>
                    <th className="p-2 text-left font-text">ACTIONS</th>
                  </tr>
                </thead>
                <tbody>
                  {offers.map((offer: any, idx: number) => (
                    <tr key={idx}>
                      <td className="p-2 text-sm font-light capitalize text-textColor">
                        {offer.details[0]?.product || '-'}
                      </td>
                      <td className="p-2 text-sm font-light capitalize text-textColor">
                        {offer.details[0]?.price || '-'}
                      </td>
                      <td className="p-2 text-sm font-light capitalize text-textColor">
                        {offer.details[0]?.quantity || '-'}
                      </td>
                      <td className="p-2 text-sm font-light capitalize text-textColor">
                        {offer.details[0]?.adjustmentRate
                          ? `${offer.details[0].adjustmentRate.value} ${offer.details[0].adjustmentRate.unit} (${offer.details[0].adjustmentRate.type})`
                          : '-'}
                      </td>
                      <td className="p-2 text-sm font-light capitalize text-textColor">
                        {offer.details[0]?.currency?.code || '-'}
                      </td>
                      <td className="p-2 text-sm font-light capitalize text-textColor">
                        {offer.totalPrice || '-'}
                      </td>
                      <td className="p-2 text-sm font-light capitalize text-textColor">
                        <StatusBadge status={offer.status} />
                      </td>
                      <td className="p-2 text-sm font-light capitalize text-textColor">
                        {formatDate(offer.expiryDate) || '-'}
                      </td>
                      <td className="p-2 text-sm font-light capitalize text-textColor">
                        {offer.createdBy || '-'}
                      </td>
                      <td className="p-2 text-sm font-light capitalize text-textColor">
                        <UpdateContainer title={`Edit Offer ${idx + 1}`} idx={idx}>
                          <DynamicForm
                            config={updateOfferActions[idx].config}
                            action={updateOfferActions[idx].action}
                          />
                        </UpdateContainer>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            ) : (
              <div className="h-32">No offer has been added yet</div>
            )}
          </div>
        </CardTable>
      </div>
    );
  };

  return (
    <div className="relative size-full">
      <div className="relative flex size-full flex-col items-center justify-center">
        <div className="relative flex size-full basis-full flex-col items-center justify-start gap-6 px-4 pb-20 sm:px-10 lg:pb-10">
          <div className="relative mx-auto grid w-full max-w-4xl grid-cols-1 justify-items-center gap-8 py-5 xl:max-w-none xl:grid-cols-2">
            {/* Ride Details */}
            <CardTable
              title="RIDE DETAILS"
              IconOne={
                <AddButtonModal
                  title="Edit Service Details"
                  content={
                    <DynamicForm
                      config={updateServiceConfig}
                      action={UpdateServiceWithConfigAction}
                    />
                  }
                  icon="edit"
                />
              }
            >
              {renderDetails()}
            </CardTable>
            {/* Other Information */}
            <CardTable title="OTHER INFORMATION :">{renderOtherInformation()}</CardTable>
          </div>
          <div className="relative w-full">{renderBenchmarks()}</div>
          <div className="relative w-full">{renderOffers()}</div>
        </div>
      </div>
    </div>
  );
}
