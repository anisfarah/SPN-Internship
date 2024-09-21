import { LegacyRef } from 'react';
import { Url } from 'url';

export interface IButton extends React.ComponentProps<'button'> {
  label?: string | JSX.Element;
  withArrow?: boolean;
  isRounded?: boolean;
  rightDirection?: boolean;
  Icon?: any;
  path?: string;
}
export interface IBarButton extends IButton {
  href: Url;
  buttonRef?: LegacyRef<HTMLDivElement> | any;
  isHidden?: boolean;
  isActive?: boolean;
}
export type NavbarButtonProps = React.ComponentProps<'button'> & {
  isActive?: boolean;
  label?: string | JSX.Element;
  buttonRef?: React.RefObject<HTMLDivElement>;
};
export type SidebarButtonProps = React.ComponentProps<'button'> & {
  isActive: boolean;
  label?: string | JSX.Element;
  buttonRef: React.RefObject<HTMLDivElement>;
};
