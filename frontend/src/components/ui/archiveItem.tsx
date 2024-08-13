'use client';
import archiveBrandAction from '@/actions/brands/archiveBrand.action';
import { useAlert } from '@/helpers/alertHelper';
import { useState } from 'react';

import ArchiveIcon from '../icons/ArchiveIcon';
import ResetIcon from '../icons/resetIcon';
import { EditOverlayContainer } from './containers';

export default function ArchiveItem({
  isActive,
  item,
  slug
}: {
  item: string;
  isActive: boolean;
  slug: string;
}) {
  const [isOpen, setIsOpen] = useState(false);
  const { setAlert } = useAlert();
  const handleSubmit = async () => {
    const result = await archiveBrandAction(slug);
    if (result) {
      setAlert({
        status: result?.status,
        message: result?.response?.message || result?.response?.error
      });
    }
  };

  return (
    isActive !== null && (
      <>
        <div
          className={`absolute right-3 top-6 z-20 flex size-10 items-center justify-center rounded-full bg-bgButton opacity-85 hover:cursor-pointer`}
        >
          {isActive ? (
            <button onClick={() => setIsOpen(true)} type="button">
              <ArchiveIcon className="size-6 fill-black duration-200 ease-in-out hover:scale-110" />
            </button>
          ) : (
            <button onClick={() => setIsOpen(true)} type="button">
              <ResetIcon className="size-6 fill-black duration-200 ease-in-out hover:scale-110" />
            </button>
          )}
        </div>
        <EditOverlayContainer
          title="archive item"
          archive
          isOpen={isOpen}
          setIsOpen={setIsOpen}
          confirm={() => {
            handleSubmit();
            setIsOpen(false);
          }}
        >
          <div className="flex size-full justify-center">
            Are you sure you want to {isActive ? 'archive' : 'reset'} {item}?
          </div>
        </EditOverlayContainer>
      </>
    )
  );
}
