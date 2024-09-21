/**
 * Render a star icon SVG
 * @param className Class name(s) to add to the SVG element
 * @returns The rendered SVG element
 */
function StarIcon({ className }: { className?: string }): React.JSX.Element {
  return (
    // <svg className={className} viewBox="0 0 512 512" fill="relative">
    <svg className={className} xmlns="http://www.w3.org/2000/svg" viewBox="0 0 511 505.2">
      <path
        strokeMiterlimit={10}
        strokeWidth={5}
        d="M502.2,194.6c-3.2-10-12.2-17.2-22.7-18.1l-143.1-13-56.6-132.5c-4.2-9.7-13.7-16-24.2-16s-20.1,6.3-24.2,16l-56.6,132.4-143.2,13c-10.5,1-19.4,8.1-22.7,18.1-3.3,10-.2,21.1,7.7,28l108.2,94.9-31.9,140.5c-2.3,10.3,1.7,21,10.2,27.2,4.6,3.3,10,5,15.4,5s9.3-1.3,13.5-3.8l123.5-73.8,123.4,73.8c9,5.4,20.4,4.9,29-1.3,8.6-6.2,12.6-16.9,10.2-27.2l-31.9-140.5,108.2-94.9c8-7,11-18,7.7-28Z"
      />
    </svg>
  );
}

export default StarIcon;
