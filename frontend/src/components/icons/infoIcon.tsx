import React from 'react';

/**
 * Component for displaying an info icon.
 * @param className Optional additional class name for the icon.
 * @returns JSX element for the info icon.
 */
function InfoIcon({ className }: { className?: string }): React.JSX.Element {
  return (
    <svg viewBox="0 0 512 512" className={className}>
      <g>
        <path
          d="M290.211,360.727c-5.234,0.488-10.489-0.693-15.011-3.375c-3.304-3.392-4.888-8.101-4.305-12.8
				c0.122-3.912,0.589-7.806,1.396-11.636c0.781-4.394,1.79-8.744,3.025-13.033l13.731-47.244c1.416-4.663,2.352-9.459,2.793-14.313
				c0-5.236,0.698-8.844,0.698-10.938c0.292-9.333-3.693-18.289-10.822-24.32c-8.769-6.732-19.689-10.041-30.72-9.309
				c-7.905,0.119-15.749,1.413-23.273,3.84c-8.223,2.56-16.873,5.624-25.949,9.193l-3.956,15.36
				c2.676-0.931,5.935-1.978,9.658-3.142c3.552-1.052,7.234-1.601,10.938-1.629c5.196-0.563,10.426,0.713,14.778,3.607
				c2.956,3.527,4.343,8.109,3.84,12.684c-0.013,3.913-0.442,7.814-1.28,11.636c-0.815,4.073-1.862,8.378-3.142,12.916
				l-13.847,47.476c-1.116,4.413-2.009,8.879-2.676,13.382c-0.544,3.855-0.816,7.743-0.815,11.636
				c-0.057,9.397,4.24,18.291,11.636,24.087c8.904,6.837,19.98,10.226,31.185,9.542c7.89,0.162,15.753-0.978,23.273-3.375
				c6.594-2.25,15.399-5.469,26.415-9.658l3.724-14.662c-2.984,1.238-6.057,2.249-9.193,3.025
				C298.346,360.583,294.274,360.935,290.211,360.727z"
        />
        <path
          d="M304.756,136.727c-6.333-5.816-14.677-8.945-23.273-8.727c-8.591-0.194-16.927,2.932-23.273,8.727
				c-11.632,10.03-12.931,27.591-2.9,39.224c0.894,1.037,1.863,2.006,2.9,2.9c13.252,11.853,33.294,11.853,46.545,0
				c11.632-10.129,12.851-27.769,2.722-39.401C306.635,138.481,305.725,137.571,304.756,136.727z"
        />
        <path
          d="M256,0C114.615,0,0,114.615,0,256s114.615,256,256,256s256-114.615,256-256S397.385,0,256,0z M256,488.727
				C127.468,488.727,23.273,384.532,23.273,256S127.468,23.273,256,23.273S488.727,127.468,488.727,256S384.532,488.727,256,488.727
				z"
        />
      </g>
    </svg>
  );
}

export default InfoIcon;
