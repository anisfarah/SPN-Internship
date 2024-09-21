/**
 * Generate a Chevron Icon component with an optional class name.
 *
 * @param {string} className - optional class name for styling
 * @return {React.JSX.Element} the Chevron Icon component
 */
function ChevronIcon({ className }: { className?: string }): React.JSX.Element {
  return (
    <svg viewBox="0 0 317 274" className={className}>
      <g stroke="none">
        <path
          d="M191.5,138.2L81.3,35.5c-7.5-6.8-8.2-18.4-1.3-26c0.4-0.4,0.9-0.9,1.3-1.3
		c8.4-7.5,21-7.5,29.5,0l124.8,116.2c7.5,6.8,8.2,18.5,1.3,26c-0.2,0.2-0.4,0.6-0.7,0.8L110.9,268.4c-8.4,7.5-21.1,7.5-29.5,0
		c-7.5-6.8-8.2-18.4-1.3-26c0.4-0.4,0.9-0.9,1.3-1.3L191.5,138.2z"
        />
      </g>
    </svg>
  );
}

export default ChevronIcon;
