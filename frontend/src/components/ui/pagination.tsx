'use client';
import { PaginationProps } from '@/types/serverPagination.type';
import { usePathname, useRouter, useSearchParams } from 'next/navigation';
import { useCallback } from 'react';

import SimpleArrowIcon from '../icons/simpleArrowIcon';
import Button, { RoundedButton } from './buttons';
import { Text } from './texts';

function Pagination(props: PaginationProps) {
  const pathname = usePathname();
  const router = useRouter();
  const queryParams = useSearchParams();
  const lastPage = Math.ceil(props.totalCount / props.pageSize);
  const pageValue = parseInt(queryParams.get('page') || '1');
  const currentPage =
    Number.isNaN(pageValue) || pageValue < 1 ? 1 : pageValue > lastPage ? lastPage : pageValue;

  const createQueryString = useCallback(
    (name: string, value: any) => {
      const params = new URLSearchParams(queryParams);

      params.set(name, value.toString());

      // params.set(name, value);

      return params.toString();
    },
    [queryParams]
  );

  const handleNext = () => {
    // setpageValue(pageValue);
    router.push(pathname + '?' + createQueryString('page', currentPage + 1));
    // setpageValue(parseInt(pageValue) + 1);
    // router.push(pageValue);
  };

  const handlePrevious = () => {
    // setpageValue(pageValue);
    router.push(pathname + '?' + createQueryString('page', currentPage - 1));
    // setpageValue(parseInt(pageValue) - 1);
    // router.push(pageValue);
  };

  // if (currentPage === 0 || paginationRange == null || paginationRange?.length < 2) {
  //   return null;
  // }

  const onNext = () => {
    handleNext();
    // handleChange();
  };

  const onPrevious = () => {
    // onPageChange(currentPage - 1);
    handlePrevious();
  };

  return (
    <div className="flex h-fit w-full items-center justify-center p-4 py-8">
      <div className="hidden md:block">
        <Button disabled={currentPage === 1} onClick={onPrevious} label="Prev" />
      </div>
      <div className="md:hidden">
        <RoundedButton
          disabled={currentPage === 1}
          onClick={onPrevious}
          label={<SimpleArrowIcon className={`size-5 rotate-180`} />}
        />
      </div>
      <div className="flex flex-col items-center justify-center text-sm md:text-xs">
        <Text>Page</Text>
        <span className="mx-4 flex w-20 justify-center">
          <Text> {`${currentPage} / ${lastPage}`}</Text>
        </span>
      </div>
      <div className="hidden md:block">
        <Button disabled={currentPage === lastPage} onClick={onNext} label="Next" />
      </div>
      <div className="md:hidden">
        <RoundedButton
          disabled={currentPage === lastPage}
          onClick={onNext}
          label={<SimpleArrowIcon className={`size-5`} />}
        />
      </div>
    </div>
  );
}

export default Pagination;
