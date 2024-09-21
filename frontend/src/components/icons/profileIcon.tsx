/**
 * Renders a profile icon.
 * @param className {string} class name to be applied to the svg element.
 * @returns {React.JSX.Element}
 */
function ProfileIcon({ className }: { className?: string }): React.JSX.Element {
  return (
    <svg className={className} viewBox="0 0 100 100">
      <g transform="matrix(1.4000000000000008,0,0,1.4000000000000008,-20.000000000000043,-19.99669952392584)">
        <path d="M60.236 52.443C66.217 48.919 70.25 42.43 70.25 35c0-11.167-9.083-20.25-20.25-20.25S29.75 23.833 29.75 35c0 7.43 4.033 13.919 10.014 17.443C26.989 56.735 17.75 68.797 17.75 83c0 2.978 4.5 2.978 4.5 0 0-15.302 12.448-27.75 27.75-27.75S77.75 67.698 77.75 83c0 2.978 4.5 2.978 4.5 0 0-14.203-9.239-26.265-22.014-30.557zM34.25 35c0-8.685 7.065-15.75 15.75-15.75S65.75 26.315 65.75 35 58.685 50.75 50 50.75 34.25 43.685 34.25 35z" />
      </g>
    </svg>
  );
}

export default ProfileIcon;
