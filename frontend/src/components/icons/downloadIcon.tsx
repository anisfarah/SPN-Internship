/**
 * Generates a download icon as an SVG element.
 *
 * @param {string} className - Optional class name for the SVG element.
 * @return {React.JSX.Element} The download icon as an SVG element.
 */
function DownloadIcon({ className }: { className?: string }): React.JSX.Element {
  return (
    <svg
      fill="none"
      x="0"
      y="0"
      viewBox="0 0 64 64"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
    >
      <g transform="matrix(1.02,0,0,1.02,-0.6373085308074948,-0.6399999475479135)">
        <g fill="#000">
          <path
            d="M61 46.1c-1 0-1.8.8-1.8 1.8v11.4H4.7V47.8c0-1-.8-1.8-1.8-1.8s-1.8.8-1.8 1.8v12.4c0 1.4 1.4 2.6 3.1 2.6h55.3c1.7 0 3.1-1.1 3.1-2.6V47.8c.2-.9-.6-1.7-1.6-1.7zM28.9 43.2c.9.8 2 1.3 3.1 1.3s2.2-.4 3-1.2l7.7-7.4c.7-.7.7-1.8 0-2.5s-1.8-.7-2.5 0l-6.5 6.3V3c0-1-.8-1.8-1.8-1.8S30.1 2 30.1 3v36.6l-6.5-6.4c-.7-.7-1.8-.7-2.5 0s-.7 1.8 0 2.5z"
            fill="#000000"
            data-original="#000000"
          />
        </g>
      </g>
    </svg>
  );
}

export default DownloadIcon;
