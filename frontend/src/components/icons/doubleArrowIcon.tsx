/**
 * Renders a double arrow icon as an SVG element.
 *
 * @param {string} [className] - Optional class name to apply to the SVG element.
 * @return {React.JSX.Element} The rendered double arrow icon.
 */
function DoubleArrowIcon({ className }: { className?: string }): React.JSX.Element {
  return (
    <svg className={className} viewBox="0 0 512 512">
      <g>
        <path
          id="Icon_ionic-ios-arrow-forward"
          d="M361.5,255.9l-100-93.2c-6.8-6.2-7.4-16.7-1.2-23.6c0.4-0.4,0.8-0.8,1.2-1.2
		c7.6-6.8,19.1-6.8,26.8,0l113.3,105.5c6.8,6.2,7.4,16.8,1.2,23.6c-0.2,0.2-0.4,0.5-0.6,0.7L288.3,374.1c-7.6,6.8-19.2,6.8-26.8,0
		c-6.8-6.2-7.4-16.7-1.2-23.6c0.4-0.4,0.8-0.8,1.2-1.2L361.5,255.9z"
        />
        <path
          id="Icon_ionic-ios-arrow-forward-2"
          d="M210.4,255.9l-100-93.2c-6.8-6.2-7.4-16.7-1.2-23.6
		c0.4-0.4,0.8-0.8,1.2-1.2c7.6-6.8,19.1-6.8,26.8,0l113.3,105.5c6.8,6.2,7.4,16.8,1.2,23.6c-0.2,0.2-0.4,0.5-0.6,0.7L137.3,374.1
		c-7.6,6.8-19.2,6.8-26.8,0c-6.8-6.2-7.4-16.7-1.2-23.6c0.4-0.4,0.8-0.8,1.2-1.2L210.4,255.9z"
          fill="#ACACAC"
        />
      </g>
    </svg>
  );
}

export default DoubleArrowIcon;
