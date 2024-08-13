'use client';

import menuItemData from '@/data/sidebarMenu.json';
import { SideBarProps } from '@/types/sideBar.type';
import { useMemo, useState } from 'react';

import { isEmpty } from '../../utils/inputHelpers';
import DoubleArrowIcon from '../icons/doubleArrowIcon';
import * as IconData from '../icons/menuIcons';
import { SidebarButton } from './buttons';

function Sidebar(props: SideBarProps) {
  const menuItems: { [key: string]: any } = menuItemData;
  const Icon: { [key: string]: any } = IconData;
  const [activeIndex, setActiveIndex] = useState(0);
  const [path, setPath] = useState(
    props.pathnameNestedRoutes.length > 0 ? props.pathnameNestedRoutes[0] : 'homepage'
  );
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
      setActiveIndex(
        () =>
          menuItems[path]?.menu[
            isEmpty(props.pathnameNestedRoutes[0]) ? '' : props.pathnameNestedRoutes[0]
          ]?.id
      );
    } else {
      setPath(() => props.pathnameNestedRoutes[0]);
      if (props.pathnameNestedRoutes[1].toString().startsWith('['))
        setActiveIndex(
          () => menuItems[props.pathnameNestedRoutes[0]]?.menu[props.pathnameNestedRoutes[0]]?.id
        );
      else
        setActiveIndex(
          () => menuItems[props.pathnameNestedRoutes[0]]?.menu[props.pathnameNestedRoutes[1]]?.id
        );
    }
  }, [props.pathnameNestedRoutes]);

  return (
    <div
      className={`fixed hidden lg:block ${
        props.isHidden ? 'w-28' : 'w-72'
      } left-0 top-0 z-0 h-full bg-bgColor pt-20 duration-300`}
    >
      <div className="flex h-full flex-col overflow-hidden py-6">
        <div
          className={`mb-6 flex items-center gap-3 pl-5 ${
            props.isHidden ? '-translate-x-full opacity-0' : 'translate-x-0 opacity-100'
          } duration-300`}
        >
          <div
            onClick={() => {
              setPath(() => 'homepage');
              setActiveIndex(menuItems.homepage?.menu[props.pathnameNestedRoutes[0]]?.id);
            }}
            className={` ${
              path === 'homepage' ? 'cursor-default' : 'cursor-pointer'
            } aspect-square size-6`}
          >
            <DoubleArrowIcon
              className={`size-6 rotate-180 ${path === 'homepage' && 'opacity-0'}`}
            />
          </div>
          <h3 className="cursor-default whitespace-nowrap py-4 font-text text-base font-medium uppercase text-black">
            {menuItems[path]?.title}
          </h3>
        </div>
        <div className="flex h-[calc(100vh-184px)] grow flex-col items-end justify-between gap-6 pb-4 pl-5">
          <div className="relative flex size-full flex-col items-center justify-start gap-1 overflow-y-auto overflow-x-hidden px-2 py-4 pb-10 outline-none">
            {menuItems[path]?.menu
              ? Object.values(menuItems[path]?.menu).map((item: any, idx) => (
                  <div key={idx} className="flex w-full">
                    <SidebarButton
                      href={item.href}
                      Icon={Icon[item.Icon]}
                      label={item.title}
                      isActive={idx === activeIndex}
                      isHidden={props.isHidden}
                      onClick={() => {
                        if (item.href === '/') {
                          setPath(() => 'homepage');
                        } else {
                          setPath(() => item.href.split('/')[1]);
                        }
                        if (props.pathnameNestedRoutes[0] === path) setActiveIndex(item.id);
                      }}
                    />
                  </div>
                ))
              : null}
          </div>
          <div
            className="mx-6 flex aspect-square size-9 shrink-0 cursor-pointer items-center justify-center rounded-full bg-bgColor shadow-[12px_12px_25px_0px_rgba(174,176,214,.5),-10px_-10px_20px_0px_rgba(255,255,255,1)]"
            onClick={() => props.setIsHidden(!props.isHidden)}
          >
            <DoubleArrowIcon
              className={`aspect-square size-7 ${props.isHidden ? '' : 'rotate-180'} duration-300`}
            />
          </div>
        </div>
      </div>
    </div>
  );
}

export default Sidebar;
