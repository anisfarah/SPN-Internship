'use client';
import { IFilterInputs } from '@/types/filters.type';
import { usePathname, useRouter, useSearchParams } from 'next/navigation';
import { Key, useState } from 'react';

import ResetIcon from '../icons/resetIcon';
import { AccordionContainer, FiltersContainer, FiltersOverlayContainer } from './containers';
import { MultiRangeSlider, SelectInput } from './inputs';

function Filter(filters: IFilterInputs) {
  const pathname = usePathname();
  const router = useRouter();
  const dataFilters = filters.allData;
  const q = useSearchParams();

  const initialFilterParams = dataFilters.reduce(
    (acc: { [x: string]: { isOpen: boolean } }, { valueKey }: { valueKey: string }) => {
      acc[valueKey] = { isOpen: false };

      return acc;
    },
    {}
  );

  const [filterParams, setFilterParams] = useState(initialFilterParams);

  const updateIsOpen = (option: any) => {
    setFilterParams((prevParams: { [x: string]: { isOpen: any } }) => ({
      ...prevParams,
      [option]: {
        ...prevParams[option],
        isOpen: !prevParams[option].isOpen
      }
    }));
  };

  const getIsOpenStatus = (option: string) => {
    return filterParams[option]?.isOpen;
  };

  function resetFilter() {
    router.push(pathname);
  }

  return (
    <>
      <FiltersOverlayContainer
        isOpen={filters.filterContainerIsOpen}
        setIsOpen={filters.setFilterContainerIsOpen}
        handleReset={() => resetFilter()}
        mobileOnly={!filters.overlayOnly}
      >
        {dataFilters.map((option: any, idx: Key) =>
          option.isRange ? (
            <AccordionContainer
              key={idx}
              title={option.title}
              isOpen={getIsOpenStatus(option.tag)}
              setIsOpen={() => updateIsOpen(option.tag)}
              isSelected={q.has(option.minKey) || q.has(option.maxKey)}
            >
              <MultiRangeSlider
                key={idx}
                min={option.min}
                max={option.max}
                minKey={option.minKey}
                maxKey={option.maxKey}
                tag={option.tag}
              />
            </AccordionContainer>
          ) : (
            <AccordionContainer
              key={idx}
              title={option.title}
              isOpen={getIsOpenStatus(option.valueKey)}
              setIsOpen={() => updateIsOpen(option.valueKey)}
              isSelected={q.has(option.valueKey)}
              selectionNumber={q.getAll(option.valueKey)?.length}
            >
              <SelectInput
                isMobile
                title={option.title}
                isMultiple
                options={option.values}
                isBool={false}
                valueKey={option.valueKey}
                withSearch={option.withSearch}
                searchPlaceholder={option.searchPlaceholder}
              />
            </AccordionContainer>
          )
        )}
      </FiltersOverlayContainer>
      {/* Filters Container for desktop */}
      {!filters.overlayOnly && (
        <FiltersContainer>
          {dataFilters.map((option: any, idx: Key) => (
            <div key={idx} className="w-72">
              <SelectInput
                title={option.title}
                isBool={
                  filters?.filterFieldsType ? filters?.filterFieldsType[option.valueKey] : false
                }
                isMultiple
                options={option.values}
                valueKey={option.valueKey}
              />
            </div>
          ))}
          <div
            className="flex size-fit cursor-pointer items-center justify-center"
            onClick={() => resetFilter()}
          >
            <ResetIcon className="size-7 fill-black" />
          </div>
        </FiltersContainer>
      )}
    </>
  );
}

export default Filter;
