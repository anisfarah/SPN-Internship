/**
 * Generates a JSX element for a calendar icon with an optional className.
 *
 * @param {string} className - an optional class name for styling
 * @return {React.JSX.Element} the calendar icon as a JSX element
 */
function CalendarIcon({ className }: { className?: string }): React.JSX.Element {
  return (
    <svg viewBox="0 0 512 512" className={className}>
      <g>
        <path d="m446 40h-46v-24c0-8.836-7.163-16-16-16s-16 7.164-16 16v24h-224v-24c0-8.836-7.163-16-16-16s-16 7.164-16 16v24h-46c-36.393 0-66 29.607-66 66v340c0 36.393 29.607 66 66 66h380c36.393 0 66-29.607 66-66v-340c0-36.393-29.607-66-66-66zm-380 32h46v16c0 8.836 7.163 16 16 16s16-7.164 16-16v-16h224v16c0 8.836 7.163 16 16 16s16-7.164 16-16v-16h46c18.748 0 34 15.252 34 34v38h-448v-38c0-18.748 15.252-34 34-34zm380 408h-380c-18.748 0-34-15.252-34-34v-270h448v270c0 18.748-15.252 34-34 34z" />
      </g>
    </svg>
  );
}

export default CalendarIcon;