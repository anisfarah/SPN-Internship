'use client';

import { usePathname, useRouter, useSearchParams } from 'next/navigation';
import { useEffect, useState } from 'react';

import EditIcon from '../icons/editIcon';
import { EditOverlayContainer } from './containers';

function UpdateContainer({
  children,
  title,
  idx,
  icon
}: {
  children: React.ReactNode;
  title: string;
  idx: number;
  icon?: React.JSX.Element;
}) {
  const [overlayIsOpen, setOverlayIsOpen] = useState(false);

  const searchParams = useSearchParams();
  const router = useRouter();
  const pathname = usePathname();

  const handleButtonClick = (idx: number) => {
    setOverlayIsOpen(!overlayIsOpen);
    // Pass idx here to wherever it's needed
    // console.log('Idx:', idx);
  };

  useEffect(() => {
    if (searchParams.has('refresh')) {
      const params = new URLSearchParams(searchParams);
      setOverlayIsOpen(false);
      params.delete('refresh');
      router.push(pathname + '?' + params.toString());
    }
  }, [searchParams]);

  return (
    <>
      <button
        onClick={() => handleButtonClick(idx)}
        className="flex size-full items-center justify-center"
      >
        {icon || <EditIcon className="md:sise-5 size-4" />}
      </button>
      <EditOverlayContainer isOpen={overlayIsOpen} setIsOpen={setOverlayIsOpen} title={title}>
        {children}
      </EditOverlayContainer>
    </>
  );
}

export default UpdateContainer;
