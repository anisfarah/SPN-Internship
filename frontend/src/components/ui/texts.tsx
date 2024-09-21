import { ChildrenProps } from '@/types/children.type';
import {
  LabelProps,
  LabelTextProps,
  StatusLabelData,
  StatusLabelDropdownProps,
  StatusLabelProps,
  TextProps,
  TitleProps
} from '@/types/texts.type';
import { Key } from 'react';

import cn from '../../utils/tailwindClassNameMerge';

function Title(props: TitleProps): React.ReactElement {
  return (
    <h1 className={cn('cursor-default font-text text-2xl uppercase md:text-3xl', props.className)}>
      {props.text}
    </h1>
  );
}
/**
 * Renders a text block with customizable styling.
 *
 * @param {ReactNode} children - The content of the text block.
 * @param {boolean} [withWhiteSpace=false] - Whether to add white space at the end of the text block.
 * @param {boolean} [justifyText=false] - Whether to justify the text within the block.
 * @returns {ReactElement} The rendered text block.
 */
function Text(props: TextProps): React.ReactElement {
  return (
    <div
      className={cn(
        `text-base md:text-lg ${
          props.justifyText && 'text-justify'
        } font-text font-light ${props.withWhiteSpace && 'truncate pr-10'}`,
        props.className
      )}
    >
      {props.children}
    </div>
  );
}
function Label(props: LabelProps) {
  return (
    <label
      className={`cursor-default font-text text-sm font-normal capitalize md:text-base ${
        props.underline && 'underline'
      }`}
    >
      {props.children}
    </label>
  );
}

function Category(props: ChildrenProps) {
  return (
    <h3 className="cursor-default font-text text-sm font-medium uppercase md:text-base">
      {props.children}
    </h3>
  );
}
export { Title, Text, Category, Label };

function Subtitle(props: ChildrenProps) {
  return (
    <h2 className="cursor-default font-text text-lg font-semibold uppercase md:text-xl">
      {props.children}
    </h2>
  );
}

function StatusLabel(props: StatusLabelProps) {
  return (
    <div className="group relative" onClick={props.onClick}>
      <label
        className={`block w-28 rounded-3xl px-3.5 py-2 text-center md:w-44 lg:px-6 ${
          props.color === 'green'
            ? 'bg-greenAccent text-green'
            : props.color === 'orange'
              ? 'bg-orangeAccent text-orange'
              : props.color === 'red'
                ? 'bg-redAccent text-red'
                : props.color === 'yellow'
                  ? 'bg-yellowAccent text-yellow'
                  : props.color === 'blue'
                    ? 'bg-blueAccent text-blue'
                    : props.color === 'brown'
                      ? 'bg-brownAccent text-brown'
                      : props.color === 'gray'
                        ? 'bg-grey text-greyAccent'
                        : props.color === 'grey'
                          ? 'bg-grey text-greyAccent'
                          : props.color === 'pink'
                            ? 'bg-pinkAccent text-pink'
                            : props.color === 'purple'
                              ? 'bg-purpleAccent text-purple'
                              : props.color === 'turquoise'
                                ? 'bg-turquoise text-turquoiseAccent'
                                : props.color === 'teal'
                                  ? 'bg-teal-200 text-teal-600'
                                  : null
        } whitespace-nowrap font-text text-xs font-medium md:text-base`}
      >
        {props.text}
      </label>
      {props.children}
    </div>
  );
}
function StatusLabelDropdown(props: StatusLabelDropdownProps) {
  return (
    <div className="relative flex h-full w-44 justify-center py-2">
      <div className="left-0 top-2 z-20 flex w-44 flex-col items-center justify-start gap-2 overflow-auto rounded-xl bg-bgColor py-2 lg:absolute lg:hidden lg:max-h-[9.8rem] lg:shadow-[12px_12px_25px_0px_rgba(174,176,214,.5),-10px_-10px_20px_0px_rgba(255,255,255,1)] lg:group-hover:flex">
        {props.data.map((status: StatusLabelData, idx: Key | null | undefined) => (
          <div
            onClick={() => props.handleChange(status.value, props.id)}
            className={`flex w-full cursor-pointer items-start justify-start gap-4 text-xs ${
              status.color === 'green'
                ? 'lg:hover:bg-greenAccent'
                : status.color === 'orange'
                  ? 'lg:hover:bg-orangeAccent'
                  : status.color === 'red'
                    ? 'lg:hover:bg-redAccent'
                    : status.color === 'yellow'
                      ? 'lg:hover:bg-yellowAccent'
                      : status.color === 'blue'
                        ? 'lg:hover:bg-blueAccent'
                        : status.color === 'brown'
                          ? 'lg:hover:bg-brownAccent'
                          : status.color === 'gray'
                            ? 'lg:hover:bg-grey'
                            : status.color === 'grey'
                              ? 'lg:hover:bg-grey'
                              : status.color === 'turquoise'
                                ? 'lg:hover:bg-turquoise'
                                : status.color === 'pink'
                                  ? 'lg:hover:bg-pinkAccent'
                                  : status.color === 'purple'
                                    ? 'lg:hover:bg-purpleAccent'
                                    : status.color === 'teal'
                                      ? 'lg:hover:bg-teal-200'
                                      : null
            } px-4 py-1`}
            key={idx}
          >
            <div
              className={`flex aspect-square size-7 items-center justify-center rounded-full ${
                props.selected === status.value &&
                'bg-white shadow-[12px_12px_25px_0px_rgba(174,176,214,.5),-10px_-10px_20px_0px_rgba(255,255,255,1)]'
              }`}
            >
              <div
                className={`size-3 rounded-full ${
                  status.color === 'green'
                    ? 'bg-green'
                    : status.color === 'orange'
                      ? 'bg-orange'
                      : status.color === 'red'
                        ? 'bg-red'
                        : status.color === 'yellow'
                          ? 'bg-yellow'
                          : status.color === 'blue'
                            ? 'bg-blue'
                            : status.color === 'brown'
                              ? 'bg-brown'
                              : status.color === 'pink'
                                ? 'bg-pink'
                                : status.color === 'purple'
                                  ? 'bg-purple'
                                  : status.color === 'gray'
                                    ? 'bg-gray-400'
                                    : status.color === 'grey'
                                      ? 'bg-grey'
                                      : status.color === 'turquoise'
                                        ? 'bg-turquoise'
                                        : status.color === 'teal'
                                          ? 'bg-teal-400'
                                          : null
                }`}
              />
            </div>
            <span className="whitespace-nowrap text-sm">{status.label}</span>
          </div>
        ))}
      </div>
    </div>
  );
}
/**
 * Render a label with optional required indicator and invalid state.
 * @param {Object} props - The component props.
 * @param {boolean} [props.required] - Is the input field required?
 * @param {string} [props.label] - The label text.
 * @param {ReactNode} props.children - The content of the label.
 * @param {boolean} [props.invalid] - Is the input field in an invalid state?
 * @param {boolean} props.isClicked - Has the input field been clicked?
 * @param {string} [props.className] - Additional class name.
 * @returns {JSX.Element} The label element.
 */
function LabelText(props: LabelTextProps): JSX.Element {
  return (
    <label
      className={cn(
        `pb-2 font-text text-xs font-light text-inputLabelAccent ${props.isClicked && 'peer-invalid:text-red'} ${props.isClicked && props.invalid && 'text-red'} md:text-base lg:text-sm ${props.required && props.label && props.label !== '' && "after:ml-0.5 after:font-PlayfairDisplaySC after:content-['*']"}`,
        props.className
      )}
    >
      {props.label}
    </label>
  );
}
function CalendarText(props: ChildrenProps) {
  return <p className="text-center font-text text-xs font-light md:text-sm">{props.children}</p>;
}

function CalendarCategory(props: ChildrenProps) {
  return (
    <h3 className="cursor-default text-center font-text text-xs font-medium uppercase md:text-sm">
      {props.children}
    </h3>
  );
}

export { LabelText, CalendarText, CalendarCategory, StatusLabel, Subtitle, StatusLabelDropdown };
