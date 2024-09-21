'use client';

import { getCitiesFromCountry } from '@/helpers/cities';
import { Locales } from '@/helpers/locales';
import { useOutsideClick } from '@/hooks/useClickOutside';
import {
  CalendarInputProps,
  CommentInputProps,
  DownloadInputProps,
  DynamicCitiesProps,
  PhoneInputProps,
  PhoneNumberType,
  SelectInputProps,
  SimpleInputProps,
  TextareaProps,
  ToggleInputProps
} from '@/types/inputs.type';
import moment from 'moment/moment';
import Image from 'next/image';
import Link from 'next/link';
import { usePathname, useRouter, useSearchParams } from 'next/navigation';
import React, { ComponentType, MouseEvent, useCallback, useEffect, useRef, useState } from 'react';

import {
  capitalize,
  debounce,
  getInputComponent,
  removeCamelCase,
  toThousands
  // SearchQuery
} from '../../utils/inputHelpers';
import cn from '../../utils/tailwindClassNameMerge';
import AddIcon from '../icons/addIcon';
import CalendarIcon from '../icons/calendarIcon';
import CheckIcon from '../icons/checkIcon';
import ChevronIcon from '../icons/chevronIcon';
import DownloadIcon from '../icons/downloadIcon';
import { MinusIcon, PlusIcon } from '../icons/mainIcons';
import SearchIcon from '../icons/searchIcon';
import StarIcon from '../icons/starIcon';
import TrashIcon from '../icons/trashIcon';
import Button, { RoundedButton } from './buttons';
import { FullCalendar } from './calendars';
import { AccordionContainer } from './containers';
import DynamicInputs from './dynamicInputs';
import { Category, LabelText, Text } from './texts';

/**
 * Renders a download input component.
 *
 * @param {Object} props The component props.
 * @param {string} props.fileLink The file link URL.
 * @param {Function} props.handleClick The click event handler.
 * @param {string} props.text The text to display.
 * @return {JSX.Element} The rendered download input component.
 */

//TODO: fix inputs size and general proportions (too large)

function DownloadInput(props: DownloadInputProps): JSX.Element {
  return (
    <div
      className={`flex h-11 w-full cursor-pointer justify-center rounded-full bg-bgColor px-6 py-2 font-text text-sm font-light shadow-inner outline-none md:text-base`}
    >
      <Link href={props.fileLink} className="size-full">
        <div className="flex w-full items-center justify-between gap-4" onClick={props.handleClick}>
          <span className="truncate font-light underline">{props.text}</span>
          <DownloadIcon className="size-6" />
        </div>
      </Link>
    </div>
  );
}

/**
 * SimpleInput component is a generic input component that can be used for various type of inputs.
 * It can be used to render input fields such as text, number, date, email, etc.
 * @param props - Props object that contains the input field configuration
 */
function SimpleInput(props: SimpleInputProps) {
  const messages = props.validationObjects || [];

  return (
    <div className="relative flex w-full flex-col">
      {props.icon && (
        <div className="absolute left-5 top-[2.2rem] size-6 md:top-[2.7rem] lg:top-[2.4rem]">
          {props.icon}
        </div>
      )}
      <input
        disabled={props.disabled}
        type={props.type}
        min={props.min || undefined}
        max={props.max || undefined}
        defaultValue={props.defaultValue}
        placeholder={props.placeholder || ''}
        name={props.name}
        required={props.required}
        readOnly={props.disabled}
        hidden={props.hidden}
        className={cn(
          `peer order-2 h-11 w-full rounded-full bg-bgColor py-2 duration-300 ease-in-out ${props.isClicked && (messages.length ? 'border border-red' : 'invalid:border invalid:border-red')} flex justify-center px-6 ${props.icon ? 'pl-14' : 'pl-6'} font-text text-sm font-light ${props.disabled ? 'cursor-not-allowed' : 'cursor-auto'} shadow-inner outline-none focus:shadow-innerFocus md:text-base`,
          props.className
        )}
      />
      <LabelText isClicked={props.isClicked} required={props.required} label={props.label} />
      {messages.map((message, index) => (
        <span
          key={index}
          className={`order-3 mx-4 pt-1 text-sm text-red ${props.isClicked && messages.length ? 'block' : 'hidden'}`}
        >
          {message}
        </span>
      ))}
    </div>
  );
}

/**
 * Renders a phone input component with a dropdown menu for selecting a country.
 *
 * @param {PhoneInputProps} props - The props for the PhoneInput component.
 * @return {JSX.Element} The rendered PhoneInput component.
 */
function PhoneInput(props: PhoneInputProps): JSX.Element {
  // State for the dropdown menu
  const [isOpen, setIsOpen] = useState(false);
  // State for the search input
  const [searchInput, setSearchInput] = useState('');
  // Reference to the input field
  const phoneRef = useRef<HTMLInputElement>(null);
  // Set up the outside click handler
  const ref = useOutsideClick(isOpen, () => {
    setIsOpen(!isOpen);
  });
  // Validation messages
  const messages = props.validationObjects || [];

  // State for the selected phone number
  const [selectedValues, setSelectedValues] = useState<PhoneNumberType>(
    props.initialValue || {
      phone: '',
      internationalCode: {
        name: 'Switzerland',
        areaCode: '41',
        countryCode: 'CH'
      }
    }
  );

  /**
   * Handle selecting a country
   * @param {any} option - The selected country
   */
  const handleListSelect = (option: any) => {
    setSelectedValues(() => {
      setIsOpen(false);

      return {
        phone: phoneRef?.current?.value || '',
        internationalCode: {
          name: option.name,
          areaCode: option.dial_code,
          countryCode: option.code
        }
      };
    });
  };

  /**
   * Handle input change
   */
  const handleInputChange = () => {
    setSelectedValues((prevValues: any) => ({
      ...prevValues,
      phone: phoneRef?.current?.value || ''
    }));
  };

  // Filter the countries based on the search input
  const filteredCountries = Locales?.filter(
    (val) =>
      // Filter for search input
      val.name?.toLowerCase().includes(searchInput.toLowerCase()) ||
      val.dial_code?.toLowerCase().includes(searchInput.toLowerCase()) ||
      ''.concat(val.dial_code)?.toLowerCase().includes(searchInput.toLowerCase()) ||
      val.dial_code?.toLowerCase().includes(searchInput.toLowerCase())
  );

  return (
    // Container for the input and dropdown menu
    <div className="relative flex w-full flex-col" ref={ref}>
      <LabelText
        invalid={messages.length > 0}
        isClicked={props.isClicked}
        required={props.required}
        label={props.label}
      />
      {/* Render the input field */}
      <div
        className={`${props.isClicked && messages.length && 'border border-red'} relative w-full overflow-hidden rounded-3xl bg-bgColor px-6 shadow-inner outline-none duration-500 ease-in-out ${isOpen ? 'h-64' : 'h-11'} `}
      >
        <label
          className={`relative flex h-11 w-full items-center justify-start gap-1 rounded-full py-2 font-text text-sm font-light md:text-base`}
        >
          <div
            className={`${props.disabled ? 'cursor-not-allowed' : 'cursor-pointer'} relative flex h-8 w-12 items-center justify-between gap-2`}
            onClick={() => {
              props.disabled ? null : setIsOpen(!isOpen);
            }}
          >
            <span className="relative size-6">
              <Image
                src={`https://cdn.jsdelivr.net/gh/lipis/flag-icons/flags/4x3/${selectedValues?.internationalCode?.countryCode?.toLowerCase()}.svg`}
                alt={`${selectedValues?.internationalCode?.countryCode}'s flag`}
                sizes="(max-width: 768px) 40px,30px"
                fill
                className="object-contain"
              />
            </span>
            <span className="relative flex aspect-square size-4 items-center justify-center">
              <ChevronIcon
                className={`flex size-3 shrink-0 grow-0 ${isOpen ? '-rotate-90' : 'rotate-90'} duration-200 ease-in-out`}
              />
            </span>
          </div>
          <span
            className={`text-sm text-inputLabelAccent ${props.disabled ? 'cursor-not-allowed' : 'cursor-auto'}`}
          >
            {selectedValues.internationalCode?.areaCode
              ? `+${selectedValues.internationalCode?.areaCode}`
              : ''}
          </span>
          <input hidden name={props.name} value={JSON.stringify(selectedValues)} readOnly />

          <input
            ref={phoneRef}
            disabled={props.disabled}
            readOnly={props.readOnly}
            required={props.required}
            pattern={props.pattern}
            onChange={handleInputChange}
            className={`${props.disabled ? 'cursor-not-allowed' : 'cursor-auto'} flex h-11 w-full justify-center truncate bg-transparent py-2 font-text text-sm font-light outline-none md:text-base`}
            placeholder={props.placeholder}
            defaultValue={props.initialValue?.phone || ''}
          />
        </label>
        <div className="sticky left-0 top-0 z-10 w-full bg-bgColor py-1 pb-3">
          <input
            tabIndex={-1}
            className="flex h-8 w-full justify-center truncate bg-transparent py-2 font-text text-sm font-light outline-none md:text-base"
            type="text"
            placeholder="Search for countries"
            onChange={(e) => {
              setSearchInput(e.target.value);
            }}
            value={searchInput}
          />
          <div className="relative w-[97%] border-t border-grayAccent" />
        </div>
        <div className="flex h-36 w-full flex-col gap-2 overflow-auto bg-bgColor outline-none">
          {filteredCountries.length > 0 ? (
            filteredCountries.map((country, idx) => (
              <div
                className="flex cursor-pointer items-center gap-2 px-2 py-1 hover:bg-greyAccent"
                key={idx}
                onClick={() => handleListSelect(country)}
              >
                <span className="relative size-5">
                  <Image
                    src={`https://cdn.jsdelivr.net/gh/lipis/flag-icons/flags/4x3/${country?.code?.toLowerCase()}.svg`}
                    alt={`${country?.name}'s flag`}
                    sizes="(max-width: 768px) 40px,30px"
                    fill
                    className="object-contain"
                  />
                </span>
                <span className="text-sm text-textColor">{country.name}</span>
                <span className="text-xs text-inputLabelAccent">+ {`${country.dial_code}`}</span>
              </div>
            ))
          ) : (
            <span className="text-sm text-black/80">Sorry nothing matches your search</span>
          )}
        </div>
      </div>
      {/* Render the error message if available */}
      {messages.length > 0 &&
        messages.map((message, index) => (
          <span
            key={index}
            className={`order-3 mx-4 pt-1 text-sm text-red ${props.isClicked && messages.length > 0 ? 'block' : 'hidden'}`}
          >
            {message}
          </span>
        ))}
    </div>
  );
}

/**
 * CalendarInput component
 * Renders a date picker input with the FullCalendar component
 * @param {CalendarInputProps} props - The props for the CalendarInput component
 * @returns {JSX.Element} - The rendered CalendarInput component
 */
function CalendarInput(props: CalendarInputProps): JSX.Element {
  // State for the calendar visibility
  const [isOpen, setIsOpen] = useState(false);
  // State for the selected date
  const [selected, setSelected] = useState<Date | null>(
    props.initialValue ? new Date(props.initialValue) : null
  ); // Messages for validation errors
  const messages = props.validationObjects || [];
  // Ref for the calendar component
  const ref = useOutsideClick(isOpen, () => {
    setIsOpen(!isOpen);
  });
  // Ref for the calendar element
  const calendarRef = useRef<HTMLDivElement>(null);

  return (
    <div
      tabIndex={0}
      className="relative flex size-full w-full flex-col outline-none"
      onMouseDown={(e: any) => {
        // Prevent focus from moving to the calendar when clicking outside
        if (calendarRef.current && !calendarRef.current.contains(e.target)) {
          e.preventDefault();
        }
      }}
      onFocus={(e: any) => {
        // Open the calendar when the input is focused and not already open
        if (!isOpen && calendarRef.current && !calendarRef.current.contains(e.target)) {
          setIsOpen(true);
        }
      }}
      onBlur={(e: any) => {
        // Close the calendar when the input loses focus and the calendar is open
        if (isOpen && calendarRef.current && !calendarRef.current.contains(e.target)) {
          setIsOpen(false);
        }
      }}
      onClick={(e: any) => {
        // Toggle the calendar visibility when the input is clicked
        if (calendarRef.current && !calendarRef.current.contains(e.target)) {
          setIsOpen(!isOpen);
        }
      }}
      ref={ref}
    >
      {/* Render the label for the input */}
      <LabelText isClicked={props.isClicked} required={props.required} label={props.label} />
      {/* Hide the selected date value */}
      <input hidden value={selected ? selected?.toISOString() : ''} name={props.name} readOnly />

      <div
        className={`${
          props.isClicked && messages.length && 'border border-red'
        } relative z-10 flex size-full cursor-pointer flex-col items-start justify-start overflow-hidden rounded-3xl bg-bgColor px-6 shadow-inner outline-none duration-500 ${isOpen ? (props.withTime ? 'max-h-[36rem]' : 'max-h-[30rem]') : 'max-h-11'} `}
      >
        {/* Render the selected date and time */}
        <div className="relative flex h-11 w-full shrink-0 grow-0 items-center justify-center">
          <div className="flex w-full items-center justify-start gap-4 rounded-md">
            <div>
              {/* Render the calendar icon */}
              <CalendarIcon className="size-5 fill-black" />
            </div>
            <label
              className={`relative ${
                selected ? 'text-black' : 'text-inputLabelAccent'
              } flex cursor-pointer items-center font-text text-xs font-light md:text-base lg:text-sm`}
            >
              {selected
                ? moment(selected).format(props.withTime ? 'DD/MM/YYYY, HH:mm' : 'DD/MM/YYYY')
                : ''}
            </label>
          </div>
          {/* Render the button to toggle the calendar visibility */}
          <RoundedButton
            className="size-7"
            label={
              <ChevronIcon
                className={`size-3 ${isOpen ? '-rotate-90' : 'rotate-90'} duration-300 ease-in-out`}
              />
            }
          />
        </div>
        {/* Render the calendar component */}
        <div
          ref={calendarRef}
          className="relative flex size-full shrink-0 grow-0 flex-col justify-between gap-4 md:px-4"
        >
          <FullCalendar
            selected={selected}
            setSelected={setSelected}
            initialValue={props.initialValue}
            withPast={props.withPast}
            withFuture={props.withFuture}
            withTime={props.withTime}
          />
          {/* Render the done button */}
          <div className="flex w-full justify-end pb-10 pr-4">
            <div className="flex h-10 w-28 shrink-0 grow-0 items-center justify-center">
              <Button
                tabIndex={-1}
                onClick={(e) => {
                  e.preventDefault();
                  setIsOpen(false);
                }}
                label="Done"
              />
            </div>
          </div>
        </div>
      </div>
      {/* Render the error message if available */}
      {messages.length > 0 &&
        messages.map((message, index) => (
          <span
            key={index}
            className={`order-3 mx-4 pt-1 text-sm text-red ${props.isClicked && messages.length > 0 ? 'block' : 'hidden'}`}
          >
            {message}
          </span>
        ))}
    </div>
  );
}
/**
 * Renders a hidden input field.
 *
 * @param {Object} props - The component props.
 * @param {string} props.name - The name of the input field.
 * @param {string} props.value - The value of the input field.
 * @returns {JSX.Element} The rendered hidden input field.
 */
function HiddenInput({ name, value }: { name: string; value: string }): JSX.Element {
  return <input type="hidden" {...{ name, value }} />;
}

function Textarea(props: TextareaProps) {
  const messages = props.validationObjects || [];

  return (
    <div className="relative flex w-full flex-col">
      <textarea
        className={`peer order-2 flex w-full justify-center rounded-2xl bg-bgColor p-2 px-4 font-text text-sm font-light leading-[200%] shadow-inner outline-none outline-1 ${props.isClicked && 'invalid:border invalid:border-red'} ${props.disabled ? 'cursor-not-allowed' : 'cursor-auto'} md:text-base ${
          props.spaceBetween && 'leading-7'
        }`}
        required={props.required}
        name={props.name}
        disabled={props.disabled}
        placeholder={props.placeholder}
        defaultValue={props.defaultValue}
        rows={props.rows}
        wrap="hard"
      />
      <LabelText
        // className="peer"
        isClicked={props.isClicked}
        required={props.required}
        label={props.label}
      />
      {props.secondLabel && (
        <span
          className={cn(
            `absolute right-0 top-0 pb-2 font-text text-xs font-light text-inputLabelAccent md:text-base lg:text-sm`,
            props.className
          )}
        >
          {props.secondLabel}
        </span>
      )}
      {messages.length > 0 &&
        messages.map((message, index) => (
          <span
            key={index}
            className={`order-3 mx-4 hidden pt-1 text-sm text-red ${props.isClicked && 'peer-invalid:block'}`}
          >
            {message}
          </span>
        ))}
    </div>
  );
}

function SelectInput(props: SelectInputProps) {
  const router = useRouter();
  const query = useSearchParams();
  const pathname = usePathname();
  const [clicked, setClicked] = useState(false);

  const createQueryString = useCallback(
    (name: string, value: { toString: () => string }, allowMultiple: any) => {
      const params = new URLSearchParams(query);

      if (query?.getAll(name).includes(value.toString())) {
        params.delete(name, value.toString());
      } else if (props.isBool && query?.getAll(name).includes('true')) {
        params.delete(name);
      } else {
        if (allowMultiple) params.append(name, props.isBool ? 'true' : value.toString());
        else params.set(name, props?.isBool ? 'true' : value.toString());
      }
      params.delete('page');

      return params.toString();
    },
    [query, props.isBool]
  );
  const ref = useOutsideClick(clicked, () => {
    setClicked(!clicked);
  });
  const [searchInput, setSearchInput] = useState('');
  const filteredData =
    props.options
      ?.filter((val) =>
        // Filter for search input
        val.title.toLowerCase().includes(searchInput?.toLowerCase())
      )
      .sort((a, b) => a.title.localeCompare(b.title)) || [];

  return props.isMobile ? (
    <div>
      {props.withSearch ? (
        <div className="relative flex w-full flex-col rounded-3xl">
          <div className="sticky left-0 top-0 z-10 flex w-full min-w-64 flex-row items-center gap-2">
            <SearchIcon className="mb-1 size-8 stroke-gray-500 py-2" />
            <input
              className="flex h-8 w-full truncate bg-transparent py-2 text-sm font-extralight outline-none md:text-base"
              type="search"
              placeholder={props.searchPlaceholder}
              onChange={(e) => {
                setSearchInput(e.target.value);
              }}
              value={searchInput}
            />
          </div>
          <div className="relative ml-2 w-[95%] border-t border-grayUserActivity/50" />
          <div
            className={`${
              props.center && 'justify-center'
            } mb-6 mr-4 flex size-full flex-wrap items-center gap-5 px-2 py-4`}
          >
            {filteredData.map((option: any, idx: any) => (
              <div
                key={idx}
                onClick={() => {
                  if (props.isBool) {
                    router.push(
                      pathname +
                        '?' +
                        createQueryString(option.value, option.value, props.isMultiple)
                    );
                  } else {
                    router.push(
                      pathname +
                        '?' +
                        createQueryString(props.valueKey, option.value, props.isMultiple)
                    );
                  }
                }}
                className={`cursor-pointer rounded-full bg-bgColor px-4 py-2 font-text text-sm font-light outline-none md:text-base ${
                  query?.getAll(props.valueKey).includes(option?.value?.toString())
                    ? 'text-primary shadow-outer'
                    : 'text-textColor/30 shadow-inner'
                }`}
              >
                {option.title?.toString()?.replace('_', ' ')}
                {query?.getAll(props.valueKey).includes(option?.value?.toString()) && (
                  <CheckIcon className="float-right ml-2 mt-1 size-3 fill-primary" />
                )}
              </div>
            ))}
          </div>
        </div>
      ) : (
        <div
          className={`${
            props.center && 'justify-center'
          } mb-6 mr-4 flex size-full flex-wrap items-center gap-5 px-2 py-4`}
        >
          {props.options
            ?.sort((a, b) => {
              if (a.title < b.title) {
                return -1;
              }
              if (a.title > b.title) {
                return 1;
              }

              return 0;
            })
            .map((option: any, idx: any) => (
              <div
                key={idx}
                onClick={() => {
                  if (props.isBool) {
                    router.push(
                      pathname +
                        '?' +
                        createQueryString(option.value, option.value, props.isMultiple)
                    );
                  } else {
                    router.push(
                      pathname +
                        '?' +
                        createQueryString(props.valueKey, option.value, props.isMultiple)
                    );
                  }
                }}
                className={`cursor-pointer rounded-full bg-bgColor px-4 py-2 font-text text-sm font-light outline-none md:text-base ${
                  query?.getAll(props.valueKey).includes(option?.value?.toString())
                    ? 'text-primary shadow-outer'
                    : 'text-textColor/30 shadow-inner'
                }`}
              >
                {option.title?.toString()?.replace('_', ' ')}
                {query?.getAll(props.valueKey).includes(option?.value?.toString()) && (
                  <CheckIcon className="float-right ml-2 mt-1 size-3 fill-primary" />
                )}
              </div>
            ))}
        </div>
      )}
    </div>
  ) : (
    <div className="relative h-11 w-full" ref={ref}>
      <div
        className={`relative z-[2] w-full cursor-pointer overflow-hidden rounded-3xl bg-bgColor shadow-outer`}
      >
        <div
          onClick={() => {
            setClicked(!clicked);
          }}
          className="flex h-11 cursor-pointer items-center justify-between gap-2 px-3.5 py-1"
        >
          <div className="z-[-1] flex grow select-none items-center overflow-hidden truncate">
            {query?.getAll(props.valueKey).length > 0 ? (
              <div className="flex items-center justify-start gap-2">
                <LabelText
                  className="pb-0 leading-none"
                  label={`${props.title ? props.title + ': ' : ''}`}
                />
                <p className="font-text text-xs font-light">
                  {props?.options
                    ?.filter((option) => query?.getAll(props.valueKey).includes(option.value))
                    .map((option) => option.title)
                    .join(', ')}
                </p>
              </div>
            ) : (
              <LabelText
                className="pb-0 leading-none"
                label={props.title ? `${props.title}` : ''}
              />
            )}
          </div>
          <ChevronIcon
            className={`flex size-5 shrink-0 grow-0 rounded-full fill-black/40 p-1 ${clicked ? '-rotate-90' : 'rotate-90'} duration-300 ease-in-out`}
          />
        </div>
        <div
          className={`relative w-full overflow-auto ${clicked ? 'mb-6 mt-2 max-h-40' : 'max-h-0'} px-2 duration-500 ease-in-out`}
        >
          {props.options
            ?.sort((a, b) => {
              if (a.title < b.title) {
                return -1;
              }
              if (a.title > b.title) {
                return 1;
              }

              return 0;
            })
            .map((option: any, idx: any) => (
              <div
                className={`flex w-full items-center justify-between hover:bg-bgColorHover ${
                  !clicked ? 'opacity-0' : 'opacity-100'
                } h-8 cursor-pointer px-2 py-1 duration-700`}
                key={idx}
                onClick={() => {
                  if (props.isBool) {
                    router.push(
                      pathname +
                        '?' +
                        createQueryString(option.value, option.value, props.isMultiple)
                    );
                  } else {
                    router.push(
                      pathname +
                        '?' +
                        createQueryString(props.valueKey, option.value, props.isMultiple)
                    );
                  }
                }}
              >
                <p className="font-text text-[0.8rem] font-light">
                  {option.title?.toString()?.replace('_', ' ')}
                </p>
                <input
                  className="checked:accent-bgColor"
                  type="checkbox"
                  title="filter"
                  readOnly
                  checked={
                    props.isBool
                      ? query?.getAll(option?.value?.toString()).includes('true')
                      : query?.getAll(props.valueKey).includes(option?.value?.toString())
                  }
                />
              </div>
            ))}
        </div>
      </div>
    </div>
  );
}

function CommentInput(props: CommentInputProps) {
  const messages = props.validationObjects || [];
  const areaRef = useRef<HTMLTextAreaElement>(null);
  const [value, setValue] = useState(props.defaultValue ? props.defaultValue.comment : '');

  return (
    <>
      <div className="flex flex-col gap-1">
        <input
          className="peer"
          name={`${props.name}.commentedBy`}
          value={props.defaultValue?.commentedBy?._id}
          onChange={(e) => setValue(e.target.value)}
          hidden
          type="text"
        />
        <input
          className="peer"
          name={`${props.name}.commentedAt`}
          value={props.defaultValue?.commentedAt}
          onChange={(e) => setValue(e.target.value)}
          hidden
          type="text"
        />
        <input
          className="peer"
          required={props.required}
          name={props.name}
          value={value}
          onChange={(e) => setValue(e.target.value)}
          hidden
          type="text"
        />
        <div className="flex justify-between">
          <LabelText
            className="peer"
            isClicked={props.isClicked}
            required={props.required}
            label={`By ${props.defaultValue?.commentedBy?.firstName} ${props.defaultValue?.commentedBy?.lastName}`}
          />
          <LabelText
            label={`${moment.utc(props.defaultValue?.commentedAt).format('DD/MM/YYYY - HH:mm')}`}
          />
        </div>

        <textarea
          ref={areaRef}
          className={`peer flex w-full justify-center rounded-2xl bg-bgColor p-2 px-4 font-text text-sm font-light leading-[200%] shadow-inner outline-none outline-1 ${props.isClicked && 'peer-invalid:border peer-invalid:border-red'} ${props.disabled ? 'cursor-not-allowed' : 'cursor-auto'} md:text-base ${
            props.spaceBetween && 'leading-7'
          }`}
          disabled={props.disabled}
          onChange={(e) => setValue(e.target.value)}
          placeholder={props.placeholder}
          value={value}
          rows={2}
        />
        {messages.map((message, index) => (
          <span
            key={index}
            className={`mx-4 hidden text-sm text-red ${props.isClicked && 'peer-invalid:block'}`}
          >
            {message}
          </span>
        ))}
      </div>
      {/* <Textarea
          placeholder={'Write your comment'}
          rows={2}
          name={`comment${props.newCommentIndex}`}
          isClicked={props.isClicked}
          label={'New Comment'}
          defaultValue={''}
          validationObjects={messages[`comment${props.newCommentIndex}`]}
        />
      ) : (
        <div className="my-3 flex w-full items-center justify-center gap-1">
          <RoundedButton
            className={`mx-2 size-8 cursor-pointer`}
            label={<AddIcon className="size-3" />}
            onClick={() => {
              setAddComment(true);
            }}
          />
          <Text>Add new comment</Text>
        </div>
      )} */}
    </>
  );
}
const NestedCheckboxList = ({
  treeData,
  name,
  className,
  defaultValue,
  label,
  withAccordion
}: any) => {
  function getValueByKey(object: any, key: string) {
    const keys = key.split('.');
    let result = object;

    for (const k of keys) {
      result = result ? result[k] : undefined;
      if (result === undefined) {
        return false; // Return undefined if the key path does not exist in the object
      }
    }

    return result;
  }
  /**
   * Recursively transforms an object into a nested key-value structure, where the values are boolean flags indicating whether a given key is present in the default value.
   *
   * @param {any} obj - The object to transform.
   * @param {string} parentKey - The parent key of the current object.
   * @param {Object.<string, boolean>} [result={}] - The result object to store the transformed data.
   * @return {Object.<string, boolean>} - The transformed object.
   */
  const transformData = (obj: any, parentKey = '', result: { [key: string]: boolean } = {}) => {
    for (const key in obj) {
      const newKey = parentKey ? `${parentKey}.${key}` : key;
      if (Array.isArray(obj[key])) {
        obj[key].forEach((action: unknown) => {
          result[`${newKey}.${action}`] = getValueByKey(defaultValue, newKey)
            ? getValueByKey(defaultValue, newKey).includes(action)
            : false;
        });
      } else {
        transformData(obj[key], newKey, result);
      }
    }

    return result;
  };
  // the state of the expanded keys
  const [expandedKeys, setExpandedKeys] = useState<{ [key: string]: boolean }>({});
  // the state of the checked keys
  const [selectedKeys, setSelectedKeys] = useState(transformData(treeData));
  /**
   * A function that checks if a key is selected in the selectedKeys object.
   *
   * @param {string} key - The key to check for in the selectedKeys object.
   * @return {boolean} - Returns true if the key is selected, otherwise false.
   */
  const checkSelected = (key: string) => {
    for (const k in selectedKeys) {
      if (k.includes(key) && selectedKeys[k] === true) {
        return true;
      }
    }

    return false;
  };
  /**
   * A function that updates the selected keys based on the key and leaf status.
   * It follows this logic:
   *  - If the key is checked and is a leaf node, it checks all the parent keys.
   *  - If the key is unchecked, is a leaf node and all it's siblings are unchecked, it unchecks all the parent keys.
   *  - If the key is checked and it's not a leaf, it checks all the children keys.
   *  - If the key is unchecked and it's not a leaf, it unchecks all the children keys.
   *
   * @param {string} key - The key to be updated in the selected keys.
   * @param {boolean} isLeaf - Flag indicating if the key is a leaf node.
   */
  const setSelectedValues = (key: string, isLeaf = false) => {
    setSelectedKeys((prev) => {
      const obj = { ...prev };
      if (isLeaf) {
        obj[key] = !obj[key];
      } else {
        const flag = !checkSelected(key);
        for (const k in obj) {
          if (k.includes(key)) {
            obj[k] = flag;
          }
        }
      }

      return obj;
    });
  };
  /**
   * A function that filters and rebuilds the input object into a nested permissions object to set it in the states a hidden input value in order to be sent to the backend.
   *
   * @param {any} input - The input object to be filtered and rebuilt
   * @return {object} The nested permissions object after filtering and rebuilding
   */
  const filterAndRebuild = (input: any) => {
    const nestedPermissions = {};

    const addLine = (obj: any, keys: string[], value: string) => {
      const currentKey = keys.shift() as string;
      if (keys.length === 0) {
        if (!obj[currentKey]) {
          obj[currentKey] = [];
        }
        obj[currentKey].push(value);
      } else {
        if (!obj[currentKey]) {
          obj[currentKey] = {};
        }
        addLine(obj[currentKey], keys, value);
      }
    };

    for (const key in input) {
      if (input[key]) {
        const keys = key.split('.');
        const lastKey = keys.pop() as string;
        addLine(nestedPermissions, keys, lastKey);
      }
    }

    return nestedPermissions;
  };
  /**
   * Toggles the expansion state of a given key.
   *
   * @param {string} key - The key to toggle the expansion state for.
   * @return {void} This function does not return a value.
   */
  const toggleExpand = (key: string) => {
    setExpandedKeys((prev: { [key: string]: boolean }) => {
      const updatedKeys = { ...prev };
      updatedKeys[key] = !prev[key];

      return updatedKeys;
    });
  };
  useEffect(() => {
    setSelectedKeys(transformData(treeData));
  }, [defaultValue]);

  const renderList = (parentKey: string = '', data: any, level: number) => {
    return (
      <div style={{ paddingLeft: level * 20 + 'px' }}>
        {withAccordion && level === 0
          ? Object.keys(data).map((key) => (
              <div key={key} className="mb-4">
                <AccordionContainer
                  icon={<AddIcon className="mr-3 size-3" />}
                  isShadow
                  isOpen={expandedKeys[key]}
                  setIsOpen={() => toggleExpand(key)}
                  title={
                    <label className="ml-2 flex justify-center">
                      <span>
                        <input
                          type="checkbox"
                          checked={checkSelected(
                            `${parentKey === '' ? key : parentKey + '.' + key}`
                          )}
                          onChange={() =>
                            setSelectedValues(`${parentKey === '' ? key : parentKey + '.' + key}`)
                          }
                          className="text-bgColor accent-bgColor checked:accent-bgColor"
                        />
                        <span className={`${parentKey === '' ? 'font-semibold' : ''} ml-3`}>
                          {capitalize(key)}
                        </span>
                      </span>
                    </label>
                  }
                >
                  <div key={key}>
                    <div
                      className={`duration-500 ${
                        expandedKeys[key] &&
                        typeof data[key] === 'object' &&
                        !Array.isArray(data[key])
                          ? 'max-h-screen'
                          : 'max-h-0'
                      }`}
                    >
                      {typeof data === 'object' && renderList(key, data[key], level + 1)}
                    </div>
                    {Array.isArray(data[key]) &&
                      expandedKeys[key] &&
                      data[key].map((item: unknown, idx: number) => (
                        <div key={idx} style={{ paddingLeft: '20px' }}>
                          <label>
                            <input
                              type="checkbox"
                              className="text-bgColor accent-bgColor checked:accent-bgColor"
                              checked={checkSelected(
                                `${parentKey === '' ? key : parentKey + '.' + key}.${item}`
                              )}
                              onChange={() =>
                                setSelectedValues(
                                  `${parentKey === '' ? key : parentKey + '.' + key}.${item}`,
                                  true
                                )
                              }
                            />
                            <span className="ml-3">{removeCamelCase(item as string)}</span>
                          </label>
                        </div>
                      ))}
                  </div>
                </AccordionContainer>
              </div>
            ))
          : Object.keys(data).map((key) => (
              <div key={key}>
                <label className="flex justify-between">
                  <span>
                    <input
                      type="checkbox"
                      className="text-bgColor accent-bgColor checked:accent-bgColor"
                      checked={checkSelected(`${parentKey === '' ? key : parentKey + '.' + key}`)}
                      onChange={() =>
                        setSelectedValues(`${parentKey === '' ? key : parentKey + '.' + key}`)
                      }
                    />
                    <span className={`${parentKey === '' ? 'font-semibold' : ''} ml-3`}>
                      {capitalize(key)}
                    </span>
                  </span>
                  <span>
                    <button
                      className="mr-3 text-3xl"
                      type="button"
                      onClick={() => toggleExpand(key)}
                    >
                      {expandedKeys[key] ? '-' : '+'}
                    </button>
                  </span>
                </label>
                {expandedKeys[key] &&
                  typeof data[key] === 'object' &&
                  !Array.isArray(data[key]) &&
                  renderList(key, data[key], level + 1)}

                {Array.isArray(data[key]) &&
                  expandedKeys[key] &&
                  data[key].map((item: unknown, idx: number) => (
                    <div key={idx} style={{ paddingLeft: '20px' }} className="mb-2">
                      <label>
                        <input
                          type="checkbox"
                          className="checked:accent-bgColor"
                          checked={checkSelected(
                            `${parentKey === '' ? key : parentKey + '.' + key}.${item}`
                          )}
                          onChange={() =>
                            setSelectedValues(
                              `${parentKey === '' ? key : parentKey + '.' + key}.${item}`,
                              true
                            )
                          }
                        />
                        <span className="ml-3">{removeCamelCase(item as string)}</span>
                      </label>
                    </div>
                  ))}
              </div>
            ))}
      </div>
    );
  };

  return (
    <div className={className}>
      {label && <LabelText label={label} />}
      <div className="mt-2">{renderList('', treeData, 0)}</div>
      <input type="hidden" name={name} value={JSON.stringify(filterAndRebuild(selectedKeys))} />
    </div>
  );
};
function RatingInput({ label, name, defaultValue }: any) {
  const [hovered, setHovered] = useState(0);
  const [rating, setRating] = useState(defaultValue || 0);

  const handleMouseEnter = (index: number) => {
    setHovered(index);
  };

  const handleMouseLeave = () => {
    setHovered(0);
  };

  const handleClick = (index: number) => {
    setRating(index);
  };

  return (
    <div className="flex justify-between space-y-1">
      <LabelText label={`${label} :`} />
      <div className="flex">
        {[1, 2, 3, 4, 5].map((star, index) => {
          return (
            <div
              key={index}
              onMouseEnter={() => handleMouseEnter(star)}
              onMouseLeave={handleMouseLeave}
              onClick={() => handleClick(star)}
              className={`cursor-pointer px-0.5`}
            >
              <StarIcon
                className={`size-5 duration-200 ease-in-out ${
                  hovered >= star || rating >= star
                    ? 'fill-primary stroke-primary'
                    : 'fill-transparent stroke-black'
                }`}
              />
            </div>
          );
        })}
        <input type="hidden" value={rating} name={name} />
      </div>
    </div>
  );
}
function ExtendableInput(props: any) {
  const [config, setConfig] = useState(props.config || []);
  const InputComponent: ComponentType<any> = getInputComponent(props.inputType);

  const onclick = () => {
    setConfig([
      ...config,
      { type: props.inputType, name: `${props.name}_${config.length}`, required: props.required }
    ]);
  };

  return (
    <>
      <div className={`flex h-fit flex-row items-center`}>
        <LabelText className="pb-0" label={props.label} required={props.required} />

        <RoundedButton
          onClick={onclick}
          className="mx-2 size-8 cursor-pointer"
          label={<AddIcon className="size-3" />}
        />
      </div>
      <div className="flex flex-wrap gap-2">
        {config.map((config: any, index: number) => {
          return (
            <div key={index} className="relative w-full lg:w-[calc(50%-0.5rem)]">
              <InputComponent
                {...config}
                isClicked={props.isClicked}
                validationObjects={props.validationObjects[config.name]}
              />
            </div>
          );
        })}
      </div>
    </>
  );
}
function AddFieldInput(props: any) {
  const [addButtonIsClicked, setAddButtonIsClicked] = useState(false);
  const searchParams = useSearchParams();
  const router = useRouter();
  const pathname = usePathname();
  useEffect(() => {
    if (searchParams.has('refresh')) {
      const params = new URLSearchParams(searchParams);
      setAddButtonIsClicked(false);
      params.delete('refresh');
      router.push(pathname + '?' + params.toString());
    }
  }, [searchParams]);
  const savedValues = props.config?.fields?.slice(0, props.config.fields.length - 1)[0] || [];
  const [openStates, setOpenStates] = useState(savedValues.map(() => false) || []);

  // Function to toggle the accordion open/close state
  const toggleAccordion = (index: number) => {
    setOpenStates((prevStates: boolean[]) => {
      return prevStates.map((isOpen: boolean, i: number) => (i === index ? !isOpen : isOpen));
    });
  };

  return (
    <>
      {props.config.fields.length > 1 &&
        (props.config.options?.withAccordion ? (
          props.config.fields[0].map((item: any, index: any) => (
            <div key={index} className="my-3">
              <AccordionContainer
                isOpen={openStates[index]}
                setIsOpen={() => toggleAccordion(index)}
                key={index}
                isShadow
                title={item.title}
              >
                <DynamicInputs
                  inputConfig={item.config}
                  errors={props.validationObjects}
                  isClicked={props.isClicked}
                />
              </AccordionContainer>
            </div>
          ))
        ) : (
          <div className="flex flex-col gap-4">
            {props.config.fields
              .slice(0, props.config.fields.length - 1)
              .map((item: any, index: any) => {
                return (
                  <DynamicInputs key={index} inputConfig={item} errors={props.validationObjects} />
                );
              })}
          </div>
        ))}
      {!addButtonIsClicked ? (
        <div className="my-5 flex w-full items-center justify-center gap-1">
          <RoundedButton
            className={`mx-2 size-8 cursor-pointer`}
            label={<AddIcon className="size-3" />}
            onClick={() => {
              setAddButtonIsClicked(true);
              setOpenStates((prev: any) => [...prev, false]);
            }}
          />
          <Text>{props.addButtonLabel}</Text>
        </div>
      ) : (
        <div className="my-5 flex flex-col gap-1">
          <div className="my-3">
            <Category>{props.title}</Category>
          </div>
          <DynamicInputs
            isClicked={props.isClicked}
            inputConfig={props.config.fields[props.config.fields.length - 1]}
            errors={props.validationObjects}
          />
        </div>
      )}
    </>
  );
}

function DynamicCitiesInput(props: DynamicCitiesProps) {
  const [countryIndex, setCountryIndex] = useState<number>(0);

  const [countryInput, setCountryInput] = useState<string>('');
  const [isCountrySelected, setIsCountrySelected] = useState<boolean>(false);
  const [countryInvalid, setCountryInvalid] = useState<boolean>(true);

  const [citiesInput, setCitiesInput] = useState<string>('');
  const [isCitiesSelected, setIsCitiesSelected] = useState<boolean>(false);
  const [citiesInvalid, setCitiesInvalid] = useState<boolean>(true);

  const [selectedCountryValue, setSelectedCountryValue] = useState<string | undefined>(
    props.defaultValue?.country || ''
  );

  const [selectedCitiesValue, setSelectedCitiesValue] = useState<string[]>(
    props.defaultValue?.cities || []
  );
  const [locations, setLocations] = useState<any[]>([
    { country: selectedCountryValue, cities: selectedCitiesValue }
  ]);

  const filteredCountriesData = props.options?.filter((val: any) =>
    val.toLowerCase().includes(countryInput.toLowerCase())
  );

  const filteredCitiesData = getCitiesFromCountry(
    locations[countryIndex].country ? locations[countryIndex].country : ''
  )?.filter((val: any) => val.toLowerCase().includes(citiesInput.toLowerCase()));

  const handleCountryListSelect = (option: any) => {
    setSelectedCountryValue(
      textContent(
        <div className="flex w-full items-center justify-start gap-3 overflow-hidden text-xs text-black">
          <span className="font-light capitalize">{option}</span>
        </div>
      )
    );
    setCountryInvalid(false);
    setSelectedCitiesValue([]);
    setLocations((prevLocations: any[]) => {
      const newLocations = [...prevLocations];
      newLocations[countryIndex] = { country: option, cities: [] };

      return newLocations;
    });
  };

  function textContent(elem: React.JSX.Element): string {
    if (!elem) {
      return '';
    }
    if (typeof elem === 'string') {
      return elem;
    }
    const children = elem.props && elem.props.children;
    if (children instanceof Array) {
      return children.map(textContent).join('');
    }

    return textContent(children);
  }

  const chooseCountryData = (e: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
    setCountryInput(e.currentTarget.textContent || '');
    setIsCountrySelected(true);
  };

  const chooseCitiesData = (e: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
    setCitiesInput(e.currentTarget.textContent || '');
    setIsCitiesSelected(true);
  };
  const handleRemoveSelectedCity = (valueToRemove: any) => {
    setSelectedCitiesValue((prevValues: any) =>
      prevValues.filter((value: any) => value !== valueToRemove)
    );
    setLocations((prevLocations: any[]) => {
      const newLocations = [...prevLocations];
      newLocations[countryIndex].cities = newLocations[countryIndex].cities.filter(
        (value: any) => value !== valueToRemove
      );

      return newLocations;
    });
  };
  const handleCitiesListSelect = (option: string) => {
    setCitiesInvalid(false);
    setSelectedCitiesValue((prevValues: string[]) => {
      if (prevValues.some((value: string) => value === option)) {
        return prevValues.filter((value: string) => value !== option);
      } else {
        return [...prevValues, option];
      }
    });
    setLocations((prevLocations: any[]) => {
      const newLocations = [...prevLocations];
      if (!newLocations[countryIndex].cities.includes(option))
        newLocations[countryIndex].cities.push(option);

      return newLocations;
    });
    setCitiesInput('');
  };
  // const messages = props.validationObjects || [];

  return (
    <>
      {locations.length > 1 && (
        <>
          <Category>Work cities</Category>

          {locations.slice(0, locations.length - 1).map((country: any, index: any) => (
            <div className="flex w-full items-center justify-start gap-1 px-2" key={index}>
              <span className="w-full overflow-hidden font-normal">
                <span> {`${country.country}: `} </span>
                {country.cities.map((city: string, idx: any) => (
                  <span key={idx} className="w-fit overflow-hidden rounded-full font-light">
                    {idx === country.cities.length - 1 ? city : `${city}, `}
                  </span>
                ))}
              </span>
              <span
                className="cursor-pointer"
                onClick={() => {
                  setLocations([...locations.slice(0, index), ...locations.slice(index + 1)]);
                  setCountryIndex((countryIndex || 0) - 1);
                }}
              >
                <TrashIcon className="size-5 fill-black" />
              </span>
            </div>
          ))}
          <div className="my-5 flex h-1 w-full items-center justify-center">
            <div className="h-[2px] w-[90%] bg-grayAccent line-through"></div>
          </div>
        </>
      )}
      {/* COUNTRIES */}
      <div className="flex flex-col">
        <LabelText isClicked={props.isClicked} label="Country">
          {props.label}
        </LabelText>
        <div
          className={`relative flex size-full flex-col truncate rounded-3xl bg-bgColor shadow-inner duration-200`}
        >
          {props.IconOne && (
            <span className="absolute left-6 top-3 flex items-center justify-center pb-1">
              {props.IconOne}
            </span>
          )}
          <input
            className={`${props.IconOne ? 'pl-14' : 'pl-6'} flex h-11 w-full justify-center rounded-full bg-transparent px-6 py-2 font-text text-sm font-light outline-none duration-300 ease-in-out md:text-base`}
            value={selectedCountryValue}
            required={props.required}
            name="country"
            placeholder={
              props.value && Object.keys(props.value).length !== 0 ? '' : props.placeholder
            }
            onChange={(e) => {
              setCountryInput(e.target.value);
              setIsCountrySelected(false);
              setCountryInvalid(true);
              setSelectedCountryValue(undefined);
              if (props.handleChange) props.handleChange(e.target.value);
            }}
          />

          {!isCountrySelected && (
            <div
              className={`flex flex-col justify-start duration-300 ${
                props.IconOne ? 'px-10' : 'px-2'
              } divide-y divide-gray-400/30 overflow-auto ${
                countryInput?.length > 0 ? 'max-h-52' : 'max-h-0'
              }`}
            >
              {filteredCountriesData?.length > 0 ? (
                filteredCountriesData?.map((option, idx) => (
                  <div
                    className={`flex w-full items-center justify-start gap-20 px-4 py-5 hover:bg-bgColorHover ${
                      countryInput?.length === 0 ? 'h-0 p-0 opacity-0' : 'h-8 py-1'
                    } cursor-pointer duration-200`}
                    key={idx}
                    onClick={(e: any) => {
                      chooseCountryData(e);
                      handleCountryListSelect(option);
                    }}
                  >
                    {props.displayFields ? (
                      <div className="flex w-full items-center justify-start gap-3 overflow-hidden text-xs text-black">
                        <span className="font-light capitalize">
                          {props.displayFields.map((field: string) => `${option[field]} `)}
                        </span>
                      </div>
                    ) : (
                      <div className="flex w-full items-center justify-start gap-3 overflow-hidden text-xs text-black">
                        <span className="font-light capitalize">{option}</span>
                      </div>
                    )}
                  </div>
                ))
              ) : (
                <div className="relative flex flex-col items-center justify-center whitespace-normal py-4">
                  <span
                    className={`${
                      props.HandleNoMatch ? '' : 'w-full'
                    } flex items-center justify-start gap-20 px-4 py-5 text-inputLabelAccent ${
                      countryInput?.length === 0 ? 'h-0 p-0 opacity-0' : 'h-11 py-4'
                    } cursor-pointer duration-200`}
                  >
                    Sorry, there is nothing that matches your search
                  </span>
                  {props.HandleNoMatch && (
                    <div className="flex w-full justify-center py-4">{props.HandleNoMatch}</div>
                  )}
                </div>
              )}
            </div>
          )}
        </div>
      </div>
      {/* CITIES */}
      <div className="mt-2 flex flex-col">
        <div className="flex flex-wrap">
          <LabelText isClicked={props.isClicked} label="Cities" />
          {selectedCitiesValue.map((city: string, index: any) => (
            <span key={index} className="mx-2 mb-2 w-fit overflow-hidden rounded-full">
              <div
                onClick={(e) => {
                  e.stopPropagation();
                }}
                className="relative flex h-5 w-fit items-center justify-center gap-3 rounded-xl bg-primary/15 p-2 text-sm"
              >
                {city}
                <svg
                  onClick={() => {
                    handleRemoveSelectedCity(city);
                  }}
                  fill="#2c2b2b"
                  height="12px"
                  width="12px"
                  version="1.1"
                  id="Capa_1"
                  viewBox="0 0 460.775 460.775"
                  stroke="#2c2b2b"
                  className="rounded-full fill-black/30 hover:fill-black/50"
                >
                  <g id="SVGRepo_bgCarrier" />
                  <g id="SVGRepo_iconCarrier">
                    <path d="M285.08,230.397L456.218,59.27c6.076-6.077,6.076-15.911,0-21.986L423.511,4.565c-2.913-2.911-6.866-4.55-10.992-4.55 c-4.127,0-8.08,1.639-10.993,4.55l-171.138,171.14L59.25,4.565c-2.913-2.911-6.866-4.55-10.993-4.55 c-4.126,0-8.08,1.639-10.992,4.55L4.558,37.284c-6.077,6.075-6.077,15.909,0,21.986l171.138,171.128L4.575,401.505 c-6.074,6.077-6.074,15.911,0,21.986l32.709,32.719c2.911,2.911,6.865,4.55,10.992,4.55c4.127,0,8.08-1.639,10.994-4.55 l171.117-171.12l171.118,171.12c2.913,2.911,6.866,4.55,10.993,4.55c4.128,0,8.081-1.639,10.992-4.55l32.709-32.719 c6.074-6.075,6.074-15.909,0-21.986L285.08,230.397z"></path>{' '}
                  </g>
                </svg>
              </div>
            </span>
          ))}
        </div>
        <div
          className={`relative flex size-full flex-col truncate rounded-3xl bg-bgColor shadow-inner duration-200`}
        >
          {props.IconOne && (
            <span className="absolute left-6 top-3 flex items-center justify-center pb-1">
              {props.IconOne}
            </span>
          )}
          <input
            className={`${props.IconOne ? 'pl-14' : 'pl-6'} flex h-11 w-full justify-center rounded-full bg-transparent px-6 py-2 font-text text-sm font-light outline-none duration-300 ease-in-out md:text-base`}
            value={citiesInput}
            required={props.required}
            name="cities"
            placeholder={
              props.value && Object.keys(props.value).length !== 0 ? '' : props.placeholder
            }
            onChange={(e) => {
              setCitiesInput(e.target.value);
              setIsCitiesSelected(false);
              setCitiesInvalid(true);
              if (props.handleChange) props.handleChange(e.target.value);
            }}
          />

          {!isCitiesSelected && (
            <div
              className={`flex flex-col justify-start duration-300 ${
                props.IconOne ? 'px-10' : 'px-2'
              } divide-y divide-gray-400/30 overflow-auto ${
                citiesInput?.length > 0 ? 'max-h-52' : 'max-h-0'
              }`}
            >
              {filteredCitiesData?.length > 0 ? (
                filteredCitiesData?.map((option, idx) => (
                  <div
                    className={`flex w-full items-center justify-start gap-20 px-4 py-5 hover:bg-bgColorHover ${
                      citiesInput?.length === 0 ? 'h-0 p-0 opacity-0' : 'h-8 py-1'
                    } cursor-pointer duration-200`}
                    key={idx}
                    onClick={(e: any) => {
                      chooseCitiesData(e);
                      handleCitiesListSelect(option);
                    }}
                  >
                    <div className="flex w-full items-center justify-start gap-3 overflow-hidden text-xs text-black">
                      <span className="font-light capitalize">{option}</span>
                    </div>
                  </div>
                ))
              ) : (
                <div
                  className={`flex w-full items-center justify-start gap-20 px-4 py-5 hover:bg-bgColorHover ${
                    citiesInput?.length === 0 ? 'h-0 p-0 opacity-0' : 'h-8 py-1'
                  } cursor-pointer duration-200`}
                  onClick={(e: any) => {
                    chooseCitiesData(e);
                    handleCitiesListSelect(citiesInput);
                  }}
                >
                  <div className="flex w-full items-center justify-start gap-3 overflow-hidden text-xs text-black">
                    <span className="font-light capitalize">{citiesInput}</span>
                  </div>
                </div>
              )}
            </div>
          )}
        </div>
        <div className="mt-2 flex flex-wrap gap-2"></div>
      </div>
      <input type="hidden" name={props.name} value={JSON.stringify(locations)} />
      {props.withAddButton && (
        <div className="my-3 flex w-full items-center justify-center gap-1">
          <RoundedButton
            className={`mx-2 size-8 ${!isCountrySelected || !isCitiesSelected || citiesInvalid || countryInvalid || !(selectedCountryValue && !locations.includes(selectedCountryValue) && selectedCitiesValue.length > 0) ? 'cursor-not-allowed' : 'cursor-pointer'}`}
            label={<AddIcon className="size-3" />}
            onClick={() => {
              if (
                selectedCountryValue &&
                !locations.includes(selectedCountryValue) &&
                selectedCitiesValue.length > 0
              ) {
                setLocations([...locations, { country: {}, cities: [] }]);
                setCountryIndex((countryIndex || 0) + 1);
                setCountryInput('');
                setSelectedCountryValue('');
                setIsCountrySelected(false);
                setCitiesInput('');
                setSelectedCitiesValue([]);
                setIsCitiesSelected(false);
              }
            }}
          />
          <Text>Add selected locations</Text>
        </div>
      )}
    </>
  );
  //TODO: Add the same logic for countries
}

type ExtendableFormProps = {
  config: any[];
  isClicked: boolean;
  validationObjects?: { [key: string]: string };
  defaultValue?: any;
  title: string;
  addButtonLabel: string;
  accordionTitle: string;
};

function MultiEntryInput(props: ExtendableFormProps) {
  const [formCount, setFormCount] = useState(props?.defaultValue?.length + 1 || 1);
  const [openStates, setOpenStates] = useState(Array(formCount - 1).fill(false) || []);
  const [removedIndexes, setRemovedIndexes] = useState<number[]>([]);
  let currentIndex = 0;

  const addForm = () => {
    setFormCount((prevCount: number) => prevCount + 1);
    setOpenStates((prevStates: boolean[]) => [
      ...prevStates,
      props?.defaultValue?.length ? true : false
    ]);
  };

  const toggleAccordion = (index: number) => {
    setOpenStates((prevStates: boolean[]) => {
      return prevStates.map((isOpen: boolean, i: number) => (i === index ? !isOpen : isOpen));
    });
  };

  const removeForm = (index: number) => {
    setRemovedIndexes((prevIndexes: number[]) => [...prevIndexes, index]);
  };

  return (
    <div className="relative flex w-full flex-col gap-10">
      {/* The deleted entries to not be displayed */}
      {Array.from({ length: formCount }).map((_, index) => {
        if (removedIndexes.includes(index)) {
          return null;
        }
        currentIndex += 1;

        return (
          <div className={`flex w-full flex-col gap-4`} key={`input_${index}`}>
            {index !== formCount - 1 ? (
              // The old entries inside the accordion
              <div
                className={`size-full rounded-[2rem] ${props?.validationObjects && props?.validationObjects[index]?.length ? 'border border-red' : ' '} bg-bgColor px-4 py-2 font-text shadow-inner`}
              >
                <div
                  onClick={() => toggleAccordion(index)}
                  className={`-z-10 flex h-10 w-full cursor-pointer items-center justify-between px-4`}
                >
                  <span className="text-base font-normal uppercase">{`${props.accordionTitle} ${currentIndex}`}</span>
                  <div className="relative flex items-center gap-4">
                    <div
                      className="relative z-50 w-full cursor-pointer rounded-full p-1.5 duration-300 ease-in-out hover:scale-105"
                      onClick={(e) => {
                        e.stopPropagation();
                        removeForm(index);
                      }}
                    >
                      <TrashIcon className="flex size-6 shrink-0 grow-0 cursor-pointer fill-black" />
                    </div>
                    {openStates[index] ? (
                      <MinusIcon className="flex size-3 shrink-0 grow-0 fill-black" />
                    ) : (
                      <PlusIcon className="flex size-3 shrink-0 grow-0 fill-black" />
                    )}
                  </div>
                </div>
                <div
                  className={`flex flex-col gap-4 overflow-hidden px-4 duration-[450ms] ease-in-out ${
                    openStates[index] ? 'max-h-screen py-6' : 'max-h-0'
                  }`}
                >
                  {props.config.map((item: any, idx: any) => {
                    const InputComponent: ComponentType<any> = getInputComponent(item.type);

                    return (
                      <InputComponent
                        {...item}
                        key={idx}
                        validationObjects={
                          props.validationObjects
                            ? props.validationObjects[
                                `${item.parents.join('_')}_${index}_${item.name}`
                              ]
                            : []
                        }
                        isClicked={props.isClicked}
                        defaultValue={item.defaultValue && item.defaultValue[index]}
                        name={`${item.parents.join('_')}_${index}_${item.name}`}
                        value={item.type === 'file' && item.value && item.value[index]}
                      />
                    );
                  })}
                </div>
              </div>
            ) : props?.defaultValue?.length ? null : (
              <>
                {/* // The new entry form */}
                {/* <div
                  className={`${formCount > 1 ? 'block' : 'hidden'} mx-auto mb-4 h-px w-1/2 bg-black`}
                /> */}
                <div className={`size-full bg-bgColor px-4 py-2 font-text`}>
                  <div
                    className={`${formCount > 1 ? 'pb-6' : 'hidden'} cursor-default font-text text-sm font-medium uppercase md:text-base`}
                  >
                    {props.title}
                  </div>
                  <div className="relative flex flex-col gap-4">
                    {props.config.map((item: any, idx: any) => {
                      const InputComponent: ComponentType<any> = getInputComponent(item.type);

                      return (
                        <InputComponent
                          {...item}
                          key={idx}
                          validationObjects={
                            props.validationObjects
                              ? props.validationObjects[
                                  `${item.parents.join('_')}_${index}_${item.name}`
                                ]
                              : []
                          }
                          isClicked={props.isClicked}
                          name={`${item.parents.join('_')}_${index}_${item.name}`}
                        />
                      );
                    })}
                  </div>
                </div>
              </>
            )}
          </div>
        );
      })}
      <div className="flex w-full items-center justify-center gap-3">
        <RoundedButton
          className={`size-8 cursor-pointer`}
          label={<AddIcon className="size-3" />}
          onClick={() => {
            addForm();
          }}
        />
        <Text>{props.addButtonLabel}</Text>
      </div>
    </div>
  );
}

function SelectableAccordionInput(props: any) {
  const [openStates, setOpenStates] = useState(Array(props.config.length).fill(false) || []);
  const [checkedStates, setCheckedStates] = useState(
    props?.defaultValue || Array(props.config.length).fill(false) || []
  );
  const toggleAccordion = (index: number) => {
    setOpenStates((prevStates: boolean[]) => {
      return prevStates.map((isOpen: boolean, i: number) => (i === index ? !isOpen : isOpen));
    });
  };
  const toggleCheckbox = (index: number) => {
    setCheckedStates((prevStates: boolean[]) => {
      return prevStates.map((isOpen: boolean, i: number) => (i === index ? !isOpen : isOpen));
    });
  };

  return (
    <div className="relative flex w-full flex-col gap-8">
      {props.config.map((fields: any, index: any) => (
        <div
          key={index}
          className={`size-full rounded-[2rem] ${props?.validationObjects && props?.validationObjects[index]?.length ? 'border border-red' : ' '} bg-bgColor px-4 py-2 font-text shadow-inner`}
        >
          <div
            onClick={() => toggleAccordion(index)}
            className={`flex h-10 w-full cursor-pointer items-center justify-between px-4`}
          >
            <div
              className={`flex ${fields?.icon ? 'items-end' : 'items-center'} justify-center gap-2`}
            >
              {fields?.icon}
              <span className="text-base font-normal uppercase">{`${fields?.accordionTitle}`}</span>
            </div>
            <div className="relative flex items-center gap-4">
              <div
                className={`relative z-[1] flex size-4 cursor-pointer items-center justify-center rounded border duration-300 ease-in-out ${checkedStates[index] ? 'border-primary bg-primary' : 'border-black/30 bg-bgColor'}`}
                onClick={(e) => {
                  e.stopPropagation();
                  toggleCheckbox(index);
                }}
              >
                {checkedStates[index] && <CheckIcon className="fill-white" />}
              </div>
              {/* <div
                className="relative z-50 w-full cursor-pointer rounded-full p-1.5 duration-300 ease-in-out hover:scale-105"
                onClick={(e) => {
                  e.stopPropagation();
                  toggleCheckbox(index);
                }}
              >
                <TrashIcon className="flex size-6 shrink-0 grow-0 cursor-pointer fill-black" />
              </div> */}
              {openStates[index] ? (
                <MinusIcon className="flex size-3 shrink-0 grow-0 fill-black" />
              ) : (
                <PlusIcon className="flex size-3 shrink-0 grow-0 fill-black" />
              )}
            </div>
          </div>
          <div
            className={`flex flex-col gap-4 overflow-hidden px-4 duration-[450ms] ease-in-out ${
              openStates[index] ? 'max-h-screen py-6' : 'max-h-0'
            }`}
          >
            {/* {fields.name} */}
            {fields?.config?.map((field: any, idx: any) => {
              const InputComponent: ComponentType<any> = getInputComponent(field.type);

              return (
                <InputComponent
                  {...field}
                  key={idx}
                  validationObjects={
                    props.validationObjects ? props.validationObjects[`${field.name}`] : []
                  }
                  value={field.type === 'hidden' && !checkedStates[index] ? undefined : field.value}
                  isClicked={props.isClicked}
                  defaultValue={field.defaultValue}
                  name={field.name}
                />
              );
            })}
          </div>
        </div>
      ))}
      {/* <input type="hidden" name={props.name} value={checkedStates} /> */}
    </div>
  );
}
// const SliderInput = ({ initialArray, initialValue, name, label }) => {
//   const [percentage, setPercentage] = useState(30);
//   const [angle, setAngle] = useState(0);
//   const [value, setValue] = useState(initialValue);
//   const sliderRef = useRef(null);
//   const segments = initialArray.length;
//   const newOffset = 90;
//   const angleIncrement = 360 / segments;

//   useEffect(() => {
//     const initialValueIndex = initialArray.indexOf(initialValue);
//     if (initialValueIndex !== -1) {
//       const initialAngle = (initialValueIndex * angleIncrement + newOffset) % 360;
//       const initialPercentage = (initialValueIndex * 100) / (segments - 1);
//       setAngle(initialAngle);
//       setPercentage(initialPercentage);
//     }
//   }, [initialArray, initialValue, segments, angleIncrement, newOffset]);

//   const handleDashClick = (index) => {
//     const newAngle = (index * angleIncrement) % 360;
//     setAngle(newAngle);
//     const newPercentage = (index * 100) / (segments - 1);
//     setPercentage(newPercentage);
//     setValue(initialArray[index]);
//   };

//   const handleCircleClick = (e) => {
//     if (!sliderRef.current) return;

//     const rect = sliderRef.current.getBoundingClientRect();
//     const centerX = rect.left + rect.width / 2;
//     const centerY = rect.top + rect.height / 2;
//     const mouseX = e.clientX;
//     const mouseY = e.clientY;

//     const deltaX = mouseX - centerX;
//     const deltaY = mouseY - centerY;
//     let clickAngle = Math.atan2(deltaY, deltaX) * (180 / Math.PI);
//     if (clickAngle < 0) {
//       clickAngle += 360;
//     }

//     clickAngle = (clickAngle + 360) % 360;
//     const closestDashIndex = Math.round(clickAngle / angleIncrement) % segments;
//     handleDashClick(closestDashIndex);
//   };

//   const dashDistance = 150;

//   const dashes = Array.from({ length: segments }).map((_, index) => {
//     const dashAngle = ((index * angleIncrement) % 360) + newOffset;
//     const dashPosition = {
//       transform: `rotate(${dashAngle}deg) translate(${dashDistance}px)`,
//       transformOrigin: 'center'
//     };

//     const isActive = Math.round(((angle + 360) % 360) / angleIncrement) === index + 1;

//     return (
//       <div key={index} className="absolute" style={{ transformOrigin: 'center' }}>
//         <div
//           className={`absolute h-1 w-3 rounded-full ${isActive ? 'bg-primary' : 'bg-secondary'}`}
//           style={dashPosition}
//           onClick={() => handleDashClick(index)}
//         />
//       </div>
//     );
//   });

//   const radius = 92;
//   const circumference = 2 * Math.PI * radius;
//   const offset = circumference - (percentage / 100) * (circumference - circumference / segments);

//   return (
//     <div className="flex flex-col items-center justify-center py-6">
//       <LabelText className="mb-6" label={label} />
//       <input readOnly hidden name={name} value={value} />
//       <div
//         ref={sliderRef}
//         className="relative flex size-64 items-center justify-center rounded-full bg-bgColor shadow-inner"
//         onClick={handleCircleClick}
//       >
//         <svg className="absolute size-full">
//           <circle
//             className="text-primary"
//             strokeWidth="35"
//             stroke="currentColor"
//             fill="transparent"
//             r={radius - 4}
//             cx="50%"
//             cy="50%"
//             strokeDasharray={circumference}
//             strokeDashoffset={offset}
//             style={{ transition: 'stroke-dashoffset 0.40s' }}
//           />
//         </svg>
//         <div className="flex size-40 items-center justify-center rounded-full shadow-outer">
//           <p>{Math.round(percentage)}%</p>
//         </div>
//         {dashes}
//       </div>
//     </div>
//   );
// };

function SearchInput() {
  const pathname = usePathname();
  const router = useRouter();

  const queryParams = useSearchParams();
  const [inputValue, setInputValue] = useState<string>(queryParams.get('search') || '');

  const createQueryString = useCallback(
    (name: string, value: string) => {
      const params = new URLSearchParams(queryParams);
      if (value.toString() === '') {
        params.delete(name);
      } else {
        params.set(name, value.toString());
      }
      params.delete('page');

      return params.toString();
    },
    [queryParams]
  );

  // eslint-disable-next-line react-hooks/exhaustive-deps
  const handleChangeDebounced = useCallback(
    debounce((value: string) => {
      router.push(pathname + '?' + createQueryString('search', value));
    }, 400),
    [pathname, createQueryString, router]
  );

  const handleChange = (value: string) => {
    setInputValue(value);
    handleChangeDebounced(value);
  };

  return (
    <div className="relative h-11 w-full">
      <span className={`absolute left-6 top-2 flex items-center justify-center`}>
        {<SearchIcon className="size-6 fill-none stroke-inputLabelAccent stroke-1" />}
      </span>
      <input
        className="flex h-11 w-full justify-center rounded-full bg-bgColor py-2 pl-14 pr-6 font-text text-sm font-light shadow-inner outline-none md:text-base"
        defaultValue={inputValue}
        type="search"
        placeholder="Search"
        onChange={(e) => handleChange(e.target.value)}
      />
    </div>
  );
}

function ToggleInput(props: ToggleInputProps) {
  const [checked, setChecked] = useState(props.defaultChecked);

  return (
    <div
      className={`relative flex w-full ${props.withoutBackground ? 'flex-row items-center justify-between' : 'flex-col'}`}
    >
      {props.withoutBackground ? (
        <span className={`font-text text-sm font-medium uppercase`}>{props.label}</span>
      ) : (
        <LabelText
          invalid={props.invalid}
          isClicked={props.isClicked}
          required={props.required}
          label={props.label}
          className={`${props.withoutBackground ? 'pb-0' : ' '}`}
        >
          {props.label}
        </LabelText>
      )}
      <label
        htmlFor={props.name}
        className={`${props.withoutBackground ? '' : 'w-full px-6 shadow-inner'} flex cursor-pointer items-center justify-between gap-3 rounded-full py-1 outline-none`}
      >
        <span className={`flex size-full items-center font-text text-sm font-light md:text-base`}>
          {checked ? props.placeholderActive : props.placeholderInactive}
        </span>

        <div
          className={`relative flex ${props.withoutBackground ? 'h-fit' : 'h-11'} w-fit items-center`}
        >
          <input
            checked={checked}
            className={`peer hidden`}
            disabled={props.disabled}
            type={props.type}
            // defaultChecked={props.defaultChecked}
            id={props.name}
            onChange={() => setChecked(!checked)}
            required={props.required}
            name={props.name}
          />
          <div className="peer relative h-6 w-11 rounded-full bg-toggleAccent after:absolute after:start-[3px] after:top-[2px] after:size-5 after:rounded-full after:border after:border-bgColor after:bg-white after:transition-all after:content-[''] peer-checked:bg-primary peer-checked:after:translate-x-[calc(100%-2px)] peer-checked:after:border-white peer-focus:outline-none rtl:peer-checked:after:-translate-x-full"></div>

          {/* <span className="flex h-6 w-12 shrink-0 items-center rounded-full border border-toggleAccent bg-transparent p-1 duration-300 ease-in-out after:size-5 after:rounded-full after:bg-toggleAccent after:shadow-md after:duration-300 group-hover:after:translate-x-1 peer-checked:border-none peer-checked:bg-primary peer-checked:after:translate-x-7 peer-checked:after:bg-white" /> */}
        </div>
      </label>
    </div>
  );
}
interface MultiRangeSliderProps {
  min: number;
  max: number;
  minKey: string;
  maxKey: string;
  tag: string;
}

const MultiRangeSlider: React.FC<MultiRangeSliderProps> = ({ min, max, minKey, maxKey, tag }) => {
  const query = useSearchParams();
  const pathname = usePathname();
  const router = useRouter();
  const minValRef = useRef<HTMLInputElement>(null);
  const maxValRef = useRef<HTMLInputElement>(null);
  const range = useRef<HTMLDivElement>(null);
  const [minVal, setMinVal] = useState(
    query.get(minKey) ? (Number(query.get(minKey)) < min ? min : Number(query.get(minKey))) : min
  );
  const [maxVal, setMaxVal] = useState(
    query.get(maxKey) ? (Number(query.get(maxKey)) > max ? max : Number(query.get(maxKey))) : max
  );

  const createQueryString = useCallback(
    (name: string, value: string) => {
      const params = new URLSearchParams(query);
      params.set(name, value);
      params.delete('page');

      return params.toString();
    },
    [query]
  );
  const getPercent = useCallback(
    (value: number): number => Math.round(((value - min) / (max - min)) * 100),
    [min, max]
  );

  useEffect(() => {
    if (maxValRef.current) {
      const minPercent = getPercent(minVal);
      const maxPercent = getPercent(+maxValRef.current.value);

      if (range.current) {
        range.current.style.left = `${minPercent}%`;
        range.current.style.width = `${maxPercent - minPercent}%`;
      }
    }
  }, [minVal, getPercent]);

  useEffect(() => {
    if (minValRef.current) {
      const minPercent = getPercent(+minValRef.current.value);
      const maxPercent = getPercent(maxVal);

      if (range.current) {
        range.current.style.width = `${maxPercent - minPercent}%`;
      }
    }
  }, [maxVal, getPercent]);

  useEffect(() => {
    if (!query.get(maxKey) && (maxVal !== max || maxVal > max)) {
      setMaxVal(max);
    }
    if (!query.get(minKey) && (minVal !== min || minVal < min)) {
      setMinVal(min);
    }

    if (Number(query.get(maxKey)) > max || Number(query.get(maxKey)) < minVal) {
      const params = new URLSearchParams(query);
      params.delete(maxKey);
      router.push(pathname + '?' + params.toString()),
        {
          scroll: true
        };
    }
    if (Number(query.get(minKey)) < min || Number(query.get(minKey)) > maxVal) {
      const params = new URLSearchParams(query);
      params.delete(minKey);
      router.push(pathname + '?' + params.toString()),
        {
          scroll: true
        };
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [query]);

  return (
    <div className="relative w-full px-2 pb-16 pt-5">
      <div className="relative flex items-center justify-center">
        <input
          title="Input range"
          type="range"
          min={min}
          max={max}
          value={minVal}
          ref={minValRef}
          onChange={(event) => {
            const value = Math.min(+event.target.value, maxVal);
            router.push(pathname + '?' + createQueryString(minKey, value.toString()), {
              scroll: true
            });
            setMinVal(value);
            event.target.value = value.toString();
          }}
          className={`pointer-events-none absolute z-[3] h-0 w-full appearance-none bg-transparent outline-none [&::-moz-range-thumb]:pointer-events-auto [&::-moz-range-thumb]:relative [&::-moz-range-thumb]:size-4 [&::-moz-range-thumb]:cursor-pointer [&::-moz-range-thumb]:appearance-none [&::-moz-range-thumb]:rounded-full [&::-moz-range-thumb]:bg-black [&::-webkit-slider-thumb]:pointer-events-auto [&::-webkit-slider-thumb]:relative [&::-webkit-slider-thumb]:size-4 [&::-webkit-slider-thumb]:cursor-pointer [&::-webkit-slider-thumb]:appearance-none [&::-webkit-slider-thumb]:rounded-full [&::-webkit-slider-thumb]:bg-black`}
        />
        <input
          title="Input range"
          type="range"
          min={min}
          max={max}
          value={maxVal}
          ref={maxValRef}
          onChange={(event) => {
            const value = Math.max(+event.target.value, minVal);
            router.push(pathname + '?' + createQueryString(maxKey, value.toString()), {
              scroll: true
            });
            setMaxVal(value);
            event.target.value = value.toString();
          }}
          className={`pointer-events-none absolute z-[4] h-0 w-full appearance-none bg-transparent outline-none [&::-moz-range-thumb]:pointer-events-auto [&::-moz-range-thumb]:relative [&::-moz-range-thumb]:size-4 [&::-moz-range-thumb]:cursor-pointer [&::-moz-range-thumb]:appearance-none [&::-moz-range-thumb]:rounded-full [&::-moz-range-thumb]:bg-black [&::-webkit-slider-thumb]:pointer-events-auto [&::-webkit-slider-thumb]:relative [&::-webkit-slider-thumb]:size-4 [&::-webkit-slider-thumb]:cursor-pointer [&::-webkit-slider-thumb]:appearance-none [&::-webkit-slider-thumb]:rounded-full [&::-webkit-slider-thumb]:bg-black`}
        />

        <div className="relative w-full">
          <div className="absolute z-[1] h-px w-full rounded-sm bg-slate-300/60" />
          <div ref={range} className="absolute z-[2] h-px rounded-sm bg-black" />
          <div className="absolute left-2 top-4 text-base text-black">
            {toThousands(minVal?.toString()) + ' ' + tag}
          </div>
          <div className="absolute right-2 top-4 text-base text-black">
            {toThousands(maxVal?.toString()) + ' ' + tag}
          </div>
        </div>
      </div>
    </div>
  );
};

export {
  AddFieldInput,
  CalendarInput,
  CommentInput,
  DownloadInput,
  DynamicCitiesInput,
  ExtendableInput,
  HiddenInput,
  MultiEntryInput,
  MultiRangeSlider,
  NestedCheckboxList,
  SelectableAccordionInput,
  // DynamicInputs,
  PhoneInput,
  RatingInput,
  SearchInput,
  SelectInput,
  // SliderInput,
  Textarea,
  ToggleInput
};
export default SimpleInput;
