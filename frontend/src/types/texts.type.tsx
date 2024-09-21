import { Key, MouseEventHandler } from 'react';

import { ChildrenProps } from './children.type';

export type StatusLabelProps = {
  children?: React.ReactNode;
  color: string;
  onClick?: MouseEventHandler<HTMLDivElement>;
  text: string;
};

export type TextProps = {
  children: React.ReactNode;
  withWhiteSpace?: boolean;
  justifyText?: boolean;
  className?: string;
};
export type StatusLabelData = {
  value: any;
  color: string;
  label: string;
};

export type StatusLabelDropdownProps = {
  data: StatusLabelData[];
  handleChange: (value: any, id: Key) => void;
  id: Key;
  selected?: any;
};

export type LabelTextProps = React.ComponentProps<'label'> & {
  required?: boolean;
  label?: string | React.ReactNode;
  invalid?: boolean;
  isClicked?: boolean;
  className?: string;
};
export type LabelProps = ChildrenProps & {
  underline?: boolean;
};
export type TitleProps = {
  text: string;
  className?: string;
};
