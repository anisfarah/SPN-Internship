'use client';

import { useModal } from '@/helpers/modalHelper';
import { useState, useEffect } from 'react';

import AddIcon from '../icons/addIcon';
import DoubleArrowIcon from '../icons/doubleArrowIcon';
import EditIcon from '../icons/editIcon';
import EyeIcon from '../icons/eyeIcon';
import { RoundedButton } from './buttons';
import { DynamicForm } from './forms';

function ActivityDetail({
  data,
  dbData,
  oldDataCount,
  loadMoreData,
  toAdd,
  isLoadingMore,
  addContent,
  toEdit,
  updateActivityConfig,
  viewActivityTitle,
  updateAction,
  viewData
}: {
  data: any[];
  dbData: any;
  toAdd: boolean;
  addContent: any;
  toEdit: boolean;
  updateActivityConfig: any;
  viewActivityTitle: string;
  updateAction: any;
  viewData: any;
  oldDataCount?: number;
  loadMoreData?: () => void;
  isLoadingMore?: boolean;
}) {
  const { setIsOpen, setTitle, setContent } = useModal();
  const [error, setError] = useState(null);
  const openModal = () => {
    setTitle('Add activity');
    setContent(addContent);
    setIsOpen(true);
  };

  const viewActivityModal = (idx: number) => {
    setTitle(viewActivityTitle);
    setContent(<ActivityDetail data={[viewData[idx]]} />);
    setIsOpen(true);
  };

  const editModal = async (data: any, idx: number) => {
    try {
      setTitle(`Edit activity`);
      const resolvedConfig = await updateActivityConfig(data);
      const actionBind = updateAction.bind(null, idx);
      const form = () => <DynamicForm config={resolvedConfig} action={actionBind} />;
      setContent(form);
      setIsOpen(true);
    } catch (e) {
      console.error('Error in editModal:', e);
      setError(e);
    }
  };

  const handleEditClick = (idx: number) => {
    try {
      const activityData = dbData?.data.car.activities[idx];
      editModal(activityData, idx);
    } catch (e) {
      console.error('Error in handleEditClick:', e);
      setError(e);
    }
  };

  useEffect(() => {
    if (error) {
      console.error('Encountered error:', error);
    }
  }, [error]);

  return (
    <div className="mx-4 flex flex-col gap-4">
      <div className="flex w-full justify-end">
        {toAdd && (
          <RoundedButton
            onClick={openModal}
            label={<AddIcon className="size-3 fill-black stroke-black" />}
          />
        )}
      </div>

      {data?.length > 0 ? (
        <>
          {data.map((activity, idx) => (
            <div
              key={idx}
              className="relative mx-5 flex h-fit flex-col rounded-xl bg-grayUserActivity py-3"
            >
              <div className="mx-6 mb-2 mt-1 flex justify-between font-raleway font-semibold text-black">
                <span>{activity[0]?.title + ' ' + activity[0]?.value}</span>
                {toEdit && (
                  <div className="flex justify-between">
                    <button
                      onClick={() => viewActivityModal(idx)}
                      type="button"
                      className="hover:scale-105"
                    >
                      <EyeIcon className="mx-2 size-4" />
                    </button>
                    <button
                      onClick={() => handleEditClick(idx)}
                      type="button"
                      className="hover:scale-105"
                    >
                      <EditIcon className="mx-2 size-4" />
                    </button>
                  </div>
                )}
              </div>
              <div className="flex flex-col gap-1">
                {activity.slice(1).map((activityDetail, idx2) => (
                  <div key={idx2} className="mx-6 flex flex-row text-sm font-light">
                    <span className="flex w-28">{activityDetail.title}</span>
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
                <div className="mx-5 flex h-36 flex-col rounded-xl bg-grayUserActivity py-1"></div>
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
      )}
    </div>
  );
}

export default ActivityDetail;
