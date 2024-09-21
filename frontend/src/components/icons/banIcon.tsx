/**
 * Generates a ban icon as an SVG element.
 *
 * @param {string} className - optional class name for the SVG element
 * @return {React.JSX.Element} The ban icon as an SVG element
 */
function BanIcon({ className }: { className?: string }): React.JSX.Element {
  return (
    <svg className={className} viewBox="0 0 512 512">
      <g>
        <path d="M256 0C114.84 0 0 114.84 0 256s114.84 256 256 256 256-114.84 256-256S397.16 0 256 0zm0 474.718C135.4 474.718 37.282 376.6 37.282 256S135.4 37.282 256 37.282 474.718 135.4 474.718 256 376.6 474.718 256 474.718z" />
        <path d="M79.392 406.842 406.23 80.003l26.357 26.357-326.84 326.84z" />
      </g>
    </svg>
  );
}

export default BanIcon;
