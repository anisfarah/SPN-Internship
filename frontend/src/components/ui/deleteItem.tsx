'use client';

import { deleteServicesAction } from '@/actions/accommodations/services.action';
import { useAlert } from '@/helpers/alertHelper';
import { useState } from 'react';

import ArchiveIcon from '../icons/ArchiveIcon';
import { EditOverlayContainer } from './containers';

export default function DeleteItem({
  //   isActive,
  item,
  slug
}: {
  item: string;
  //   isActive: boolean;
  slug: string;
}) {
  const [isOpen, setIsOpen] = useState(false);
  const { setAlert } = useAlert();
  const handleSubmit = async () => {
    const result = await deleteServicesAction(slug);
    if (result) {
      setAlert({
        status: result?.status,
        message: result?.alert
      });
    }
  };

  return (
    // isActive !== null && (
    <>
      <div
        className={`absolute right-3 top-6 z-20 flex size-10 items-center justify-center rounded-full bg-bgButton opacity-85 hover:cursor-pointer`}
      >
        <button onClick={() => setIsOpen(true)} type="button">
          <ArchiveIcon className="size-6 fill-black duration-200 ease-in-out hover:scale-110" />
        </button>

        <EditOverlayContainer
          title="Delete Service"
          archive
          isOpen={isOpen}
          setIsOpen={setIsOpen}
          confirm={() => {
            handleSubmit();
            setIsOpen(false);
          }}
        >
          <div className="flex size-full justify-center">
            Are you sure you want to delete {item}?
          </div>
        </EditOverlayContainer>
      </div>
    </>
  );
  //   );
}
