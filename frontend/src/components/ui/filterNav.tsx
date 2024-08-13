'use client';

import { FilterNavProps } from '@/types/filterNav.type';
import Link from 'next/link';
import { useState } from 'react';

import AddIcon from '../icons/addIcon';
import FilterIcon from '../icons/filterIcon';
import SearchIcon from '../icons/searchIcon';
import { RoundedButton } from './buttons';
import Filter from './filter';
import Search from './search';

/**
 * Render a navigation bar with search and filter options.
 *
 * @param {Object} props - The props for the component.
 * @param {Array} props.withSearch - Add the search component.
 * @param {Array} props.filterData - The data for the filter component.
 * @param {string} props.addData - The link for the add button.
 * @returns {JSX.Element} The rendered component.
 */
export default function FilterNav(props: FilterNavProps): JSX.Element {
  const [filterContainerIsOpen, setFilterContainerIsOpen] = useState<boolean>(false);
  const [searchContainerIsOpen, setSearchContainerIsOpen] = useState<boolean>(false);

  return (
    <>
      <nav
        className={`fixed right-0 top-0 z-40 flex max-h-16 w-fit items-center justify-end gap-2 px-4 py-5 font-text lg:hidden`}
      >
        <div className="flex items-center justify-between gap-3">
          {props.withSearch && (
            <RoundedButton
              onClick={() => setSearchContainerIsOpen(true)}
              label={<SearchIcon className="size-4" />}
            />
          )}
          {props.addData && typeof props.addData === 'string' ? (
            <Link href={props.addData}>
              <RoundedButton label={<AddIcon className="size-3"></AddIcon>} />
            </Link>
          ) : (
            props.addData
          )}

          {props.filterData && (
            <RoundedButton
              onClick={() => setFilterContainerIsOpen(true)}
              label={<FilterIcon className="size-4" />}
            />
          )}
        </div>
      </nav>
      {props.filterData && (
        <Filter
          allData={props.filterData}
          filterFieldsType={props.filterFieldsType}
          filterContainerIsOpen={filterContainerIsOpen}
          setFilterContainerIsOpen={setFilterContainerIsOpen}
        />
      )}
      {props.withSearch && (
        <Search
          searchContainerIsOpen={searchContainerIsOpen}
          setSearchContainerIsOpen={setSearchContainerIsOpen}
        />
      )}
    </>
  );
}

export function FilterNavOverlay(props: FilterNavProps) {
  const [filterContainerIsOpen, setFilterContainerIsOpen] = useState<boolean>(false);

  return (
    <>
      <nav className={`flex max-h-16 w-fit items-center justify-end gap-2 py-5 font-text`}>
        <div className="flex items-center justify-between gap-3">
          <RoundedButton
            onClick={() => setFilterContainerIsOpen(true)}
            label={<FilterIcon className="size-4" />}
          />
        </div>
      </nav>
      <Filter
        allData={props.filterData}
        filterFieldsType={props.filterFieldsType}
        filterContainerIsOpen={filterContainerIsOpen}
        setFilterContainerIsOpen={setFilterContainerIsOpen}
        overlayOnly
      />
    </>
  );
}
