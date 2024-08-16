import { Dispatch } from 'react';

import { ChildrenProps } from './children.type';

export type FormProps = ChildrenProps &
  React.ComponentProps<'form'> & {
    moreSpace?: boolean;
    mobileOnly?: boolean;
    minGap?: boolean;
    fullWidth?: boolean;
    withTabs?: boolean;
  };

export type DynamicFormProps = {
  config: any;
  action: ((initialState: any, formData: FormData) => Promise<any>) | (() => void);
  className?: string;
  fullWidth?: boolean;
  withSteps?: boolean;
  withShowMore?: boolean;
  showMoreLabel?: boolean;
  defaultTab?: string;
  withTabs?: boolean;
  errors?: any[];
  secondConfig?: any[] | undefined;
  children?: React.ReactNode;
  setOverlayIsOpen?: Dispatch<boolean>;
  overlayIsOpen?: boolean;
  titles?: any[];
  buttonLabel?: string;
  withoutButton?: boolean;
};
export type DynamicFormWithStepsProps = {
  config: any;
  action: (initialState: any, formData: FormData) => Promise<any>;
  className?: string;
  fullWidth?: boolean;
  stepContainerFitWidth?: boolean;
  titles: any[];
  step?: number;
};
export type CustomFormProps = {
  action: (initialState: any, formData: FormData) => Promise<any>;
  className?: string;
  fullWidth?: boolean;
  setIsClicked: Dispatch<boolean>;
  children?: React.ReactNode;
  setOverlayIsOpen?: Dispatch<boolean>;
  overlayIsOpen?: boolean;
  titles?: any[];
  buttonLabel?: string;
  withoutButton?: boolean;
};
export type DynamicRatingFormProps = ChildrenProps & {
  config: any[];
  agencyId: string;
  action: (initialState: any, formData: FormData) => Promise<any>;
  className?: string;
  errors?: any[];
  buttonLabel?: string;
};
