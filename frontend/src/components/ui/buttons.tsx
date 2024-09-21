'use client';
import { IBarButton, IButton, NavbarButtonProps } from '@/types/buttons.type';
import Link from 'next/link';
import { useFormStatus } from 'react-dom';

import cn from '../../utils/tailwindClassNameMerge';
import { LongArrowIcon } from '../icons/arrowIcons';

function Button(props: IButton) {
  //TODO: Remove key 'Enter when pointer events = none'
  const { pending } = useFormStatus();

  return (
    <button
      tabIndex={props.tabIndex}
      className={cn(
        `group flex w-full justify-center whitespace-nowrap rounded-full px-3 py-3 shadow-outer outline-none ${
          props.disabled || pending
            ? 'cursor-not-allowed bg-gray-200 text-gray-400'
            : 'cursor-pointer bg-bgColor text-textColor'
        }`,
        props.className
      )}
      type={props.type}
      disabled={props.disabled}
      onClick={props.onClick}
    >
      {props.withArrow && props.rightDirection ? (
        <>
          <LongArrowIcon className="mr-8 aspect-square h-6 w-8 rotate-180 stroke-black duration-200 group-hover:mr-0 group-hover:w-0 group-hover:-translate-x-10 group-hover:stroke-primary" />
          <span className="font-text text-sm md:text-base">{props.label}</span>
        </>
      ) : props.withArrow && !pending ? (
        <>
          <span className="group font-text text-sm group-hover:text-primary md:text-base">
            {props.label}
          </span>
          <LongArrowIcon className="ml-8 aspect-square h-6 w-8 stroke-black duration-200 group-hover:ml-0 group-hover:w-0 group-hover:translate-x-10 group-hover:stroke-primary" />
        </>
      ) : pending ? (
        <>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            width="24"
            height="24"
            className="mx-1 animate-spin fill-black"
          >
            <path fill="none" d="M0 0h24v24H0z" />
            <path d="M18.364 5.636L16.95 7.05A7 7 0 1 0 19 12h2a9 9 0 1 1-2.636-6.364z" />
          </svg>
          <span className="font-text text-sm md:text-base">Submitting ...</span>
        </>
      ) : (
        <span className="font-text text-sm md:text-base">{props.label}</span>
      )}
    </button>
  );
}

function RoundedButton(props: IButton) {
  return (
    <button
      className={cn(
        `group flex size-10 items-center justify-center rounded-full text-2xl outline-none ${
          props.disabled
            ? 'cursor-not-allowed bg-gray-200 fill-gray-400'
            : 'cursor-pointer fill-black'
        } font-text shadow-outerSmall duration-300 ease-in-out hover:scale-110 hover:fill-primary hover:text-primary`,
        props.className
      )}
      type={props.type || 'button'}
      onClick={props.onClick}
      disabled={props.disabled || false}
    >
      {props.label}
    </button>
  );
}
function NavbarButton(props: NavbarButtonProps) {
  return (
    <div className="relative flex flex-col items-center justify-center" ref={props.buttonRef}>
      <button
        className={`group relative flex size-12 items-center justify-center rounded-full shadow-threeD active:shadow-threeDActive`}
        type={props.type || 'button'}
        onClick={props.onClick}
      >
        {props.label}
      </button>
    </div>
  );
}

function SidebarButton(props: IBarButton) {
  return (
    <Link href={props.href}>
      <button
        type="button"
        className={`group grow items-center justify-start overflow-hidden duration-200 ${
          props.isHidden ? 'w-14' : 'w-56'
        } flex rounded-full p-3.5 ${props.isActive ? 'text-textColor shadow-outerSmall' : 'text-black/50'} whitespace-nowrap`}
        onClick={props.onClick}
      >
        <div className="relative flex items-center justify-start gap-6">
          <props.Icon className={`size-7 ${props.isActive ? 'fill-black' : 'fill-black/50'} `} />
          {!props.isHidden && (
            <span className="truncate whitespace-nowrap font-text text-base font-normal capitalize">
              {props.label}
            </span>
          )}
        </div>
      </button>
    </Link>
  );
}
export { RoundedButton, NavbarButton, SidebarButton };
export default Button;
