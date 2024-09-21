'use client';
import { useModal } from '@/helpers/modalHelper';
import { DropDownInputProps } from '@/types/inputs.type';
import { usePathname, useRouter, useSearchParams } from 'next/navigation';
import { useCallback, useEffect, useRef, useState } from 'react';

import AddIcon from '../icons/addIcon';
import CheckIcon from '../icons/checkIcon';
import InfoIcon from '../icons/infoIcon';
import { RoundedButton } from './buttons';
import { AccordionContainer } from './containers';
import { DynamicForm } from './forms';
import { LabelText, Text } from './texts';

const DropDownInput = (props: DropDownInputProps) => {
  const selectRef = useRef<HTMLDivElement>(null);
  const { setIsOpen, setTitle, setContent } = useModal();

  const openModal = () => {
    setIsOpen(true);
    setTitle(props?.addForm?.title || 'Add');
    setContent(
      props?.addForm ? (
        <DynamicForm
          config={props?.addForm?.config}
          action={props?.addForm?.action}
          setOverlayIsOpen={setIsOpen}
        />
      ) : (
        <div></div>
      )
    );
  };

  const [invalid, setInvalid] = useState(props.required && !props?.defaultValue);
  const messages = props.validationObjects || [];
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();
  // Get a new searchParams string by merging the current
  // searchParams with a provided key/value pair
  const createQueryString = useCallback(
    (name: string, value: string) => {
      const params = new URLSearchParams(searchParams.toString());
      params.set(name, value);

      return params.toString();
    },
    [searchParams]
  );

  useEffect(() => {
    document.addEventListener('click', handleClickOutside);

    return () => {
      document.removeEventListener('click', handleClickOutside);
    };
  }, []);

  const [visible, setVisible] = useState(false);

  const [selectedValues, setSelectedValues] = useState<any>(
    props.defaultValue ? props.defaultValue : props.multiple ? [] : null
  );

  const handleClickOutside = (event: { target: any }) => {
    if (selectRef.current && !selectRef.current.contains(event.target)) {
      setVisible(false);
    }
  };

  const filteredOptions = props.options.filter((option: { name: string }) => {
    return option.name.toLowerCase();
  });

  const handleRemoveSelected = (valueToRemove: any) => {
    setSelectedValues((prevValues: any) =>
      prevValues.filter((value: any) => value !== valueToRemove)
    );
  };

  const handleListSelect = (option: any) => {
    setInvalid(false);
    setSelectedValues((prevValues: any) => {
      if (props.multiple) {
        if (prevValues.some((value: any) => value.name === option.name)) {
          return prevValues.filter((value: any) => value.name !== option.name);
        } else {
          return [...prevValues, option];
        }
      } else {
        setVisible(false);

        return option;
      }
    });
    props.pushToParams && router.push(pathname + '?' + createQueryString(props.name, option.value));
  };

  return (
    <div
      className={`${props.hidden ? 'hidden' : 'relative flex size-full flex-col'}`}
      ref={selectRef}
    >
      <input
        className="peer"
        readOnly
        required={props.required}
        hidden
        value={
          props.multiple
            ? selectedValues?.map((value: any) => value.value).join(',')
            : selectedValues?.value || ''
        }
        name={props.name}
        type="select"
      />

      <LabelText
        isClicked={props.isClicked}
        required={props.required}
        className={props.minHeight ? 'mx-2 pb-0' : ''}
        invalid={invalid}
        label={props.label}
      >
        {props.label}
      </LabelText>
      {!props.notList ? (
        <div
          className={`peer flex w-full flex-col items-center justify-center overflow-hidden rounded-3xl px-6 duration-300 ease-in-out ${props.isClicked && invalid && 'border border-red'} shadow-inner`}
        >
          <div
            className="flex size-full flex-1 cursor-pointer items-center justify-between gap-4 py-2.5"
            onClick={handleListToggle}
          >
            {/* <div className="relative flex w-full items-center justify-center bg-redAccent"> */}
            <label
              className={`relative ${
                props.multiple
                  ? selectedValues && selectedValues.length > 0
                    ? 'text-black'
                    : 'text-inputLabelAccent'
                  : selectedValues
                    ? 'text-black'
                    : 'text-inputLabelAccent'
              } flex cursor-pointer flex-wrap items-center gap-3 font-text text-xs font-light md:text-base lg:text-sm`}
            >
              {props.multiple
                ? selectedValues && selectedValues.length > 0
                  ? selectedValues.map((value: any, index: any) => (
                      <span key={index} className="w-fit overflow-hidden rounded-full">
                        <div
                          onClick={(e) => {
                            e.stopPropagation();
                          }}
                          className="relative flex h-7 w-fit items-center justify-center gap-3 rounded-3xl bg-primary/15 p-2"
                        >
                          {value.name}
                          <svg
                            onClick={() => {
                              if (selectedValues.length === 1) {
                                setVisible(true);
                              }
                              handleRemoveSelected(value);
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
                    ))
                  : props.placeholder
                : selectedValues
                  ? selectedValues.name
                  : props.placeholder}
            </label>
            {/* </div> */}
            <div className="flex aspect-square size-6 items-center justify-center rounded-full bg-bgColor shadow-outerSmall">
              <svg
                // onClick={handleListToggle}
                className={`size-6 p-1 ${visible ? 'rotate-180' : 'rotate-0'} duration-300 ease-in-out`}
                stroke="currentColor"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth="1"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M19.5 8.25l-7.5 7.5-7.5-7.5"
                />
              </svg>
            </div>
          </div>
          <div
            className={`flex size-full flex-1 ${visible ? 'mt-2 max-h-48 pb-6' : 'max-h-0'} flex-col overflow-auto duration-700 ease-in-out`}
          >
            {filteredOptions.map((option: any, index: any) => (
              <div
                key={index}
                onClick={() => handleListSelect(option)}
                className={`relative flex w-full cursor-pointer flex-col items-start justify-start pt-1 text-black hover:bg-bgColorHover`}
              >
                <div className="flex w-full items-center gap-2">
                  <Text
                    className={`${
                      (Array.isArray(selectedValues) && selectedValues?.includes(option)) ||
                      selectedValues === option
                        ? 'font-medium'
                        : ''
                    }`}
                  >
                    {option.name}
                  </Text>
                  {((Array.isArray(selectedValues) && selectedValues?.includes(option.value)) ||
                    selectedValues === option) && (
                    <CheckIcon className="flex size-4 shrink-0 grow-0" />
                  )}
                </div>
                {option.description && (
                  <>
                    <div className="peer absolute right-0 top-0 z-20 flex h-6 w-8 items-center justify-center">
                      <InfoIcon className="aspect-square size-5" />
                    </div>
                    <div className="h-0 overflow-hidden text-xs text-inputLabelAccent opacity-0 transition-all duration-500 peer-hover:h-10 peer-hover:pt-1 peer-hover:opacity-100">
                      {option?.description}
                    </div>
                  </>
                )}
              </div>
            ))}
          </div>
        </div>
      ) : (
        <>
          <div
            className={`flex bg-transparent ${props.minHeight ? 'h-full items-center p-2 px-4' : 'p-3.5'} max-h-48 w-full flex-wrap gap-4 overflow-auto`}
          >
            {filteredOptions.map(
              (option: { name: string; value: string; description?: string }, index: any) => (
                <button
                  type="button"
                  key={index}
                  onClick={() => handleListSelect(option)}
                  className={`relative flex w-fit cursor-pointer gap-2 ${(Array.isArray(selectedValues) && selectedValues?.some((selectedValue: any) => selectedValue.value === option.value)) || (!Array.isArray(selectedValues) && selectedValues?.value === option.value) ? 'text-primary shadow-outerSmall' : 'text-inputLabelAccent shadow-inner'} items-center justify-between rounded-full ${props.minHeight ? 'p-2' : 'p-3'} px-5 hover:bg-gray-300/10`}
                >
                  {props?.icons && (
                    <div
                      className={`flex size-8 shrink-0 grow-0 ${(Array.isArray(selectedValues) && selectedValues?.some((selectedValue: any) => selectedValue.value === option.value)) || (!Array.isArray(selectedValues) && selectedValues?.value === option.value) ? 'fill-primary stroke-primary' : 'fill-inputLabelAccent stroke-inputLabelAccent'}`}
                    >
                      {props?.icons && props?.icons[option.value]}
                    </div>
                  )}
                  <Text>{option.name}</Text>
                </button>
              )
            )}
          </div>
          {props.addForm && (
            <div className="flex w-full flex-row items-center justify-center gap-2 overflow-auto py-6 shadow-[0_-3px_10px_0px_rgba(0,0,0,0.03)]">
              <RoundedButton onClick={openModal} label={<AddIcon className="size-3" />} />
              <span>{props?.addForm?.title}</span>
            </div>
          )}
        </>
      )}
      {messages?.map((message: string, index: number) => (
        <span
          key={index}
          className={`mx-4 pt-1 text-sm text-red ${props.isClicked && invalid ? 'block' : 'hidden'}`}
        >
          {message}
        </span>
      ))}
    </div>
  );

  function handleListToggle() {
    setVisible(!visible);
  }
};
const AccordionDropDownInput = (props: DropDownInputProps) => {
  const messages = props.validationObjects || [];
  const [isOpen, setIsOpen] = useState(props?.isOpen || false);

  return (
    <AccordionContainer
      invalid={messages.length > 0}
      inputContainer
      className="my-1.5 rounded-[2rem] px-6"
      icon={<AddIcon className="size-3" />}
      title={props.title}
      isOpen={isOpen}
      setIsOpen={setIsOpen}
    >
      <DropDownInput {...props} />
    </AccordionContainer>
  );
};

export { AccordionDropDownInput, DropDownInput };
