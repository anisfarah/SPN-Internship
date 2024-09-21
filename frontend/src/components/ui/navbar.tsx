'use client';
import menuItemsData from '@/data/sidebarMenu.json';
import { NavBarProps } from '@/types/navBar.type';
import { motion } from 'framer-motion';
import Image from 'next/image';
import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';
import { useEffect, useMemo, useRef, useState } from 'react';

import { isEmpty } from '../../utils/inputHelpers';
import * as IconData from '../icons/menuIcons';
import {
  CalendarIcon,
  NotificationIcon,
  MenuIcon,
  MenuArrowIcon,
  MessageIcon
} from '../icons/navbarIcons';
import ProfileIcon from '../icons/profileIcon';
import Breadcrumb from './breadcrumb';
import { NavbarButton, SidebarButton } from './buttons';
import { NotificationContainer, OverlayContainer } from './containers';

function Navbar(props: NavBarProps) {
  const ref = useRef<HTMLDivElement>(null);
  const profileRef = useRef<HTMLDivElement>(null);
  const profileButtonRef = useRef<HTMLDivElement>(null);
  const notificationsRef = useRef<HTMLDivElement>(null);
  const notificationsButtonRef = useRef<HTMLDivElement>(null);
  const notificationsOverlayRef = useRef<HTMLDivElement>(null);
  const router = useRouter();
  const pathname = usePathname();
  const [path, setPath] = useState('homepage');
  const menuItems: { [key: string]: any } = menuItemsData;
  const Icon: { [key: string]: any } = IconData;

  useEffect(() => {
    const checkIfClickedOutside = (e: any) => {
      // If the menu is open and the clicked target is not within the menu,
      // then close the menu
      if (
        props.profileIsOpen &&
        profileRef.current &&
        !profileRef.current.contains(e.target) &&
        profileButtonRef.current &&
        !profileButtonRef.current.contains(e.target)
      ) {
        props.setProfileIsOpen(false);
      }
      if (
        props.notificationIsOpen &&
        notificationsRef.current &&
        !notificationsRef.current.contains(e.target) &&
        notificationsButtonRef.current &&
        !notificationsButtonRef.current.contains(e.target) &&
        notificationsOverlayRef.current &&
        !notificationsOverlayRef.current.contains(e.target)
      ) {
        props.setNotificationIsOpen(false);
      }
    };

    document.addEventListener('mousedown', checkIfClickedOutside);

    return () => {
      // Cleanup the event listener
      document.removeEventListener('mousedown', checkIfClickedOutside);
    };
  }, [props]);
  useMemo(() => {
    if (props.pathnameNestedRoutes.length <= 1) {
      setPath(() =>
        isEmpty(props.pathnameNestedRoutes[0]) ||
        props.pathnameNestedRoutes[0] === '404' ||
        props.pathnameNestedRoutes[0] === 'profile' ||
        props.pathnameNestedRoutes[0] === '500'
          ? 'homepage'
          : props.pathnameNestedRoutes[0]
      );
    } else {
      setPath(() => props.pathnameNestedRoutes[0]);
    }
  }, [props.pathnameNestedRoutes]);

  return (
    <>
      <header
        className={`sticky top-0 z-40 flex size-full flex-col items-start gap-4 bg-bgColor px-6 pb-3 pt-5 lg:h-24 lg:flex-row lg:px-14`}
      >
        <div
          className={`flex items-center justify-start ${
            props.pathnameNestedRoutes.length > 0 && 'gap-4'
          } relative gap-5 lg:w-72`}
        >
          <div className="relative">
            {props.pathnameNestedRoutes.length > 0 && (
              <Link
                href={
                  props.pathnameNestedRoutes.length > 2
                    ? pathname.split('/').slice(0, -1).join('/')
                    : '/'
                }
              >
                <MenuArrowIcon className="size-3 fill-black" />
              </Link>
            )}
          </div>
          <Link href="/">
            <div
              className="relative aspect-video h-8 cursor-pointer lg:h-16"
              onClick={() => {
                setPath(() => 'homepage');
              }}
            >
              <Image
                src="/images/logonly.svg"
                alt="SPN logo"
                fill
                className="object-contain lg:hidden"
                priority
              />
              <Image
                src="/images/logo.svg"
                alt="SPN logo"
                fill
                className="hidden object-contain lg:block"
                priority
              />
            </div>
          </Link>
        </div>
        {props.profileIsOpen && (
          <div
            ref={profileRef}
            className="absolute right-10 top-20 z-40 hidden h-fit max-h-[50vh] w-80 rounded-xl bg-bgColor px-4 shadow-[12px_12px_25px_0px_rgba(174,176,214,.5),-10px_-10px_20px_0px_rgba(255,255,255,1)] before:absolute before:-top-2 before:right-7 before:block before:size-0 before:rotate-[135deg] before:border-8 before:border-b-bgColor before:border-l-bgColor before:border-r-transparent before:border-t-transparent before:shadow-2xl before:content-[''] lg:block"
            // after:content-[''] after:absolute after:right-7 after:bottom-full after:border-8 after:border-x-transparent after:border-t-transparent after:border-b-bgColor after:drop-shadow-2xl"
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
                    props.setProfileIsOpen(false);
                  }}
                  className="w-fit cursor-pointer text-textColor hover:font-medium"
                >
                  Profile
                </span>
                <span
                  onClick={async () => {
                    // await Logout();
                    router.push('/');
                  }}
                  className="w-fit cursor-pointer text-textColor hover:font-medium hover:text-red"
                >
                  Logout
                </span>
              </div>
            </div>
          </div>
        )}
        {props.notificationIsOpen && (
          <div
            ref={notificationsRef}
            className="absolute right-14 top-24 z-40 hidden h-fit max-h-[80vh] w-[30rem] overflow-auto rounded-xl bg-bgColor px-4 shadow-[12px_12px_25px_0px_rgba(174,176,214,.5),-10px_-10px_20px_0px_rgba(255,255,255,1)] lg:block"
          >
            <div className="relative w-full">
              <h3 className="px-8 py-5 text-left font-text text-lg font-medium uppercase">
                Notifications
              </h3>
              <div className="flex h-full flex-col divide-y-2 divide-bgColorHover overflow-auto px-8">
                <NotificationContainer
                  time="2m"
                  userInitials="GO"
                  text=" Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the Lorem Ipsum."
                />
                <NotificationContainer
                  seen
                  time="2m"
                  userInitials="GO"
                  text=" Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the Lorem Ipsum."
                />
                <NotificationContainer
                  time="2m"
                  userInitials="GO"
                  text=" Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the Lorem Ipsum."
                />
                <NotificationContainer
                  seen
                  time="2m"
                  userInitials="GO"
                  text=" Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the Lorem Ipsum."
                />
                <NotificationContainer
                  seen
                  time="2m"
                  userInitials="GO"
                  text=" Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the Lorem Ipsum."
                />
                <NotificationContainer
                  time="2m"
                  userInitials="GO"
                  text=" Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the Lorem Ipsum."
                />
              </div>
            </div>
          </div>
        )}
        <div className="flex w-full items-center justify-between overflow-hidden">
          <motion.div
            ref={ref}
            className="flex w-full max-w-min items-center justify-end overflow-hidden py-2"
          >
            <motion.div
              className="flex w-fit grow pr-10"
              drag="x"
              dragDirectionLock
              dragMomentum={false}
              dragConstraints={ref}
            >
              <Breadcrumb
                asPathNestedRoutes={props.asPathNestedRoutes}
                pathnameNestedRoutes={props.pathnameNestedRoutes}
              />
            </motion.div>
          </motion.div>
          <div className="relative hidden gap-2 pl-10 lg:flex">
            <NavbarButton
              label={<MessageIcon className="size-6 fill-black/50 duration-75 hover:fill-black" />}
            />
            <NavbarButton
              label={<CalendarIcon className="size-4 fill-black/50 duration-75 hover:fill-black" />}
            />
            <NavbarButton
              buttonRef={notificationsButtonRef}
              isActive={props.notificationIsOpen}
              onClick={() => props.setNotificationIsOpen(!props.notificationIsOpen)}
              label={
                <NotificationIcon
                  className={`size-5 ${
                    props.notificationIsOpen ? 'fill-black' : 'fill-black/50'
                  } duration-75 group-hover:fill-black`}
                />
              }
            />
            <NavbarButton
              buttonRef={profileButtonRef}
              isActive={props.profileIsOpen}
              onClick={() => props.setProfileIsOpen(!props.profileIsOpen)}
              label={
                <ProfileIcon
                  className={`size-[1.15rem] ${
                    props.profileIsOpen ? 'fill-black' : 'fill-black/50'
                  } duration-75 group-hover:fill-black`}
                />
              }
            />
          </div>
        </div>
      </header>
      <div className="fixed bottom-6 left-1/2 z-30 flex h-fit w-[90vw] -translate-x-1/2 items-center justify-center gap-7 rounded-full bg-bgColor p-4 shadow-outer md:w-full md:max-w-sm lg:hidden">
        <NavbarButton
          onClick={() => props.setMenuIsOpen(true)}
          label={<MenuIcon className="size-6 fill-black" />}
        />
        <NavbarButton label={<MessageIcon className="size-6 fill-black" />} />
        <NavbarButton label={<CalendarIcon className="size-4 fill-black" />} />
        <NavbarButton
          onClick={() => props.setNotificationIsOpen(true)}
          label={<NotificationIcon className="size-5 fill-black" />}
        />
      </div>
      <OverlayContainer
        user={props.user}
        isOpen={props.menuIsOpen}
        setIsOpen={props.setMenuIsOpen}
        mobileOnly
      >
        <div className="flex h-full w-fit flex-col items-center justify-center pb-10">
          <div className="flex items-center justify-center gap-8 pb-10 pt-4">
            {path !== 'homepage' && (
              <button type="button" onClick={() => setPath('homepage')} title="Go to Homepage">
                <MenuArrowIcon className="size-3 fill-black" />
              </button>
            )}
            <h3 className="font-text text-base font-medium uppercase">{menuItems[path]?.title}</h3>
          </div>
          <div>
            <div className="relative flex w-fit flex-col items-center justify-center gap-5">
              {menuItems[path]?.menu
                ? Object.values(menuItems[path]?.menu).map((item: any, idx) => (
                    <div
                      className="w-full"
                      key={idx}
                      onClick={() => {
                        if (path !== 'homepage') props.setMenuIsOpen(false);
                      }}
                    >
                      <SidebarButton
                        label={item.title}
                        href={item.href}
                        Icon={Icon[item.Icon]}
                        isActive
                      />
                    </div>
                  ))
                : null}
            </div>
          </div>
        </div>
      </OverlayContainer>
      <OverlayContainer
        user={props.user}
        overlayRef={notificationsOverlayRef}
        isOpen={props.notificationIsOpen}
        setIsOpen={props.setNotificationIsOpen}
        fromRight
        mobileOnly
      >
        <div className="relative w-full">
          <h3 className="px-8 py-5 font-text text-lg font-medium uppercase">Notifications</h3>
          <div className="flex h-[80vh] flex-col divide-y-2 divide-bgColorHover overflow-auto px-8">
            <NotificationContainer
              time="2m"
              userInitials="GO"
              text=" Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the Lorem Ipsum."
            />
            <NotificationContainer
              time="50m"
              userInitials="HM"
              text=" Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the Lorem Ipsum."
            />
            <NotificationContainer
              seen
              time="1h 30m"
              userInitials="HM"
              text=" Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the Lorem Ipsum."
            />
            <NotificationContainer
              time="1h 30m"
              userInitials="HM"
              text=" Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the Lorem Ipsum."
            />
            <NotificationContainer
              seen
              time="1h 30m"
              userInitials="HM"
              text=" Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the Lorem Ipsum."
            />
            <NotificationContainer
              seen
              time="1h 30m"
              userInitials="HM"
              text=" Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the Lorem Ipsum."
            />
            <NotificationContainer
              seen
              time="1h 30m"
              userInitials="HM"
              text=" Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the Lorem Ipsum."
            />
          </div>
        </div>
      </OverlayContainer>
    </>
  );
}

export default Navbar;
