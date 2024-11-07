/**
 * Renders an SVG icon for adding an item.
 *
 * @param {string} className - Optional class name for the SVG element.
 * @return {React.JSX.Element} The SVG icon element.
 */
function TrashIcon({ className }: { className?: string }): React.JSX.Element {
  return (
    <svg className={className} viewBox="0 0 30 30" xmlns="http://www.w3.org/2000/svg">
      <g>
        <path d="m28.948 4.446h-6.788l-.273-1.35c-.45-1.667-1.961-2.827-3.688-2.832h-6.4c-1.77.012-3.303 1.229-3.715 2.95l-.247 1.232h-6.785c-.972.002-.987 1.496 0 1.5h24.483c-.009.113-1.409 16.225-1.492 18.655-.064 1.883-1.386 3.475-3.266 3.6-1.887.042-9.335.042-11.222 0-1.88-.125-3.202-1.717-3.266-3.6-.083-2.43-.616-7.075-1.116-13.838-.054-.87-.056-1.301-.868-1.341-.785.11-.699.852-.628 1.452.5 6.775 1.014 11.433 1.117 13.832.116 2.704 2.113 4.937 4.818 5 1.775.041 9.333.041 11.108 0 2.705-.063 4.702-2.296 4.818-5 .103-2.399 1.504-18.6 1.509-18.76h1.9c.981-.005.981-1.496.001-1.5zm-19.582 0 .18-.908c.257-1.037 1.185-1.767 2.253-1.774h6.4c1.034-.002 1.944.681 2.231 1.675l.2 1.007z" />
        <path d="m12.161 23.932c.427.004.773-.361.749-.787l-.618-12.084c-.067-.967-1.541-.91-1.498.076l.618 12.084c.021.398.35.71.749.711z" />
        <path d="m18.585 23.22.614-12.084c.022-.414-.297-.767-.711-.787-.41-.012-.757.302-.787.711l-.614 12.084c-.047.976 1.443 1.057 1.498.076z" />
      </g>
    </svg>
  );
}

export default TrashIcon;