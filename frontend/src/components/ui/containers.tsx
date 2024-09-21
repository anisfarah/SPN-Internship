'use client';

import { ChildrenProps } from '@/types/children.type';
import {
  DraggableAccordionContainerProps,
  DropdownContainerProps,
  EditOverlayContainerProps,
  FiltersOverlayContainerProps,
  IAccordionContainerProps,
  IContainerGeneralProps,
  IContainerProps,
  ImageContainerProps,
  LoginContainerProps,
  NotificationContainerProps,
  OverlayContainerProps,
  TabsContainerProps,
  ViewImageOverlayContainerProps
} from '@/types/containers.type';
import { useSortable } from '@dnd-kit/sortable';
import { CSS } from '@dnd-kit/utilities';
import { motion } from 'framer-motion';
import { PlaceholderValue } from 'next/dist/shared/lib/get-img-props';
import Image from 'next/image';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { forwardRef, HTMLAttributes, useEffect, useRef, useState } from 'react';

import cn from '../../utils/tailwindClassNameMerge';
import ArrowIcon from '../icons/arrowIcons';
import ChevronIcon from '../icons/chevronIcon';
import { MinusIcon, PlusIcon } from '../icons/mainIcons';
import ProfileIcon from '../icons/profileIcon';
import ResetIcon from '../icons/resetIcon';
import VideoIcon from '../icons/videoIcon';
import XIcon from '../icons/xIcon';
import XMarkIcon from '../icons/xMarkIcon';
import Button, { NavbarButton, RoundedButton } from './buttons';
import { Label, Subtitle } from './texts';

function Container(containerInputs: IContainerProps) {
  return (
    // <div
    //   className={`relative bg-redAccent ${
    //     containerInputs.mobileHeight ? 'h-[60vh]' : 'h-full'
    //   } w-full p-5  ${containerInputs.minSpace ? 'lg:px-6' : 'lg:px-14'} ${
    //     containerInputs.numberHeaders === 1
    //       ? 'lg:h-[calc(90svh-176px)] '
    //       : containerInputs.numberHeaders === 2
    //         ? 'lg:h-[calc(100svh-256px)]'
    //         : containerInputs.numberHeaders === 3
    //           ? 'lg:h-[calc(100svh-336px)]'
    //           : 'lg:h-[calc(100svh-96px)]'
    //   } mb-20 lg:mb-0`}
    // >
    <section
      className={cn(
        `relative mb-28 flex size-full flex-1 basis-full ${containerInputs.desktopOnly ? 'p-2 md:py-8 md:pl-14 md:pr-10' : 'py-8 md:pl-14 md:pr-10'} bg-bgColor lg:mb-0`,
        containerInputs.className
      )}
    >
      <div
        ref={containerInputs.ref}
        className={`relative size-full min-h-[60vh] overflow-hidden rounded-3xl ${containerInputs.desktopOnly ? 'shadow-none md:shadow-outer' : 'shadow-outer'}`}
      >
        <div className="size-full overflow-auto [&::-webkit-scrollbar-thumb]:rounded-full [&::-webkit-scrollbar-thumb]:bg-grayAccent [&::-webkit-scrollbar-track]:rounded-full [&::-webkit-scrollbar-track]:shadow-[inset_0_0_2px_rgba(0,0,0,0.3)] [&::-webkit-scrollbar]:w-[0.33rem]">
          {containerInputs.children}
        </div>
      </div>
    </section>
  );
}
function MobileContainer(prop: ChildrenProps) {
  return <div className="block w-full px-4 sm:px-10 lg:hidden">{prop.children}</div>;
}
function DesktopContainer(prop: ChildrenProps) {
  return (
    <div className="hidden size-full overflow-hidden lg:flex lg:flex-col">{prop.children}</div>
  );
}
interface StepsContainerProps extends ChildrenProps {
  stepContainerFitWidth?: boolean;
}
function StepsContainer(prop: StepsContainerProps) {
  const ref = useRef<HTMLDivElement>(null);

  return (
    <div
      ref={ref}
      className={`relative z-10 flex h-full ${prop.stepContainerFitWidth ? 'mx-auto max-w-fit' : 'max-w-full'} items-start justify-start gap-6 overflow-hidden py-2 font-text`}
    >
      <motion.div className="flex w-fit grow px-6" drag="x" dragConstraints={ref}>
        {prop.children}
      </motion.div>
    </div>
  );
}
function LoginContainer(props: LoginContainerProps) {
  return (
    <div className="size-full lg:flex lg:overflow-hidden">
      <div className="fixed left-0 top-0 hidden h-[45vh] w-full lg:relative lg:block lg:h-screen lg:w-1/2">
        <Image
          className="self-center object-cover object-left-bottom lg:rounded-r-[2.5rem]"
          alt={props.image.alt}
          fill
          src={props.image.src}
          blurDataURL="data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD/4gHYSUNDX1BST0ZJTEUAAQEAAAHIAAAAAAQwAABtbnRyUkdCIFhZWiAH4AABAAEAAAAAAABhY3NwAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAQAA9tYAAQAAAADTLQAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAlkZXNjAAAA8AAAACRyWFlaAAABFAAAABRnWFlaAAABKAAAABRiWFlaAAABPAAAABR3dHB0AAABUAAAABRyVFJDAAABZAAAAChnVFJDAAABZAAAAChiVFJDAAABZAAAAChjcHJ0AAABjAAAADxtbHVjAAAAAAAAAAEAAAAMZW5VUwAAAAgAAAAcAHMAUgBHAEJYWVogAAAAAAAAb6IAADj1AAADkFhZWiAAAAAAAABimQAAt4UAABjaWFlaIAAAAAAAACSgAAAPhAAAts9YWVogAAAAAAAA9tYAAQAAAADTLXBhcmEAAAAAAAQAAAACZmYAAPKnAAANWQAAE9AAAApbAAAAAAAAAABtbHVjAAAAAAAAAAEAAAAMZW5VUwAAACAAAAAcAEcAbwBvAGcAbABlACAASQBuAGMALgAgADIAMAAxADb/2wBDAAEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQH/2wBDAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQH/wAARCAAQABADAREAAhEBAxEB/8QAFQABAQAAAAAAAAAAAAAAAAAAAAr/xAAUEAEAAAAAAAAAAAAAAAAAAAAA/8QAFAEBAAAAAAAAAAAAAAAAAAAAAP/EABQRAQAAAAAAAAAAAAAAAAAAAAD/2gAMAwEAAhEDEQA/ALcAAAAf/9k="
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 70vw, 50vw"
          placeholder="blur"
        />
      </div>
      <div className="fixed bottom-0 left-0 z-10 flex h-screen w-full flex-col rounded-t-[3rem] bg-bgColor py-10 pb-2 lg:static lg:w-1/2 lg:rounded-none">
        {props.children}
      </div>
    </div>
  );
}
function OverlayContainer(props: OverlayContainerProps) {
  const router = useRouter();
  const profileOverlayRef = useRef<HTMLDivElement>(null);
  const profileOverlayButtonRef = useRef<HTMLDivElement>(null);
  const [profileOverlayIsOpen, setProfileOverlayIsOpen] = useState(false);

  useEffect(() => {
    const checkIfClickedOutside = (e: any) => {
      // If the menu is open and the clicked target is not within the menu,
      // then close the menu
      if (
        profileOverlayIsOpen &&
        profileOverlayRef.current! &&
        !profileOverlayRef.current.contains(e.target) &&
        !profileOverlayButtonRef.current?.contains(e.target)
      ) {
        setProfileOverlayIsOpen(false);
      }
    };

    document.addEventListener('mousedown', checkIfClickedOutside);

    return () => {
      // Cleanup the event listener
      document.removeEventListener('mousedown', checkIfClickedOutside);
    };
  }, [profileOverlayIsOpen, setProfileOverlayIsOpen]);

  return (
    <div
      ref={props.overlayRef}
      className={`fixed size-full min-h-screen overflow-auto bg-bgColor lg:w-80 ${
        props.fromRight ? 'right-0 translate-x-0' : 'left-0'
      } top-0 z-50 transition-all duration-700 ease-in-out ${
        props.isOpen ? 'translate-x-0' : props.fromRight ? 'translate-x-full' : '-translate-x-full'
      } ${props.mobileOnly && 'lg:hidden'}`}
    >
      <div className="sticky left-0 top-0 z-10 flex w-full items-center justify-between bg-bgColor px-10 py-4">
        <NavbarButton
          onClick={() => props.setIsOpen(false)}
          label={<XIcon className="size-3 fill-black" />}
        />

        <Link href="/">
          <div
            className="relative h-8 w-14 cursor-pointer lg:h-14 lg:w-full lg:-translate-x-3"
            onClick={() => props.setIsOpen(!props.isOpen)}
          >
            <Image
              src="/images/logonly.svg"
              alt="SPN logo"
              fill={true}
              // fill="static"
              className="object-contain"
            />
          </div>
        </Link>
        <NavbarButton
          buttonRef={profileOverlayButtonRef}
          onClick={() => setProfileOverlayIsOpen(!profileOverlayIsOpen)}
          label={
            <div className="relative flex size-8 items-center justify-center rounded-full bg-primary">
              {props.user?.firstname && props.user?.lastname ? (
                <span className="text-[12px] uppercase text-white">
                  {`${props.user?.firstname[0]}${props.user?.lastname[0]}`}
                </span>
              ) : (
                <ProfileIcon className="size-[1.15rem] fill-white" />
              )}
            </div>
          }
        />
        {profileOverlayIsOpen && (
          <div
            ref={profileOverlayRef}
            className="absolute right-6 top-16 z-30 h-fit max-h-[50vh] w-80 rounded-xl bg-bgColor px-4 shadow-[12px_12px_25px_0px_rgba(174,176,214,.5),-10px_-10px_20px_0px_rgba(255,255,255,1)] before:absolute before:-top-2 before:right-7 before:block before:size-0 before:rotate-[135deg] before:border-8 before:border-b-bgColor before:border-l-bgColor before:border-r-transparent before:border-t-transparent before:shadow-2xl before:content-['']"
          >
            <div className="relative w-full px-8">
              <div className="flex size-full flex-col gap-4 overflow-auto py-4">
                <div className="flex w-full flex-col gap-2 pb-4">
                  <span>Welcome {props.user?.firstname}!</span>
                  <div className="h-px w-full bg-toggleAccent/40" />
                </div>
                <span
                  onClick={() => {
                    router.push('/profile');
                    setProfileOverlayIsOpen(false);
                    props.setIsOpen(false);
                  }}
                  className="w-fit cursor-pointer text-textColor hover:font-medium"
                >
                  Profile
                </span>
                <span
                  onClick={async () => {
                    // await Logout();
                    router.push('/auth/login');
                  }}
                  className="w-fit cursor-pointer text-textColor hover:font-medium hover:text-red"
                >
                  Logout
                </span>
              </div>
            </div>
          </div>
        )}
      </div>
      <div className="flex w-full items-center justify-center">{props.children}</div>
    </div>
  );
}

function AccordionContainer(props: IAccordionContainerProps) {
  return (
    <div
      className={cn(
        `size-full ${props.inputContainer && 'rounded-[2rem] shadow-inner'} ${props.invalid ? 'border border-red' : 'border-b'} px-6 py-2 font-text transition-all ${
          props.isShadow && 'rounded-[2rem] bg-bgColor shadow-inner'
        }`,
        props.className
      )}
    >
      <div
        onClick={() => props.setIsOpen(!props.isOpen)}
        className={`flex h-10 w-full cursor-pointer items-center justify-between`}
      >
        {typeof props.title === 'string' ? (
          <h3 className={`text-base font-normal uppercase ${props.isSelected && 'font-semibold'}`}>
            {props.title}
            <span className="px-1 text-xs">
              {props.isSelected && !props.isShadow ? props.selectionNumber : null}
            </span>
          </h3>
        ) : (
          props.title
        )}
        <div className="relative flex items-center justify-center gap-5">
          {props.icon ? (
            props.icon
          ) : props.isOpen ? (
            <MinusIcon className="flex size-3 shrink-0 grow-0 fill-black" />
          ) : (
            <PlusIcon className="flex size-3 shrink-0 grow-0 fill-black" />
          )}
        </div>
      </div>
      <div
        className={`overflow-hidden duration-[450ms] ease-in-out ${
          props.isOpen ? 'max-h-screen py-3' : 'max-h-0'
        }`}
      >
        {props.children}

        {props.withButton && (
          <div className="flex w-full justify-end px-2 py-6 duration-300 ease-in-out">
            <Button
              onClick={props.handleButtonClick}
              className="w-1/3"
              type="button"
              label={props.buttonLabel}
            />
          </div>
        )}
      </div>
    </div>
  );
}

function DraggableAccordionContainer(props: DraggableAccordionContainerProps) {
  // const { attributes, listeners, setNodeRef, transform, transition } = useSortable({
  const { attributes, listeners, setNodeRef, transform } = useSortable({
    id: props.id
  });

  const style = {
    transform: CSS.Transform.toString(transform)
    // transition,
  };

  return (
    <div ref={setNodeRef} style={style}>
      <div
        className={`size-full border-b px-4 py-2 font-text transition-all ${
          props.isShadow && 'rounded-3xl bg-bgColor shadow-inner'
        }`}
      >
        <div
          onClick={() => props.setIsOpen(!props.isOpen)}
          className={`flex h-10 w-full cursor-pointer items-center justify-between`}
        >
          <h3 className={`text-base font-normal uppercase ${props.isSelected && 'font-semibold'}`}>
            {props.title}
            <span className="px-1 text-xs">
              {props.isSelected && !props.isShadow ? props.selectionNumber : null}
            </span>
          </h3>
          <div className="relative flex items-center justify-center gap-5">
            <div
              {...attributes}
              {...listeners}
              className="relative h-11 w-8 rounded-sm hover:bg-greyAccent/30"
            >
              <Image
                src={'/images/drag.png'}
                alt="Drag icon"
                fill
                className="object-contain object-center p-1.5"
              />
            </div>
            <svg
              className={`size-6 p-1 ${
                props.isOpen ? 'rotate-180' : 'rotate-0'
              } duration-300 ease-in-out`}
              stroke="currentColor"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth="1"
            >
              <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 8.25l-7.5 7.5-7.5-7.5" />
            </svg>
          </div>
        </div>
        <div
          className={`overflow-hidden duration-[450ms] ease-in-out ${
            props.isOpen ? 'max-h-screen py-3' : 'max-h-0'
          }`}
        >
          {props.children}
        </div>
      </div>
    </div>
  );
}

function FiltersOverlayContainer(props: FiltersOverlayContainerProps) {
  const ref = useRef<HTMLDivElement>(null);
  useEffect(() => {
    const checkIfClickedOutside = (e: any) => {
      // If the menu is open and the clicked target is not within the menu,
      // then close the menu
      if (props.isOpen && ref.current && !ref.current.contains(e.target)) {
        props.setIsOpen(false);
      }
    };

    document.addEventListener('mousedown', checkIfClickedOutside);

    return () => {
      // Cleanup the event listener
      document.removeEventListener('mousedown', checkIfClickedOutside);
    };
  }, [props.isOpen]);

  return (
    <>
      <div
        ref={ref}
        className={`fixed right-0 top-0 z-50 flex size-full items-start bg-bgColor text-black transition-all duration-500 ease-in-out ${
          props.mobileOnly ? 'lg:hidden' : 'lg:w-[40rem] lg:pt-10 2xl:w-[50rem]'
        } p-4 ${props.isOpen ? 'translate-x-0' : 'translate-x-full'}`}
      >
        <div className={`flex size-full flex-col`}>
          <div
            className={`relative ${
              !props.mobileOnly && 'lg:hidden'
            } flex w-full items-center justify-between`}
          >
            <RoundedButton
              onClick={() => props.setIsOpen(false)}
              label={<XMarkIcon className="size-3 fill-black" />}
            />
            <Link href="/">
              <div className="relative z-30 h-10 w-14 cursor-pointer">
                <Image alt="logo" fill src="/images/logonly.svg" className="object-contain" />
              </div>
            </Link>
            <RoundedButton
              onClick={() => props.handleReset()}
              label={<ResetIcon className="size-5 fill-black" />}
            />
          </div>
          <div className="flex size-full flex-col items-center justify-around">
            <div className="h-[70vh] w-full overflow-auto">
              <div className="mx-auto w-full max-w-3xl px-2 pt-10">{props.children}</div>
            </div>
            <div className="h-[10vh] w-full">
              <div
                className={`flex w-full items-center justify-center ${
                  !props.mobileOnly && 'mx-auto max-w-2xl lg:justify-between'
                }`}
              >
                <div
                  className="hidden cursor-pointer text-grayAccent lg:block"
                  onClick={() => props.handleReset()}
                >
                  Clear
                </div>

                <div className="w-52">
                  <Button
                    type="submit"
                    withArrow
                    onClick={() => props.setIsOpen(false)}
                    label="Update"
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      {!props.mobileOnly && props.isOpen && (
        <div className="fixed left-0 top-0 z-[49] size-full bg-black/50" />
      )}
    </>
  );
}

function EditOverlayContainer(props: EditOverlayContainerProps) {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const checkIfClickedOutside = (e: any) => {
      // If the menu is open and the clicked target is not within the menu,
      // then close the menu
      if (props.isOpen && ref.current && !ref.current.contains(e.target)) {
        props.setIsOpen(false);
        props.onClose && props.onClose();
      }
    };

    document.addEventListener('mousedown', checkIfClickedOutside);

    return () => {
      // Cleanup the event listener
      document.removeEventListener('mousedown', checkIfClickedOutside);
    };
  }, [props.setIsOpen, props.isOpen]);

  return (
    <div
      className={`fixed left-0 top-0 z-[49] flex size-full items-center justify-center transition-all duration-200 ${
        props.isOpen ? 'visible bg-black/50' : 'invisible bg-black/0'
      } `}
    >
      <div
        ref={ref}
        className={`z-50 mx-5 flex max-h-[85vh] w-full max-w-3xl flex-col items-center justify-center rounded-3xl bg-bgColor text-black sm:mx-10 ${
          props.mobileOnly ? 'lg:hidden' : 'lg:pt-10'
        } p-4 lg:p-10 ${props.isOpen ? 'opacity-100' : 'opacity-0'}`}
      >
        <div
          className={cn(
            props.className,
            'flex w-full flex-col items-start justify-start gap-2 overflow-hidden'
          )}
        >
          <div className="flex w-full items-center justify-between px-10 py-4">
            <div
              onClick={() => {
                props.setIsOpen(false);
                props.onClose && props.onClose();
              }}
              className="cursor-pointer"
            >
              <ArrowIcon className="size-4 fill-black" />
            </div>
            <div>
              <Subtitle>{props.title}</Subtitle>
            </div>
            <div />
          </div>
          <div className="size-full max-h-[70vh] overflow-auto">
            <div className="mx-auto w-full p-2">{props.children}</div>
          </div>
        </div>

        {props.archive ? (
          <div className="w-full py-10">
            <div className="flex items-center justify-center gap-12">
              <div className="w-32">
                <Button type="button" onClick={props.confirm} label="Yes" />
              </div>
              <div className="w-32">
                <Button
                  type="button"
                  onClick={() => {
                    props.setIsOpen(false);
                    props.onClose && props.onClose();
                  }}
                  label="No"
                />
              </div>
            </div>
          </div>
        ) : (
          props.withButton && (
            <div className="w-full py-10">
              <div className="mx-auto flex w-full max-w-2xl items-center justify-center">
                <div className="w-52">
                  <Button
                    type={props.type}
                    withArrow
                    onClick={(e: any) => {
                      if (props.handleSubmit) {
                        if (props.closeManually) props.handleSubmit(e);
                        else {
                          props.handleSubmit(e);
                          props.setIsOpen(false);
                          props.onClose && props.onClose();
                        }
                      }
                    }}
                    label={props.label}
                  />
                </div>
              </div>
            </div>
          )
        )}
      </div>
    </div>
  );
}
function CreateOverlayContainer(props: EditOverlayContainerProps) {
  const ref = useRef<HTMLDivElement>(null);
  useEffect(() => {
    const checkIfClickedOutside = (e: any) => {
      // If the menu is open and the clicked target is not within the menu,
      // then close the menu
      if (props.isOpen && ref.current && !ref.current.contains(e.target)) {
        props.setIsOpen(false);
      }
    };

    document.addEventListener('mousedown', checkIfClickedOutside);

    return () => {
      // Cleanup the event listener
      document.removeEventListener('mousedown', checkIfClickedOutside);
    };
  }, [props.isOpen]);

  return (
    <div
      className={`fixed left-0 top-0 z-[49] flex size-full items-center justify-center transition-all duration-200 ${
        props.isOpen ? 'visible bg-black/50' : 'invisible bg-black/0'
      } `}
    >
      <div
        ref={ref}
        className={`z-50 mx-5 flex h-fit max-h-screen w-full max-w-2xl items-center justify-center rounded-3xl bg-bgColor text-black transition-all duration-100 sm:mx-10 ${
          props.mobileOnly ? 'lg:hidden' : 'lg:pt-10'
        } p-4 ${props.isOpen ? 'opacity-100' : 'opacity-0'}`}
      >
        <div className="flex size-full flex-col items-center">
          <div className="flex size-full max-w-3xl flex-col items-center justify-around">
            <div className="relative flex w-full items-center justify-between px-10 py-4">
              <div onClick={() => props.setIsOpen(false)} className="cursor-pointer">
                <ArrowIcon className="size-4 fill-black" />
              </div>
              <div>
                <Subtitle>{props.title}</Subtitle>
              </div>
              <div />
            </div>
            <div className="max-h-[70vh] w-full overflow-auto">
              <div className="mx-auto w-full px-0">{props.children}</div>
            </div>
            {props.withButton && (
              <div className="w-full py-10">
                <div className="mx-auto flex w-full max-w-2xl items-center justify-center">
                  <div className="w-52">
                    <Button
                      type="submit"
                      withArrow
                      onClick={(e: any) => {
                        if (props.handleSubmit) {
                          props.handleSubmit(e);
                        }
                        props.setIsOpen(false);
                      }}
                      label="Add"
                    />
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

function ViewImageOverlayContainer(props: ViewImageOverlayContainerProps) {
  const ref = useRef<HTMLDivElement>(null);
  useEffect(() => {
    const checkIfClickedOutside = (e: any) => {
      // If the menu is open and the clicked target is not within the menu,
      // then close the menu
      if (props.isOpen && ref.current && !ref.current.contains(e.target)) {
        props.setIsOpen(false);
      }
    };

    document.addEventListener('mousedown', checkIfClickedOutside);

    return () => {
      // Cleanup the event listener
      document.removeEventListener('mousedown', checkIfClickedOutside);
    };
  }, [props.isOpen]);

  return (
    <div
      className={`fixed left-0 top-0 z-[49] flex size-full items-center justify-center duration-300 ${
        props.isOpen ? 'visible bg-black/80' : 'invisible bg-black/0'
      } `}
    >
      <div onClick={() => props.setIsOpen(false)}>
        <XIcon className="absolute left-5 top-5 size-7 cursor-pointer fill-white" />
      </div>
      <div
        ref={ref}
        className={`${props.isOpen ? 'opacity-100' : 'opacity-0'} relative flex aspect-video h-full max-h-[50vh] max-w-[90vw] flex-col items-center duration-300 ease-in-out`}
      >
        <Image
          src={
            props.image instanceof File
              ? URL.createObjectURL(props.image)
              : props.image instanceof Object
                ? props.image.url
                : props.image
          }
          alt={props.image?.alt ? props.image.alt : ''}
          fill
          placeholder={props.image.blur as PlaceholderValue}
          className="rounded-2xl object-contain"
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 70vw, 70vw"
        />
      </div>
    </div>
  );
}
function DropdownContainer(props: DropdownContainerProps) {
  const [clicked, setClicked] = useState(props.clicked);

  return (
    <div
      className={`relative flex w-full flex-col items-center justify-between gap-3 overflow-hidden rounded-3xl bg-bgColor shadow-inner ${clicked ? 'h-96' : 'h-12'} duration-500 ease-in-out`}
    >
      <div
        onClick={() => setClicked(!clicked)}
        className="relative ml-2 flex w-full shrink-0 grow-0 basis-12 cursor-pointer items-center justify-between px-5"
      >
        <span className="font-raleway text-[15px] font-normal uppercase text-black">
          {props.title}
        </span>
        <RoundedButton
          className="mr-3 size-8"
          label={
            <ChevronIcon
              className={`size-3 fill-black ${!clicked ? 'rotate-90' : '-rotate-90'} duration-300 ease-in-out`}
            />
          }
        />
      </div>
      <div
        className={`relative flex w-full flex-auto flex-col gap-6 ${props.loading ? 'overflow-hidden' : 'overflow-auto'} `}
      >
        {props.children}
      </div>
    </div>
  );
}
function CardsContainer(prop: ChildrenProps) {
  return (
    <div className="relative flex size-full flex-1 flex-col overflow-auto px-4 py-5 pt-10 md:py-10 lg:px-14">
      {prop.children}
    </div>
  );
}
function TabsContainer(props: TabsContainerProps) {
  return (
    <div
      className={`relative ${props.fullWidth ? 'max-w-none' : 'max-w-full'} mx-auto ${
        props.mobileOnly && 'block xl:hidden'
      } ${
        props.desktopOnly && 'hidden xl:block'
      } flex h-20 w-full items-center justify-center gap-6 p-4 font-text`}
    >
      {props.children}
    </div>
  );
}
function FiltersContainer(prop: ChildrenProps) {
  return (
    <div className="relative hidden h-20 w-full items-center justify-center gap-6 p-4 px-8 lg:flex">
      {prop.children}
    </div>
  );
}
function SearchBarContainer(props: ChildrenProps) {
  return (
    <div
      className={cn(
        'relative hidden h-20 w-full items-center justify-between bg-bgColor px-8 lg:top-0 lg:flex',
        props.className
      )}
    >
      {props.children}
    </div>
  );
}
function ImageContainer(props: ImageContainerProps) {
  // const [isOpen, setIsOpen] = useState(false);

  return (
    <div
      className={`pointer-events-none relative flex aspect-[1.2] size-full select-none items-center justify-center rounded-2xl outline-none focus:outline-none sm:aspect-video`}
    >
      <Image
        src={props.image instanceof Object ? props.image.url : props.image}
        alt={props.image?.alt ? props.image.alt : ''}
        fill
        className="rounded-2xl object-cover"
        sizes="(max-width: 768px) 80vw, (max-width: 1200px) 50vw, 20vw"
      />
      {/* {!props.hideDelete && (
        <div
          className="absolute -left-2 -top-2 flex aspect-square size-5 cursor-pointer items-center justify-center rounded-full bg-bgColor shadow-[0.8px_3px_3px_0px_rgba(174,176,214,.4),-3px_-3px_3px_0px_rgba(255,255,255,.9)]"
          onClick={() => {
            props.setImageArray && props.imageArray
              ? props.setImageArray(arrayRemove(props.imageArray, props.image))
              : {};
          }}
        >
          <XIcon className="size-2 fill-black" />
        </div>
      )} */}
    </div>
  );
}

type ItemProps = HTMLAttributes<HTMLDivElement> & {
  id: string;
};
export const DraggableImage = forwardRef<HTMLDivElement, ItemProps>(
  ({ style, children, ...props }, ref) => {
    const inlineStyles = {
      transformOrigin: '0 0',
      ...style
    };

    return (
      <div ref={ref} style={inlineStyles} {...props}>
        {children}
      </div>
    );
  }
);

DraggableImage.displayName = 'DraggableImage';

function NotificationContainer(props: NotificationContainerProps) {
  return (
    <div className="py-5">
      <div
        className={`flex w-full items-start gap-6 rounded-xl bg-bgColor p-4 ${
          !props.seen && 'shadow-outer'
        }`}
      >
        <div className="flex aspect-square size-10 items-center justify-center rounded-full">
          <span className="text-xs uppercase text-black">{props.userInitials}</span>
        </div>
        <div className="flex flex-col items-start justify-start gap-3 text-left">
          <p className="text-sm font-light">{props.text}</p>
          <p className="text-sm font-light">{`${props.time} ago`}</p>
        </div>
      </div>
    </div>
  );
}
function GridContainer({ index, data }: { index: number; data: any[] }) {
  return (
    <div className="my-2 grid size-full grid-cols-1 gap-4 px-4 lg:grid-cols-4">
      {data.map((el, idx) => (
        <div key={idx} className="size-full flex-col lg:flex">
          <div className="size-full flex-col">
            <div className={`w-full pb-6`}>
              <Label>{`${index + 1}.${idx + 1} ${el.title}`}</Label>
            </div>
            <Link href={el.video_link} target="_blank">
              <div className={`group relative aspect-video w-full`}>
                <div className="absolute left-0 top-0 z-10 flex size-full items-center justify-center rounded-2xl bg-black/60 opacity-100 ease-in-out">
                  <VideoIcon className="size-10 fill-white" />
                </div>
                <ImageContainer hideDelete image={el.image} />
              </div>
            </Link>
            <div className={`size-full`}>
              <p className="overflow-hidden text-ellipsis pt-6 text-justify font-text text-sm">
                {`${el.description}`}
              </p>
            </div>
          </div>
          <div
            className={` ${
              (idx + 1) % 4 !== 0 && 'gap-4 bg-grayAccent'
            } relative mt-2 h-0.5 w-full gap-4 opacity-50 lg:float-right lg:ml-4 lg:inline-block lg:h-full lg:w-0.5 dark:opacity-50`}
          />
        </div>
      ))}
    </div>
  );
}
function SearchOverlayContainer(props: IContainerGeneralProps) {
  return (
    <div
      className={`fixed right-0 top-0 z-50 flex size-full items-start bg-bgColor p-4 text-black transition-all duration-500 ease-in-out lg:hidden ${
        props.isOpen ? 'translate-x-0' : 'translate-x-full'
      }`}
    >
      <div className="flex size-full flex-col items-center justify-between">
        <div className="relative flex w-full justify-center">
          <Link href="/">
            <div className="relative z-30 h-10 w-14 cursor-pointer">
              <Image alt="logo" fill src="/images/logonly.svg" className="object-contain" />
            </div>
          </Link>
          <div className="absolute left-0 top-0 z-30 cursor-pointer rounded-full">
            <RoundedButton
              onClick={() => props.setIsOpen(false)}
              label={<XMarkIcon className="size-3 fill-black" />}
            />
          </div>
        </div>
        <div className="flex size-full flex-col items-center justify-around">
          <div className="mt-10 h-[50vh] w-full">
            <div className="mx-auto w-full max-w-lg px-4">{props.children}</div>
          </div>
          <div className="h-[25vh] w-full">
            <div className="flex w-full items-center justify-center">
              <div className="w-52">
                <Button
                  type="submit"
                  withArrow
                  onClick={() => props.setIsOpen(false)}
                  label="Search"
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

function PaginationContainer(props: ChildrenProps) {
  return <div className="relative h-fit w-full px-6 py-2">{props.children}</div>;
}
export {
  AccordionContainer,
  CardsContainer,
  CreateOverlayContainer,
  DesktopContainer,
  DraggableAccordionContainer,
  DropdownContainer,
  EditOverlayContainer,
  FiltersContainer,
  FiltersOverlayContainer,
  GridContainer,
  ImageContainer,
  LoginContainer,
  MobileContainer,
  NotificationContainer,
  OverlayContainer,
  PaginationContainer,
  SearchBarContainer,
  SearchOverlayContainer,
  StepsContainer,
  ViewImageOverlayContainer,
  TabsContainer
};
export default Container;
