'use client';
import { DeleteLocation } from '@/services/agency.service';
import { useRouter } from 'next/navigation';
import React from 'react';

import TrashIcon from '../icons/trashIcon';
import { RoundedButton } from './buttons';

function DeleteLocationButton({ index, agencyId }: { index: number; agencyId: string }) {
  const router = useRouter();

  const deleteLocation = async () => {
    const response = await DeleteLocation(index, agencyId);
    if (response.status === 200) {
      router.refresh();
    }
  };

  return (
    <RoundedButton
      onClick={async () => await deleteLocation()}
      label={<TrashIcon className="size-4" />}
      className="group flex size-5 items-center justify-center rounded-full font-text text-2xl hover:fill-primary hover:text-primary"
    />
  );
}

export default DeleteLocationButton;
