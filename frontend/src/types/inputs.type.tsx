import React, { MouseEventHandler } from 'react';

export type SelectInputProps = {
  title?: string;
  selected?: Record<any, any>;
  valueKey: string;
  isMultiple?: boolean;
  isMobile?: boolean;
  isBool?: boolean;
  options?: any[];
  isInner?: boolean;
  center?: boolean;
  withSearch?: boolean;
  searchPlaceholder?: string;
};
export type AutocompleteProps = {
  IconOne?: React.JSX.Element;
  required?: boolean;
  disabled?: boolean;
  config?: any;
  value?: string;
  placeholder: string;
  handleChange?: (value: string) => void;
  options: any[];
  label: string;
  filterFields: string[];
  validationObjects?: string[] | undefined;
  name?: string;
  displayFields: string[];
  isClicked?: boolean;
  HandleNoMatch?: React.JSX.Element;
  defaultValue?: any;
  maps?: boolean;
  valueKey?: string;
};
export type DynamicCitiesProps = {
  withAddButton?: boolean;
  IconOne?: React.JSX.Element;
  required?: boolean;
  value?: string;
  placeholder: string;
  handleChange?: (value: string) => void;
  options: any[];
  label: string;
  filterFields: string[];
  validationObjects?: string[] | undefined;
  name?: string;
  displayFields: string[];
  isClicked?: boolean;
  HandleNoMatch?: React.JSX.Element;
  defaultValue?: any;
};
export type ValidationObject = {
  code: string;
  exact?: number;
  inclusive?: { min: number; max: number };
  message: string;
  value?: boolean;
  minimum?: number;
  path: string;
  type: string;
};
export type SimpleInputProps = React.ComponentProps<'input'> & {
  label: string;
  icon?: React.JSX.Element;
  className?: string;
  validationObjects?: string[] | undefined;
  isClicked?: boolean;
};
export type DownloadInputProps = {
  fileLink: string;
  handleClick: MouseEventHandler<HTMLDivElement>;
  text: string;
};
export type UploadInputProps = {
  value: any;
  setAlert: React.Dispatch<React.SetStateAction<{ status: number; alert: string }>>;
  name: string;
  required: boolean;
  extensions: string;
  label: string;
  isClicked: boolean;
  isInvalid?: boolean;
  archive?: boolean;
  disabled?: boolean;
  slug?: string;
  onArchiveAction?: (action: boolean) => void;
};
export type DraggableItemProps = {
  id: string;
  imageArray?: any[];
  setImageArray?: React.Dispatch<any[]>;
  activeImage: any;
};
export type DynamicInputsProps = {
  inputConfig: any[];
  invisible?: boolean;
  isClicked?: boolean;
  className?: string;
  errors: any[];
  withAddButton?: object;
  withInputAccordion?: object;
};
export type TextareaProps = React.ComponentProps<'input'> &
  React.ComponentProps<'textarea'> & {
    defaultValue: any;
    spaceBetween?: boolean;
    isClicked?: boolean;
    label?: string;
    disabled?: boolean;
    secondLabel?: string;
    validationObjects?: string[] | undefined;
    handleChange?: (x: any) => any;
    delimiter?: string;
  };
export type CommentInputProps = TextareaProps & {
  withAddButton?: boolean;
  newCommentIndex?: number;
};
export type ToggleInputProps = {
  inputConfig: InputConfigObject;
  isClicked?: boolean;
  invalid?: boolean;
  name?: string;
  checked?: boolean;
  disabled?: boolean;
  placeholderInactive?: string;
  placeholderActive?: string;
  withoutBackground?: boolean;
  defaultChecked?: boolean;
  type: string;

  label: string;
  required: boolean;
};
export type InputConfigObject = {
  name: string;
  type: string;
  pattern?: string;
  defaultValue?: string;
  placeholder: string;
  defaultChecked?: boolean;
  label: string;
  required: boolean;
  errorMsg: string;
  icon?: React.ReactNode;
  withoutBackground: boolean;
  placeholderInactive?: string;
  placeholderActive?: string;
  checked: boolean;
  disabled: boolean;
};
export type UploadMultiInputProp = {
  isInner: boolean;
  required: boolean;
  name: string;
  label: string;
  value: any;
  isClicked: boolean;
};
export type UploadSimpleInputProp = {
  value: any;
  handleChange: (x: any) => any;
  setAlert: React.Dispatch<{ status: number; alert: string }>;
  disabled: boolean;
};

export type UploadExcelInputProps = {
  value: any;
  isInvalid: boolean;
  handleChange: (file: File) => void;
  setAlert: (alert: { status: number; alert: string }) => void;
  disabled: boolean;
};

export type PhoneNumberType = {
  phone: string;
  internationalCode: {
    name: string;
    areaCode: string;
    countryCode: string;
  };
};

export type PhoneInputProps = React.ComponentProps<'input'> & {
  label: string;
  name: string;
  required?: boolean;
  validationObjects?: string[] | undefined;
  initialValue?: PhoneNumberType;
  isClicked?: boolean;
};

export type SingleDropdownProps = {
  value: any;
  handleChange?: (x: any) => any;
  options: any[];
  isInvalid: boolean;
  withDescription: boolean;
  isInner: boolean;
};
export type AddInputProps = {
  onClick?: () => void;
  label?: string;
  inputConfig: any[];
  elementToAdd: any;
  setInputConfig: React.Dispatch<React.SetStateAction<any[]>>;
};
export type DropDownInputProps = {
  isOpen?: boolean;
  isClicked?: boolean;
  title?: string;
  defaultValue?: any;
  validationObjects?: string[] | undefined;
  options: any;
  name: string;
  label: string;
  notList?: boolean;
  icons?: { [key: string]: React.ReactNode };
  stroke?: boolean;
  required?: boolean;
  multiple?: boolean;
  withAccordion?: boolean;
  hidden?: boolean;
  pushToParams?: boolean;
  minHeight?: boolean;
  placeholder?: string;
  addForm?: any;
};

export type MultiDropdownProps = {
  value: any;
  handleChange: (x: any) => any;
  options: any;
  isInvalid: boolean;
  isInner: boolean;
  valueKey: string;
  isMobile: boolean;
};

export type CalendarInputProps = {
  name: string;
  label: string;
  initialValue?: any;
  withPast?: boolean;
  withFuture?: boolean;
  withTime?: boolean;
  validationObjects?: string[] | undefined;
  isClicked?: boolean;
  required?: boolean;
};

export type DropdownProps = {
  title: string;
  isInner: boolean;
  IconOne: any;
  IconTwo: any;
  label: string;
};

export type SelectBoxProps = {
  title: string;
  selected: any;
  handleChange: (x: any) => any;
  valueKey: number;
  isMultiple: boolean;
  isMobile: boolean;
  options: any[];
  isInner: boolean;
  center: boolean;
};
