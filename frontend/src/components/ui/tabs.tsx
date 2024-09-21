'use client';

import { TabsProps } from '@/types/motions.type';
import { motion } from 'framer-motion';
import { usePathname, useRouter, useSearchParams } from 'next/navigation';
import { useCallback, useRef, useState } from 'react';

function Tabs(props: TabsProps) {
  const ref = useRef<HTMLDivElement>(null);
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const [activeTab, setActiveTab] = useState(() => {
    if (props.isBool) {
      for (const param of props.data) {
        if (searchParams.has(param.value)) {
          return param.value;
        }
      }
      if (props.includeAll) {
        return '';
      } else {
        return props.data[0].value;
      }
    } else {
      if (
        searchParams.has(`${props.filter}`) &&
        props.data?.filter((option) => option.value === searchParams.get(`${props.filter}`))
          .length > 0
      ) {
        return searchParams.get(`${props.filter}`);
      } else {
        if (props.includeAll) {
          return '';
        } else {
          return props.data[0].value;
        }
      }
    }
  });

  const createQueryString = useCallback(
    (name: string, value: { toString: () => string }) => {
      const params = new URLSearchParams(searchParams.toString());
      params.set(name, value.toString());
      setActiveTab(props.isBool ? name : value);
      if (props.isBool) {
        props.data.map((option) => {
          if (option.value !== name) {
            params.delete(option.value);
          }
        });
      }

      return params.toString();
    },
    [searchParams, props.data, props.isBool]
  );

  return (
    <motion.div
      className={`mx-auto flex w-fit  items-center justify-start overflow-hidden rounded-full py-1.5 shadow-inner ${
        props.mobileOnly && 'block xl:hidden'
      } ${props.desktopOnly && 'hidden xl:block'}`}
      ref={ref}
    >
      <motion.div
        className={`flex w-fit gap-2 px-4 md:gap-4 lg:gap-10`}
        drag="x"
        dragConstraints={ref}
      >
        {props.includeAll && props.data?.length > 1 && (
          <motion.div
            className="relative flex cursor-pointer flex-col items-center justify-center gap-1.5"
            onClick={() => {
              router.push(pathname);
              setActiveTab('');
            }}
          >
            <h3
              className={`relative z-[1] w-full px-4 py-2 ${
                activeTab === '' ? 'text-black' : 'text-grayAccent/80'
              } font-semibold uppercase transition-all duration-300 ease-in-out`}
            >
              All
            </h3>
            {activeTab === '' && (
              <motion.span
                layoutId="bubble"
                className="absolute inset-0 z-0 rounded-full bg-bgColor shadow-threeD"
                transition={{ type: 'spring', bounce: 0.2, duration: 0.6 }}
              />
            )}
          </motion.div>
        )}
        {props.data?.map((element: any, idx: any) => (
          <motion.div
            className="relative flex cursor-pointer flex-col items-center justify-center gap-1.5"
            onClick={() => {
              props.isBool
                ? router.push(pathname + '?' + createQueryString(element.value, true))
                : router.push(pathname + '?' + createQueryString(`${props.filter}`, element.value));
            }}
            key={idx}
          >
            <h3
              className={`relative z-[1] w-full px-4 py-2 ${
                // || (props.isBool && searchParams.has(element.value))
                activeTab === element.value ? 'text-black' : 'text-grayAccent/80'
              } whitespace-nowrap text-sm font-semibold uppercase transition-all duration-300 ease-in-out`}
            >
              {element.title}
            </h3>
            {activeTab === element.value && (
              <motion.span
                layoutId="bubble"
                className="absolute inset-0 z-0 rounded-full bg-bgColor shadow-threeD"
                transition={{ type: 'spring', bounce: 0.2, duration: 0.6 }}
              />
            )}
            {/* {!props.isShadowed && (
              <div
                className={`transition-all duration-300 ease-in-out ${
                  activeTab === element.value ? 'w-4' : 'w-0'
                } h-0.5 bg-black`}
              />
            )}{' '} */}
          </motion.div>
        ))}
      </motion.div>
    </motion.div>
  );
}

export default Tabs;
