'use client';
import React, { useState } from 'react';

import StarIcon from '../icons/starIcon';
import { LabelText } from './texts';

function StarRating({ label, name }: any) {
  const [hovered, setHovered] = useState(0);
  const [rating, setRating] = useState(0);

  const handleMouseEnter = (index: number) => {
    setHovered(index);
  };

  const handleMouseLeave = () => {
    setHovered(0);
  };

  const handleClick = (index: number) => {
    setRating(index);
  };

  return (
    <div className="flex justify-between space-y-1">
      <LabelText label={`${label} :`} />
      <div className="flex">
        {[1, 2, 3, 4, 5].map((star, index) => {
          return (
            <div
              key={index}
              onMouseEnter={() => handleMouseEnter(star)}
              onMouseLeave={handleMouseLeave}
              onClick={() => handleClick(star)}
              className={`cursor-pointer px-0.5`}
            >
              <StarIcon
                className={`size-5 duration-200 ease-in-out ${
                  hovered >= star || rating >= star
                    ? 'fill-primary stroke-primary'
                    : 'fill-transparent stroke-black'
                }`}
              />
            </div>
          );
        })}
        <input type="hidden" value={rating} name={name} />
      </div>
    </div>
  );
}

export default StarRating;
