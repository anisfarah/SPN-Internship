import { updateAgencyCommentsAction } from '@/actions/agencies/updateAgencyComment.action';
import { updateAgencyContactsAction } from '@/actions/agencies/updateAgencyContacts.action';
import { UpdateAgencyInfoAction } from '@/actions/agencies/updateAgencyInfo.action';
import { UpdateAgencyRatingsAction } from '@/actions/agencies/updateAgencyRatings.action';
import getNewCommentConfig from '@/forms/agencies/addComment.config';
import getContactConfig from '@/forms/agencies/addContact.config';
import getAgencyRatingConfig from '@/forms/agencies/agencyRating.config';
import getUpdateAgencyInfoConfigFromData from '@/forms/agencies/updateAgencyInfo.config';
import { FindAgencyBySlug } from '@/services/agency.service';
import { cleanAgency } from '@/transformers/agencies/agency.transformer';

import AddLocation from '@/components/ui/addLocation';
import { CardTable } from '@/components/ui/cards';
import Container, {
  DesktopContainer,
  MobileContainer,
  TabsContainer
} from '@/components/ui/containers';
import DeleteLocationButton from '@/components/ui/deleteLocation';
import EditLocation from '@/components/ui/editLocation';
import { DynamicForm, DynamicRatingForm } from '@/components/ui/forms';
import Table, { Column, Row } from '@/components/ui/tables';
import Tabs from '@/components/ui/tabs';
import { Category, Subtitle } from '@/components/ui/texts';

async function agencyDetails(props: {
  params: { slug: string };
  searchParams: { [key: string]: string };
}) {
  console.log('🚀 ~ props:', props);
  const agencySlug = decodeURIComponent(props?.params?.slug);
  const { response: agencyResponse } = await FindAgencyBySlug(agencySlug);
  const agencyData = agencyResponse?.data || {};
  const agency = cleanAgency(agencyData);

  return (
    // <div className="relative size-full">
    <section className="relative flex size-full flex-col items-center">
      {/* {props.searchParams.tab === 'activities' && (
          <div className="lg:hidden">
            <FilterNav
              filterData={{
                title: 'Services',
                valueKey: 'services',
                values: [
                  { title: 'Dashboard', value: 'dashboard' },
                  { title: 'All Services', value: 'all' }
                ]
              }}
              searchParams={{
                searchData: [agency],
                filterFields: ['name'],
                displayFields: ['name']
              }}
            />
          </div>
        )} */}
      <MobileContainer>
        <Container>
          <div className="mb-2 mt-8 flex w-full justify-center">
            <div className="relative">
              <Subtitle>{agency.name}</Subtitle>
            </div>
          </div>
          <TabsContainer mobileOnly>
            <Tabs
              filter="tab"
              mobileOnly
              data={[
                { id: 0, title: 'Profile', value: 'profile' },
                { id: 1, title: 'Work Map', value: 'workMap' },
                { id: 2, title: 'Rating', value: 'rating' },
                { id: 3, title: 'Contact', value: 'contact' }
                // { id: 4, title: 'Activities', value: 'activities' }
              ]}
            />
          </TabsContainer>
          {props.searchParams.tab === 'profile' && <AgencyInfoComponent agencyData={agency} />}
          {props.searchParams.tab === 'workMap' && (
            <WorkMapComponent isMobile locations={agency.locations} agencyId={agency._id} />
          )}
          {props.searchParams.tab === 'rating' && (
            <>
              <RatingComponent ratings={agency.rating} agencyId={agency._id} />
              <CommentsComponent comments={agency.comments || []} agencyId={agency._id} />
            </>
          )}
          {props.searchParams.tab === 'contact' && (
            <ContactComponent contacts={agency.contact || []} agencyId={agency._id} />
          )}
          {/* {props.searchParams.tab === 'activities' && (
                <ActivitiesComponent isMobile userId={agency._id} />
              )} */}
        </Container>
      </MobileContainer>

      <DesktopContainer>
        <div className="relative flex size-full flex-1">
          {/* <div className="relative hidden size-full max-w-xl bg-fuchsia-300 xl:block"> */}
          <Container className="max-w-xl lg:max-h-[calc(100svh-6rem)]">
            <div className="sticky top-0 z-[1] flex w-full flex-col items-center justify-center gap-4 bg-bgColor pt-8">
              <div className="relative">
                <Subtitle>{agency.name}</Subtitle>
              </div>
              <TabsContainer desktopOnly>
                <Tabs
                  filter="tab"
                  data={[
                    { id: 0, title: 'Profile', value: 'profile' },
                    { id: 1, title: 'Work Map', value: 'workMap' },
                    { id: 2, title: 'Rating', value: 'rating' }
                  ]}
                />
              </TabsContainer>
            </div>

            {props.searchParams.tab === 'profile' && <AgencyInfoComponent agencyData={agency} />}
            {props.searchParams.tab === 'workMap' && (
              <WorkMapComponent locations={agency.locations} agencyId={agency._id} />
            )}
            {props.searchParams.tab === 'rating' && (
              <>
                <RatingComponent ratings={agency.rating} agencyId={agency._id} />
                <CommentsComponent comments={agency.comments || []} agencyId={agency._id} />
              </>
            )}
          </Container>
          {/* </div> */}
          {/* <div className="hidden w-full xl:block"> */}
          <Container className="md:pl-0 lg:max-h-[calc(100svh-6rem)]">
            <TabsContainer desktopOnly>
              <Tabs
                filter="tab2"
                data={[
                  { id: 0, title: 'Contact', value: 'contact' }
                  // { id: 1, title: 'Activities', value: 'activities' }
                ]}
              />
            </TabsContainer>
            {/* {props.searchParams.tab2 === 'contact' && ( */}
            <ContactComponent contacts={agency.contact || []} agencyId={agency._id} />
            {/* )} */}
            {/* {props.searchParams.tab2 === 'activities' && (
              <ActivitiesComponent userId={'ghabdnlxq'} />
            )} */}
          </Container>
          {/* </div>  */}
        </div>
      </DesktopContainer>
    </section>
  );
}

export default agencyDetails;
async function AgencyInfoComponent({ agencyData }: { agencyData: any }) {
  const updateProfileConfig = await getUpdateAgencyInfoConfigFromData(agencyData);
  const updateAgencyInfoActionWithConfig = UpdateAgencyInfoAction.bind(null, updateProfileConfig);
  const updateAgencyInfoActionWithConfigAndName = updateAgencyInfoActionWithConfig.bind(
    null,
    agencyData.name
  );

  return (
    <DynamicForm
      config={updateProfileConfig}
      action={updateAgencyInfoActionWithConfigAndName}
      buttonLabel="Update"
    />
  );
}
function WorkMapComponent({
  locations,
  isMobile,
  agencyId
}: {
  locations: any[];
  isMobile?: boolean;
  agencyId: string;
}) {
  return (
    <div className="mx-8 mt-8">
      {locations && locations.length > 0 ? (
        <>
          {!isMobile ? (
            <Table categories={['Countries', 'cities', '']}>
              {locations.map((location: any, idx: number) => (
                <Row className="align-top" key={idx}>
                  <Column>{location.country}</Column>
                  <Column>
                    {location.cities.map((city: any, idx3: any) => (
                      <div key={idx3} className="flex items-center gap-2">
                        {city}
                      </div>
                    ))}
                  </Column>
                  <Column fitted>
                    <div className="flex w-fit items-center gap-2">
                      <EditLocation location={location} index={idx} agencyId={agencyId} />
                      <DeleteLocationButton index={idx} agencyId={agencyId} />
                    </div>
                  </Column>
                </Row>
              ))}
            </Table>
          ) : (
            locations.map((location: any, idx: number) => (
              <div className="h-fit w-full py-3" key={idx}>
                <CardTable
                  isMobile
                  isInner
                  key={idx}
                  IconOne={<EditLocation location={location} index={idx} agencyId={agencyId} />}
                  IconTwo={<DeleteLocationButton index={idx} agencyId={agencyId} />}
                >
                  <div className="flex w-full flex-col gap-3">
                    <div className="flex w-full flex-col gap-3">
                      <span className="font-text text-sm font-medium uppercase">country</span>
                      <span className="truncate text-sm font-light capitalize text-textColor">
                        {location.country}
                      </span>
                    </div>
                    <div className="flex w-full flex-col gap-3">
                      <span className="font-text text-sm font-medium uppercase">Cities</span>
                      {location.cities.map((city: any, idx3: any) => (
                        <span
                          key={idx3}
                          className="truncate text-sm font-light capitalize text-textColor"
                        >
                          {city}
                        </span>
                      ))}
                    </div>
                  </div>
                </CardTable>
              </div>
            ))
          )}
          <AddLocation agencyId={agencyId} />
        </>
      ) : (
        <AddLocation agencyId={agencyId} />
      )}
    </div>
  );
}
async function RatingComponent({ ratings, agencyId }: { ratings: any; agencyId: string }) {
  const updateRatingConfig = await getAgencyRatingConfig(ratings);

  const UpdateAgencyRatingsActionWithData = UpdateAgencyRatingsAction.bind(
    null,
    updateRatingConfig
  );

  return (
    <>
      <div className="mt-8 px-4 lg:px-10">
        <Category>Rating</Category>
      </div>
      <DynamicRatingForm
        agencyId={agencyId}
        config={updateRatingConfig}
        action={UpdateAgencyRatingsActionWithData}
        buttonLabel="Update"
      />
    </>
  );
}
async function CommentsComponent({ comments, agencyId }: { comments: any[]; agencyId: string }) {
  const config = await getNewCommentConfig(comments, agencyId);
  const updateAgencyCommentsActionWithComments = updateAgencyCommentsAction.bind(null, comments);
  const updateAgencyCommentsActionWithId = updateAgencyCommentsActionWithComments.bind(
    null,
    agencyId
  );

  return (
    <>
      <div className="px-4 pb-3 lg:px-10">
        <Category>Comments</Category>
      </div>
      {/* <div className="flex flex-col gap-2 px-10">
        {comments.map((comment, index) => (
          <div key={index}>
            <div className="flex justify-between">
              <LabelText
                className="peer"
                label={`By ${comment?.commentedBy?.firstName} ${comment?.commentedBy?.lastName}`}
              />
              <LabelText
                label={`${moment.utc(comment?.commentedAt).format('DD/MM/YYYY - HH:mm')}`}
              />
            </div>

            <textarea
              className={`peer flex w-full cursor-not-allowed justify-center rounded-2xl bg-bgColor p-2 px-4 font-text text-sm font-light leading-[200%]
      shadow-[inset_6px_8px_5px_rgba(220,226,246,.3),inset_-5px_-10px_7px_rgba(255,255,255,.7)] outline-none   outline-1 md:text-base `}
              disabled
              value={comment.comment}
              rows={2}
            />
          </div>
        ))}
      </div> */}
      <DynamicForm
        className="py-8"
        config={config}
        withSteps={false}
        action={updateAgencyCommentsActionWithId}
        buttonLabel="Update"
      />
    </>
  );
}

async function ContactComponent({ contacts, agencyId }: { contacts: any[]; agencyId: string }) {
  const config = await getContactConfig(contacts, agencyId);
  const updateAgencyContactsActionWithContacts = updateAgencyContactsAction.bind(null, contacts);
  const updateAgencyContactsActionWithId = updateAgencyContactsActionWithContacts.bind(
    null,
    agencyId
  );

  return (
    <>
      <div className="px-10 pb-3"></div>
      <DynamicForm
        fullWidth
        config={config}
        withSteps={false}
        action={updateAgencyContactsActionWithId}
        buttonLabel="Update"
      />
    </>
  );
}
