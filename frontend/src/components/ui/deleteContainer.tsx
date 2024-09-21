'use client';

import { useModal } from '@/helpers/modalHelper';
import { usePathname, useRouter, useSearchParams } from 'next/navigation';
import { useEffect, useState } from 'react';

import TrashIcon from '../icons/trashIcon';
import Button from './buttons';
import { EditOverlayContainer } from './containers';

function DeleteContainer({
  children,
  title,
  onDelete
}: {
  children: React.ReactNode;
  title: string;
  onDelete?: () => void;
}) {
  const [overlayIsOpen, setOverlayIsOpen] = useState(false);

  const searchParams = useSearchParams();
  const router = useRouter();
  const pathname = usePathname();

  useEffect(() => {
    if (searchParams.has('refresh')) {
      const params = new URLSearchParams(searchParams);
      setOverlayIsOpen(false);
      params.delete('refresh');
      router.push(pathname + '?' + params.toString());
    }
  }, [searchParams]);

  // UseModal solution
  const { setIsOpen, setTitle, setContent } = useModal();

  const openDeleteModal = () => {
    setTitle(title);
    setContent(renderDeleteContent());
    setIsOpen(true);
  };

  const handleDelete = () => {
    if (onDelete) {
      onDelete();
    }
    setIsOpen(false);
  };

  const renderDeleteContent = () => (
    <div className="gap-4 p-4">
      <p className="gap-6 text-center text-lg font-light">
        Are you sure you want to delete this item?
      </p>
      <div className="mt-4 flex flex-col items-center gap-4 space-y-4">
        <button>
          <Button onClick={handleDelete} withArrow label="Delete" />
        </button>
        <button onClick={() => setIsOpen(false)} className="underline">
          {' '}
          cancel
        </button>
      </div>
    </div>
  );

  return (
    <>
      <button onClick={openDeleteModal} className="relative size-full">
        <TrashIcon />
      </button>
      <EditOverlayContainer isOpen={overlayIsOpen} setIsOpen={setOverlayIsOpen} title={title}>
        {children}
      </EditOverlayContainer>
    </>
  );
}

export default DeleteContainer;
