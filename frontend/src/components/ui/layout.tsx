'use client';
import { AlertProvider } from '@/helpers/alertHelper';
import { ModalProvider } from '@/helpers/modalHelper';
import useStore from '@/hooks/useStore';
import useUser from '@/hooks/useUserStore';
import { usePathname } from 'next/navigation';
import React, { useState } from 'react';

import Navbar from './navbar';
import Sidebar from './sideBar';

const generatePathParts = (pathStr: string) => {
  const pathWithoutQuery = pathStr.split('?')[0];

  return pathWithoutQuery.split('/').filter((v) => v.length > 0);
};

function Layout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();

  const user = useStore(useUser, (state) => state.user);
  const [menuIsOpen, setMenuIsOpen] = useState(false);
  const [profileIsOpen, setProfileIsOpen] = useState(false);
  const [notificationIsOpen, setNotificationIsOpen] = useState(false);
  const [isHidden, setIsHidden] = useState(false);

  const asPathNestedRoutes = generatePathParts(pathname);
  const pathnameNestedRoutes = generatePathParts(pathname);

  return (
    <div className="relative flex size-full min-h-svh flex-col overflow-hidden bg-bgColor lg:h-svh">
      <Navbar
        user={user}
        setMenuIsOpen={setMenuIsOpen}
        menuIsOpen={menuIsOpen}
        notificationIsOpen={notificationIsOpen}
        setNotificationIsOpen={setNotificationIsOpen}
        profileIsOpen={profileIsOpen}
        setProfileIsOpen={setProfileIsOpen}
        asPathNestedRoutes={asPathNestedRoutes}
        pathnameNestedRoutes={pathnameNestedRoutes}
      />
      <div className="relative flex size-full flex-1 flex-col lg:max-h-[calc(100svh-96px)] lg:flex-row">
        <Sidebar
          isHidden={isHidden}
          setIsHidden={setIsHidden}
          pathnameNestedRoutes={pathnameNestedRoutes}
        />
        <main
          className={`relative mb-24 flex flex-col duration-300 ease-in-out lg:mb-0 ${isHidden ? 'lg:ml-28' : 'lg:ml-72'} size-full bg-bgColor`}
        >
          <AlertProvider>
            <ModalProvider>{children}</ModalProvider>
          </AlertProvider>
        </main>
      </div>
    </div>
  );
}

export default Layout;
