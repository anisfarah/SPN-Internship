/**
 * A search icon.
 *
 * @param className A CSS class to apply to the icon.
 * @returns The rendered icon.
 */
function SearchIcon({ className }: { className?: string }): React.JSX.Element {
  return (
    <svg
      className={className}
      fill="none"
      viewBox="0 0 20 20"
      strokeWidth="1"
      stroke="currentColor"
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        d="M21 21l-5.197-5.197m0 0A7.5 7.5 0 105.196 5.196a7.5 7.5 0 0010.607 10.607z"
      />
    </svg>
  );
}

export default SearchIcon;
