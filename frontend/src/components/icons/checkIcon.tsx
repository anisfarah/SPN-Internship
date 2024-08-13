/**
 * Creates a CheckIcon component with an optional className.
 *
 * @param {string} className - optional class name for the SVG element
 * @return {React.JSX.Element} the CheckIcon component
 */
function CheckIcon({ className }: { className?: string }): React.JSX.Element {
  return (
    <svg className={className} viewBox="0 0 24 24">
      <path d="m20.6136 5.64877c.4199.36742.458 1.00751.0845 1.42204l-10.5139 11.66979c-.37544.4167-1.02006.4432-1.42843.0588l-6.08403-5.7276c-.37942-.3572-.41574-.9524-.09021-1.3593.3592-.449 1.02811-.5108 1.4556-.1263l4.72039 4.2459c.41022.369 1.04179.336 1.41138-.0737l9.0435-10.02691c.3659-.40576.99-.44254 1.4012-.08272z" />
    </svg>
  );
}

export default CheckIcon;
