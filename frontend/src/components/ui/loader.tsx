import Image from 'next/image';
import React from 'react';

function Loader() {
  return (
    <div className="relative flex h-60 w-full items-center justify-center">
      <div className="relative size-32">
        <Image
          alt=""
          src="/images/loader.gif"
          className="object-contain"
          fill
          priority
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 70vw, 50vw"
        />
      </div>
    </div>
  );
}

export default Loader;
