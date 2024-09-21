/**
 * Renders an SVG icon for adding an item.
 *
 * @param {string} className - Optional class name for the SVG element.
 * @return {React.JSX.Element} The SVG icon element.
 */
function AddIcon({ className }: { className?: string }): React.JSX.Element {
  return (
    <svg className={className} viewBox="0 0 512 512" fill="relative">
      <g>
        <path d="m256 512a25 25 0 0 1 -25-25v-462a25 25 0 0 1 50 0v462a25 25 0 0 1 -25 25z" />
        <path d="m487 281h-462a25 25 0 0 1 0-50h462a25 25 0 0 1 0 50z" />
      </g>
    </svg>
  );
}

export default AddIcon;
