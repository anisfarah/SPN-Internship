'use client';
import { FindUserActivityById } from '@/services/userClient.service';
import { cleanUserActivity } from '@/transformers/users/users.transformer';
import { useSearchParams } from 'next/navigation';
import { useEffect, useState } from 'react';

import data from '../../data/users/userDetails.json';
import DoubleArrowIcon from '../icons/doubleArrowIcon';
import { RoundedButton } from './buttons';
import { DropdownContainer } from './containers';
import { SearchInput, SelectInput } from './inputs';
import { Subtitle } from './texts';

export function ActivitiesComponent({ userId, isMobile }: { userId: string; isMobile?: boolean }) {
  const queryParams = useSearchParams();
  const [page, setPage] = useState(1);
  const [count, setCount] = useState(0);
  const [activities, setActivities] = useState<any[]>([]);
  const [isLoading, setLoading] = useState(true);
  const [isLoadingMore, setLoadingMore] = useState(false);
  const fetchData = async () => {
    const activitiesResponse = await FindUserActivityById(userId, page, queryParams.toString());
    setCount(activitiesResponse.response?.data?.count || 0);
    if (activitiesResponse.status == 200) {
      queryParams.toString() === ''
        ? setActivities([
            ...activities,
            ...cleanUserActivity(activitiesResponse.response?.data?.banActivity || [])
          ])
        : setActivities(cleanUserActivity(activitiesResponse.response?.data?.banActivity || []));
      setLoading(false);
    }
  };
  const fetchMoreData = async () => {
    const activitiesResponse = await FindUserActivityById(userId, page, queryParams.toString());
    setCount(activitiesResponse.response?.data?.count || 0);
    if (activitiesResponse.status == 200) {
      setActivities([
        ...activities,
        ...cleanUserActivity(activitiesResponse.response?.data?.banActivity || [])
      ]);
      setLoadingMore(false);
    }
  };
  useEffect(() => {
    setPage(1);
    setLoading(true);
    fetchData();
  }, [queryParams]);
  useEffect(() => {
    fetchMoreData();
  }, [page]);
  const loadMore = () => {
    setPage((prev) => prev + 1);
    setLoadingMore(true);
  };

  return (
    <div className="mx-auto flex size-full max-w-4xl flex-col gap-14 overflow-y-auto overflow-x-hidden px-4 py-8 pb-28 xl:pb-4">
      <div className="relative flex w-full items-center justify-between">
        <div className="float-left w-full">
          <Subtitle>{data.labels.activities}</Subtitle>
        </div>
        {!isMobile && (
          <>
            <div className="mx-6 size-full items-center justify-between">
              <div className="float-left size-full">
                <SelectInput
                  title="Type"
                  isMultiple
                  valueKey="activityType"
                  options={[
                    { id: 0, title: 'All services', value: 'allServices' },
                    { id: 1, title: 'Dashboard', value: 'dashboard' }
                  ]}
                ></SelectInput>
              </div>
            </div>
            <div className="flex items-center gap-3">
              <div className="relative w-40 2xl:w-80">
                <SearchInput />
              </div>
            </div>
          </>
        )}
      </div>
      {isLoading ? (
        <DropdownContainer loading clicked title="Recent">
          <div className="mx-5 flex h-24 shrink-0 animate-pulse flex-col rounded-xl bg-grayUserActivity py-1"></div>
          <div className="mx-5 flex h-24 shrink-0 animate-pulse flex-col rounded-xl bg-grayUserActivity py-1"></div>
          <div className="mx-5 flex h-24 shrink-0 animate-pulse flex-col rounded-xl bg-grayUserActivity py-1"></div>
        </DropdownContainer>
      ) : (
        <>
          <DropdownContainer clicked title="Recent">
            <ActivityDetail data={activities.slice(0, 5)} />
          </DropdownContainer>

          {activities.length > 5 && (
            <DropdownContainer clicked={false} title="Old">
              <ActivityDetail
                data={activities.slice(5)}
                oldDataCount={count - 5}
                loadMoreData={loadMore}
                isLoadingMore={isLoadingMore}
              />
            </DropdownContainer>
          )}
        </>
      )}
    </div>
  );
}

function ActivityDetail({
  data,
  oldDataCount,
  loadMoreData,
  isLoadingMore
}: {
  data: any[];
  oldDataCount?: number;
  loadMoreData?: () => void;
  isLoadingMore?: boolean;
}) {
  {
    return data.length > 0 ? (
      <>
        {data.map((activity: any, idx: number) => (
          <div
            key={idx}
            className="relative mx-5 flex h-fit flex-col rounded-xl bg-grayUserActivity py-3"
          >
            <span className="mx-2 mb-2 mt-1 flex font-raleway font-semibold text-black">
              {activity[0].title + ' ' + activity[0].value}
            </span>
            <div className="flex flex-col gap-1">
              {activity.slice(1).map((activityDetail: any, idx2: number) => (
                <div key={idx2} className="mx-2 flex flex-row text-sm font-light">
                  <span className="flex w-28">{activityDetail.title} </span>
                  <span className="flex">{activityDetail.value}</span>
                </div>
              ))}
            </div>
          </div>
        ))}
        <div className="p-2">
          {loadMoreData &&
            data.length !== oldDataCount &&
            (isLoadingMore ? (
              <>
                <div className="mx-5 flex h-36 flex-col rounded-xl bg-grayUserActivity py-1"></div>
              </>
            ) : (
              <div className="mb-2 flex size-6 w-full justify-end pr-3">
                <RoundedButton
                  className="size-6"
                  label={<DoubleArrowIcon className="rotate-90" />}
                  onClick={loadMoreData}
                />
              </div>
            ))}
        </div>
      </>
    ) : (
      <div className="mx-5 flex h-36 flex-col rounded-xl px-5 py-1">No activities found</div>
    );
  }
}
