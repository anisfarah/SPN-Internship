import { LegacyRef } from 'react';

import { ChildrenProps } from './children.type';

export type LoginContainerProps = ChildrenProps & {
  image: any;
};
export interface IContainerProps extends ChildrenProps {
  isInner?: boolean;
  withoutShadow?: boolean;
  ref?: LegacyRef<HTMLDivElement> | undefined;
  numberHeaders?: number;
  minSpace?: boolean;
  mobileHeight?: boolean;
  desktopOnly?: boolean;
  className?: string;
}
export interface IContainerGeneralProps extends ChildrenProps {
  isOpen?: boolean;
  title?: string | JSX.Element;
  setIsOpen: React.Dispatch<React.SetStateAction<boolean>>;
  mobileOnly?: boolean;
}
export interface DropdownContainerProps extends ChildrenProps {
  children: React.ReactNode;
  title: string;
  className?: string;
  clicked?: boolean;
  loading?: boolean;
}

export interface EditOverlayContainerProps extends IContainerGeneralProps {
  handleSubmit?: (e: Event) => void;
  closeManually?: boolean;
  withButton?: boolean;
  archive?: boolean;
  type?: 'button' | 'submit' | 'reset';
  label?: string;
  confirm?: () => void;
  onClose?: () => void;
  className?: string;
}
export interface ViewImageOverlayContainerProps extends IContainerGeneralProps {
  handleSubmit?: (e: Event) => void;
  image: any;
  confirm?: () => void;
  onClose?: () => void;
  className?: string;
}
export type FiltersOverlayContainerProps = IContainerGeneralProps & {
  handleReset: (x?: any) => any;
};

export type OverlayContainerProps = IContainerGeneralProps & {
  overlayRef?: React.RefObject<HTMLDivElement>;
  user?: any;
  fromRight?: boolean;
};

export type TabsContainerProps = ChildrenProps & {
  fullWidth?: boolean;
  desktopOnly?: boolean;
  mobileOnly?: boolean;
};
export interface IAccordionContainerProps extends IContainerGeneralProps {
  isSelected?: boolean;
  selectionNumber?: number;
  inputContainer?: boolean;
  isShadow?: boolean;
  defaultOpen?: boolean;
  withButton?: boolean;
  title?: string | JSX.Element;
  buttonLabel?: string;
  handleButtonClick?: () => void;
  addContent?: any;
  isActive?: boolean;
  icon?: JSX.Element;
  className?: string;
  invalid?: boolean;
}
export type DraggableAccordionContainerProps = IAccordionContainerProps & {
  id: string;
};

export type ImageContainerProps = React.ComponentProps<'div'> & {
  image: File | any;
  expand?: boolean;
  blur?: string;
  imageArray?: File[] | any[];
  buttonRef?: React.RefObject<HTMLDivElement>;
  setImageArray?: React.Dispatch<any[]>;
  hideDelete?: boolean;
};

export type NotificationContainerProps = {
  text: string;
  time: string;
  userInitials: string;
  seen?: boolean;
};
