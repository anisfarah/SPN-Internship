/**
 * Render a simple arrow icon.
 *
 * @param className CSS class names to apply to the SVG element
 * @returns The rendered SVG element
 */
function SimpleArrowIcon({ className }: { className?: string }): React.JSX.Element {
  return (
    <svg className={className} viewBox="0 0 512 512">
      <g>
        <path
          id="Icon_ionic-ios-arrow-forward"
          d="M361.5,255.9l-100-93.2c-6.8-6.2-7.4-16.7-1.2-23.6c0.4-0.4,0.8-0.8,1.2-1.2
		c7.6-6.8,19.1-6.8,26.8,0l113.3,105.5c6.8,6.2,7.4,16.8,1.2,23.6c-0.2,0.2-0.4,0.5-0.6,0.7L288.3,374.1c-7.6,6.8-19.2,6.8-26.8,0
		c-6.8-6.2-7.4-16.7-1.2-23.6c0.4-0.4,0.8-0.8,1.2-1.2L361.5,255.9z"
        />
      </g>
    </svg>
  );
}

export default SimpleArrowIcon;
