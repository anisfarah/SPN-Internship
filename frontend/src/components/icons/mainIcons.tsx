function MinusIcon({ ...props }: { className?: string }) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      aria-label="Minus Icon"
      width={25}
      height={25}
      viewBox="0 0 368.9 368.9"
      className={props.className}
    >
      <path
        d="M343.7,200.4H25.2c-8.8,0-16-7.2-16-16v0c0-8.8,7.2-16,16-16h318.6c8.8,0,16,7.2,16,16v0
	C359.7,193.3,352.5,200.4,343.7,200.4z"
      />
    </svg>
  );
}
function PlusIcon({ ...props }: { className?: string }) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      aria-label="Plus Icon"
      width={25}
      height={25}
      viewBox="0 0 368.9 368.9"
      className={props.className}
    >
      <path
        d="M343.7,168.4H200.4V25.2c0-8.8-7.2-16-16-16s-16,7.2-16,16v143.3H25.2c-8.8,0-16,7.2-16,16c0,8.8,7.2,16,16,16h143.3v143.3
	c0,8.8,7.2,16,16,16s16-7.2,16-16V200.4h143.3c8.8,0,16-7.2,16-16S352.5,168.4,343.7,168.4z"
      />
    </svg>
  );
}

export { MinusIcon, PlusIcon };
