'use client';
import { SearchProps } from '@/types/search.type';

import { SearchOverlayContainer } from './containers';
import { SearchInput } from './inputs';

/**
 * Search component with debounced search functionality.
 *
 * @param {Object} props - The component props.
 * @param {boolean} props.searchContainerIsOpen - Whether the search container is open.
 * @param {Function} props.setSearchContainerIsOpen - Function to set the search container open state.
 * @returns {JSX.Element} The Search component.
 */
function Search(props: SearchProps): JSX.Element {
  return (
    <>
      <SearchOverlayContainer
        isOpen={props.searchContainerIsOpen}
        setIsOpen={props.setSearchContainerIsOpen}
      >
        <SearchInput />
      </SearchOverlayContainer>
    </>
  );
}

export default Search;
