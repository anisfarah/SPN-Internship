import { MouseEventHandler } from 'react';

import { ChildrenProps } from './children.type';

export type CardProps = ChildrenProps & {
  className?: string;
  data: any;
  link?: string;
  withRounded?: JSX.Element;
};
export type CardTableProps = ChildrenProps & {
  title?: React.ReactNode;
  IconOne?: React.ReactNode;
  IconTwo?: React.ReactNode;
  IconThree?: React.ReactNode;
  IconFour?: React.ReactNode;
  handleIconOneChange?: MouseEventHandler<HTMLSpanElement>;
  handleIconTwoChange?: MouseEventHandler<HTMLDivElement>;
  Status?: JSX.Element;
  handleStatusChange?: MouseEventHandler<HTMLDivElement>;
  isMobile?: boolean;
  fullWidth?: boolean;
  isInner?: boolean;
};
