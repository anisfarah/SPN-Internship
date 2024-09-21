import { DynamicInputsProps } from '@/types/inputs.type';
import { ComponentType } from 'react';

import Autocomplete, {
  AutoCompleteMaps,
  HybridAutoComplete,
  MultiSelectAutoComplete
} from '@/components/ui/autoComplete';
import { AccordionDropDownInput, DropDownInput } from '@/components/ui/dropDownInputs';
import SimpleInput, {
  AddFieldInput,
  CalendarInput,
  CommentInput,
  DynamicCitiesInput,
  ExtendableInput,
  HiddenInput,
  MultiEntryInput,
  NestedCheckboxList,
  PhoneInput,
  RatingInput,
  SelectableAccordionInput,
  // SliderInput,
  Textarea,
  ToggleInput
} from '@/components/ui/inputs';
import { UploadInput, UploadMultiInput } from '@/components/ui/uploadInputs';

/**
 * Gets the file extension of a given fileName.
 * @param fileName The fileName to extract the extension from.
 * @returns The file extension of the fileName, without the dot, as a string.
 */
function getFileExtension(fileName: string): string {
  const fileExtension = fileName.replace(/^.*\./, '');

  return fileExtension;
}

function areArraysEqual(arr1: string[], arr2: string[]): boolean {
  return arr1.length === arr2.length && arr1.every((val, index) => val === arr2[index]);
}

/**
 * Checks if a file name has an image extension.
 * @param fileName The file name to check, as a string.
 * @returns True if the file name has an image extension, false otherwise.
 */
function isImage(fileName: string): boolean {
  const fileExt = getFileExtension(fileName);
  const imagesExtension = ['png', 'jpg', 'jpeg', 'webp'] as const;

  return imagesExtension.includes(fileExt);
}

/**
 * Checks if a file name has a PDF extension.
 * @param fileName The file name to check, as a string.
 * @returns True if the file name has a PDF extension, false otherwise.
 */
function isPDF(fileName: string): boolean {
  const fileExt = getFileExtension(fileName);

  return fileExt === 'pdf';
}

/**
 * Checks if a file name has an Excel extension.
 * @param fileName The file name to check, as a string.
 * @returns True if the file name has an Excel extension (xls, xlsx, xlsb, xlsm), false otherwise.
 */
function isExcel(fileName: string): boolean {
  const fileExt = getFileExtension(fileName);
  const excelExtensions = ['xls', 'xlsx', 'xlsb', 'xlsm'] as const;

  return excelExtensions.includes(fileExt);
}

/**
 * Checks if a value is empty.
 * A value is considered empty if it is undefined, null, or an empty string.
 * @param value The value to check.
 * @returns True if the value is empty, false otherwise.
 */
function isEmpty<T>(value: T | undefined | null): value is Exclude<T, string> | null | undefined {
  return value === undefined || value === null || value === '';
}

/**
 * Converts a string to a slug, by removing diacritics, and replacing spaces and
 * other non-word characters with hyphens.
 *
 * @param text The string to slugify, as a string.
 * @returns The slugified string, as a string.
 */
function slugify(text: string): string {
  return text
    ?.toString()
    ?.normalize('NFD')
    .replace(/'/g, '-')
    .replace(/[\u0300-\u036f]/g, '')
    .toLowerCase()
    .trim()
    .replace(/\s+/g, '-')
    .replace(/[^\w-]+/g, '')
    .replace(/--+/g, '-');
}

/**
 * Converts a string to title case, with support for underscores.
 *
 * @param word The word to capitalize, as a string.
 * @returns The capitalized word, as a string.
 */
function capitalize(word: string): string {
  return word?.charAt(0)?.toUpperCase() + word?.slice(1)?.toLowerCase()?.replace('_', ' ');
}

function toComponentName(str: string): string {
  return str
    .replace('Shared', '')
    .replace(/(?:^\w|[A-Z]|\b\w|[^a-zA-Z0-9]+)/g, function (match, index) {
      if (/[^a-zA-Z0-9]/.test(match)) return ''; // Ignore special characters

      return index === 0 ? match.toUpperCase() : match.toUpperCase();
    });
}

/**
 * Removes camel case from a string and capitalizes the first letter.
 *
 * @param {string} str - The string to remove camel case from.
 * @return {string} The string with camel case removed and the first letter capitalized.
 */
const removeCamelCase = (str: string) => {
  return str
    .replace(/([A-Z])/g, ' $1')
    .trim()
    .replace(/^./, (str) => str.toUpperCase());
};

/**
 * Converts an enum value to a capitalized string, with support for removing
 * specific words and keeping all uppercase.
 *
 * @param enumValue The enum value to capitalize, as a string.
 * @param removeWords An array of words to remove from the result string, as a string array.
 * @param keepAllUppercase Whether to keep all uppercase characters, as a boolean.
 * @returns The capitalized string, as a string.
 */
function enumToCapitalizedString<T extends string>({
  enumValue,
  removeWords = [],
  keepAllUppercase = false
}: {
  enumValue: T;
  removeWords?: string[];
  keepAllUppercase?: boolean;
}): string {
  let result = enumValue
    ?.replace(/_/g, ' ')
    .split(' ')
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase())
    .join(' ');

  if (removeWords.length > 0) {
    const regex = new RegExp(`\\b(${removeWords.join('|')})\\b`, 'gi'); // Case-insensitive global replace
    result = result.replace(regex, '');
  }

  return keepAllUppercase ? result.toUpperCase() : result;
}

/**
 * Removes a given value from an array, if it exists.
 *
 * @param arr The array to modify.
 * @param value The value to remove.
 * @returns A new array with the given value removed, or the original array if the value was not found.
 */
function arrayRemove<T>(arr: T[], value: T): T[] {
  return arr.filter((ele) => ele !== value);
}

/**
 * Creates an array containing an arithmetic series, with the specified start and end values,
 * and the specified step value.
 *
 * @param start The start value of the series.
 * @param stop The end value of the series.
 * @param step The step value of the series.
 * @returns An array containing the arithmetic series from `start` to `stop` with step `step`.
 */
function arrayRange<T extends number>(start: T, stop: T, step: number): Array<T> {
  return Array.from(
    { length: Math.floor((stop - start) / step) + 1 },
    (value, index) => start + index * step
  ) as Array<T>;
}

/**
 * Debounce a function, by delaying its execution by a specified amount of time.
 *
 * @param func The function to debounce, as a function.
 * @param delay The amount of time, in milliseconds, to delay the execution of the function.
 * @returns A new function, which will execute the original function after the specified delay.
 */
function debounce<T extends (...args: any[]) => any>(
  func: T,
  delay: number
): (...args: Parameters<T>) => void {
  let timeoutId: NodeJS.Timeout;

  return function (...args: Parameters<T>) {
    clearTimeout(timeoutId);
    timeoutId = setTimeout(async () => {
      await func(...args);
    }, delay);
  };
}

const emailRegex = /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i;

/**
 * Checks if a variable is an object and not null, and not an array.
 *
 * @param {any} variable - The variable to check.
 * @return {boolean} Returns true if the variable is an object with own properties, false otherwise.
 */
function isObject(variable: any): boolean {
  // Check if the variable is an object and not null
  if (typeof variable === 'object' && variable !== null) {
    // Check if the variable is not an array
    if (!Array.isArray(variable)) {
      // Check if the object has its own properties
      return Object.keys(variable).length > 0;
    }
  }

  return false;
}

/**
 * Returns the input component for the given type.
 * @param type The type of input component to get.
 * @returns The input component for the given type, or null if the type is not found.
 */
export function getInputComponent(type: DynamicComponentType): ComponentType<DynamicInputsProps> {
  const components: {
    [key in DynamicComponentType]: ComponentType<any>;
  } = {
    text: SimpleInput,
    email: SimpleInput,
    number: SimpleInput,
    autoComplete: Autocomplete,
    checkbox: ToggleInput,
    select: DropDownInput,
    accordionSelect: AccordionDropDownInput,
    textArea: Textarea,
    splitTextArea: Textarea,
    file: UploadInput,
    gallery: UploadMultiInput,
    hidden: HiddenInput,
    phone: PhoneInput,
    calendar: CalendarInput,
    cities: DynamicCitiesInput,
    rating: RatingInput,
    comment: CommentInput,
    add: AddFieldInput,
    extend: ExtendableInput,
    multiEntry: MultiEntryInput,
    selectableAccordion: SelectableAccordionInput,
    // range: SliderInput,
    location: AutoCompleteMaps,
    hybridAutoComplete: HybridAutoComplete,
    nestedCheckbox: NestedCheckboxList,
    multiAutoComplete: MultiSelectAutoComplete
  };

  return components[type] || SimpleInput;
}
const toThousands = (price: string) => {
  return price?.replace(
    new RegExp(`(?!^)(?=(\\d{3})+${price.includes('.') ? '\\.' : '$'})`, 'g'),
    ' '
  );
};
export type DynamicComponentType =
  | 'text'
  | 'email'
  | 'number'
  | 'autoComplete'
  | 'checkbox'
  | 'select'
  | 'accordionSelect'
  | 'selectableAccordion'
  | 'textArea'
  | 'splitTextArea'
  | 'file'
  | 'gallery'
  | 'hidden'
  | 'phone'
  | 'calendar'
  | 'cities'
  | 'rating'
  | 'comment'
  | 'add'
  | 'extend'
  | 'multiEntry'
  // | 'range'
  | 'location'
  | 'hybridAutoComplete'
  | 'multiAutoComplete'
  | 'nestedCheckbox';

export {
  getFileExtension,
  isImage,
  isPDF,
  isExcel,
  isEmpty,
  arrayRemove,
  capitalize,
  slugify,
  enumToCapitalizedString,
  areArraysEqual,
  arrayRange,
  debounce,
  isObject,
  emailRegex,
  removeCamelCase,
  toComponentName,
  toThousands
};
