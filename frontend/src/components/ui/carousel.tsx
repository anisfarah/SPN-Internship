'use client';

import { Variants, motion } from 'framer-motion';
import Image from 'next/image';
import { useRef, useState } from 'react';

const variants = {
  toLeft: {
    x: '-100%',
    scale: 0.75,
    opacity: 0.5,
    zIndex: 0,
    transition: { duration: 0.6, ease: 'easeOut' },
    pointerEvents: 'none'
  },
  toRight: {
    x: '100%',
    scale: 0.75,
    opacity: 0.5,
    zIndex: 0,
    transition: { duration: 0.6, ease: 'easeOut' },
    pointerEvents: 'none'
  },
  toLeftHidden: {
    x: '-200%',
    scale: 0,
    opacity: 0,
    zIndex: -10,
    pointerEvents: 'none',
    transition: { duration: 0.6, ease: 'easeOut' }
  },
  toRightHidden: {
    x: '200%',
    scale: 0,
    opacity: 0,
    zIndex: -10,
    pointerEvents: 'none',
    transition: { duration: 0.6, ease: 'easeOut' }
  },
  center: {
    x: 0,
    scale: 1,
    opacity: 1,
    zIndex: 1,
    pointerEvents: 'initial',
    transition: { duration: 0.6, ease: 'easeOut' }
  },
  hidden: {
    x: 0,
    opacity: 0,
    scale: '0',
    transition: { duration: 0.6, ease: 'easeOut' }
  }
};
const cardsVariants: Variants = {
  toLeft: {
    x: '-100%',
    opacity: 0.5,
    zIndex: 0,
    transition: { duration: 0.6, ease: 'easeOut' },
    pointerEvents: 'none'
  },
  toRight: {
    x: '100%',
    opacity: 0.5,
    zIndex: 0,
    transition: { duration: 0.6, ease: 'easeOut' },
    pointerEvents: 'none'
  },
  toLeftHidden: {
    x: '-200%',
    scale: 0,
    opacity: 0,
    zIndex: -10,
    pointerEvents: 'none',
    transition: { duration: 0.6, ease: 'easeOut' }
  },
  toRightHidden: {
    x: '200%',
    scale: 0,
    opacity: 0,
    zIndex: -10,
    pointerEvents: 'none',
    transition: { duration: 0.6, ease: 'easeOut' }
  },
  center: {
    x: 0,
    scale: 1,
    opacity: 1,
    zIndex: 1,
    pointerEvents: 'initial',
    transition: { duration: 0.6, ease: 'easeOut' }
  },
  hidden: {
    x: 0,
    opacity: 0,
    scale: '0',
    transition: { duration: 0.6, ease: 'easeOut' }
  }
};

function Carousel(imageArray: string[]) {
  const [current, setCurrent] = useState(0);

  const [touchPosition, setTouchPosition] = useState(null);
  // ...
  const handleTouchStart = (e: any) => {
    const touchDown = e.touches[0].clientX;
    setTouchPosition(touchDown);
  };
  const handleTouchMove = (e: any) => {
    const touchDown = touchPosition;

    if (touchDown === null) {
      return;
    }

    const currentTouch = e.touches[0].clientX;
    const diff = touchDown - currentTouch;

    if (diff > 5) {
      if (current === imageArray.length - 1) {
        setCurrent(0);
      } else {
        setCurrent(current + 1);
      }
    }

    if (diff < -5) {
      if (current === 0) {
        setCurrent(imageArray.length - 1);
      } else {
        setCurrent(current - 1);
      }
    }

    setTouchPosition(null);
  };

  return (
    <div className="relative flex size-full items-center justify-center px-20">
      <div className="relative flex size-full justify-center gap-5">
        {imageArray.map((item, idx, { length }) => (
          <div
            className={`relative h-full cursor-pointer rounded-xl transition-all duration-700 ${
              current === idx
                ? `z-10 order-2 w-4/5 opacity-100`
                : idx === current + 1 ||
                    idx === current - 1 ||
                    (current === 0 && idx === length - 1) ||
                    (current === length - 1 && idx === 0)
                  ? `z-10 w-[10%] scale-75 opacity-30 ${((current === length - 1 && idx === 0) || idx === current + 1) && 'order-3'} ${((current === 0 && idx === length - 1) || idx === current - 1) && 'order-1'} `
                  : idx === current + 2 ||
                      idx === current - 2 ||
                      (current === 0 && idx === length - 2) ||
                      (current === 1 && idx === length - 1) ||
                      (current === length - 2 && idx === 0) ||
                      (current === length - 1 && idx === 1)
                    ? `z-30 w-0 scale-75 opacity-0 ${idx === current + 2 && 'order-3'} ${
                        ((current === length - 2 && idx === 0) ||
                          (current === length - 1 && idx === 1)) &&
                        'order-4'
                      } ${idx === current - 2 && 'order-1'}`
                    : 'hidden'
            }`}
            key={idx}
            onTouchStart={handleTouchStart}
            onTouchMove={handleTouchMove}
            onClick={() => setCurrent(idx)}
          >
            <h2 className="absolute z-50 text-5xl text-red">{idx}</h2>

            <Image alt="" src={item} fill className="rounded-xl object-cover" />
          </div>
        ))}
      </div>
      <div className="absolute top-1/2 flex w-full items-center justify-between">
        <div
          id="previousButton"
          onClick={() => {
            if (current === 0) {
              setCurrent(imageArray.length - 1);
            } else {
              setCurrent(current - 1);
            }
          }}
          className="z-30 cursor-pointer px-4"
        >
          Prev
        </div>
        <div
          id="nextButton"
          onClick={() => {
            if (current === imageArray.length - 1) {
              setCurrent(0);
            } else {
              setCurrent(current + 1);
            }
          }}
          className="z-30 cursor-pointer px-4"
        >
          Next
        </div>
      </div>
    </div>
  );
}

function Carousel2(children: React.ReactNode[], isInfinite: boolean) {
  const [current, setCurrent] = useState(0);
  const ref = useRef(null);

  const handleDragEnd = async (evt: any, { offset }: any) => {
    let temp = current;
    if (offset.x > 0) {
      if (temp > 0 && temp <= children.length - 1) {
        temp -= 1;
      } else if (isInfinite && temp === 0) {
        temp = children.length - 1;
      }
    } else if (offset.x < 0) {
      if (temp < children.length - 1 && temp >= 0) {
        temp += 1;
      } else if (isInfinite && temp === children.length - 1) {
        temp = 0;
      }
    }
    setCurrent(temp);
  };

  return (
    <div className="relative z-[1] mx-auto p-0 px-24 pb-5">
      <div className="relative z-[1] box-content flex size-full" ref={ref}>
        {children.map((item, idx, { length }) => (
          <motion.div
            className={`flex size-full shrink items-center justify-center ${
              current === idx ? 'relative' : 'absolute'
            } inset-0`}
            drag="x"
            dragConstraints={ref}
            dragDirectionLock
            onDragEnd={handleDragEnd}
            dragSnapToOrigin
            dragMomentum={false}
            variants={variants as Variants}
            animate={
              current === idx
                ? (variants.center as any)
                : idx === current + 1 || (isInfinite && current === length - 1 && idx === 0)
                  ? (variants.toRight as any)
                  : idx === current - 1 || (isInfinite && current === 0 && idx === length - 1)
                    ? (variants.toLeft as any)
                    : idx === current + 2
                      ? (variants.toRightHidden as any)
                      : idx === current - 2
                        ? (variants.toLeftHidden as any)
                        : (variants.hidden as any)
            }
            transition={{
              x: { type: 'spring', mass: 1, stiffness: 50, damping: 50 }
            }}
            dragElastic={0.5}
            key={idx}
          >
            {item}
          </motion.div>
        ))}
      </div>
    </div>
  );
}
/**
 * Renders a carousel of cards with draggable and snappable behavior.
 *
 * @param {React.ReactNode[]} children - An array of React elements representing the cards.
 * @param {boolean} isInfinite - A boolean indicating whether the carousel should loop infinitely.
 * @return {JSX.Element} The rendered carousel.
 */
function CardsCarousel(children: React.ReactNode[], isInfinite: boolean): JSX.Element {
  const [current, setCurrent] = useState<number>(0);
  const ref = useRef<HTMLDivElement>(null);

  /**
   * Handles the drag end event of the carousel.
   *
   * @param {React.DragEvent<HTMLDivElement>} evt - The drag end event.
   * @param {DraggableEventHandler<HTMLDivElement>} param1 - The drag event parameters.
   */
  const handleDragEnd = async (evt: any, { offset }: any): Promise<void> => {
    let temp = current;
    if (offset.x > 0) {
      if (temp > 0 && temp <= children.length - 1) {
        temp -= 1;
      } else if (isInfinite && temp === 0) {
        temp = children.length - 1;
      }
    } else if (offset.x < 0) {
      if (temp < children.length - 1 && temp >= 0) {
        temp += 1;
      } else if (isInfinite && temp === children.length - 1) {
        temp = 0;
      }
    }
    setCurrent(temp);
  };

  return (
    <div className="relative z-[1] mx-auto p-0">
      <div className="relative z-[1] box-content flex aspect-video h-40" ref={ref}>
        {children.map(
          (
            item: React.ReactNode,
            idx: number,
            {
              length
            }: {
              length: number;
            }
          ): JSX.Element => (
            <motion.div
              className={`flex size-full shrink items-center justify-start ${
                current === idx ? 'relative' : 'absolute'
              } inset-0`}
              drag="x"
              dragConstraints={ref}
              dragDirectionLock
              onDragEnd={handleDragEnd}
              dragSnapToOrigin
              dragMomentum={false}
              variants={cardsVariants}
              animate={
                current === idx
                  ? 'center'
                  : idx === current + 1 || (isInfinite && current === length - 1 && idx === 0)
                    ? 'toRight'
                    : idx === current - 1 || (isInfinite && current === 0 && idx === length - 1)
                      ? 'toLeft'
                      : idx === current + 2
                        ? 'toRightHidden'
                        : idx === current - 2
                          ? 'toLeftHidden'
                          : 'hidden'
              }
              transition={{
                x: { type: 'spring', mass: 1, stiffness: 50, damping: 50 }
              }}
              dragElastic={0.5}
              key={idx}
            >
              {item}
            </motion.div>
          )
        )}
      </div>
    </div>
  );
}
export default Carousel;
export { Carousel2, CardsCarousel };
