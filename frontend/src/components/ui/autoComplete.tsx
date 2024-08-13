'use client';

import { useModal } from '@/helpers/modalHelper';
import GetLocationsAutoComplete from '@/services/maps.service';
import { AutocompleteProps } from '@/types/inputs.type';
import { capitalize } from '@/utils/inputHelpers';
import { useEffect, useMemo, useState } from 'react';

import AddIcon from '../icons/addIcon';
import { MinusIcon } from '../icons/mainIcons';
import Button, { RoundedButton } from './buttons';
import { DynamicForm } from './forms';
import { LabelText } from './texts';

function Autocomplete(props: AutocompleteProps) {
  //TODO: Fix input turning red when value is correct

  const [input, setInput] = useState<string>(
    props.defaultValue
      ? props.valueKey && props.defaultValue[props.valueKey]
        ? props.defaultValue[props.valueKey]
        : props.defaultValue
      : ''
  );
  const [isSelected, setIsSelected] = useState<boolean>(input != '' ? true : false);
  const [invalid, setInvalid] = useState<boolean>(props.required || false);
  const [selectedValue, setSelectedValue] = useState<string | undefined>(
    props.defaultValue
      ? textContent(
          <div className="flex w-full items-center justify-start gap-3 overflow-hidden text-xs text-black">
            <span className="font-light capitalize">
              {props.displayFields
                ? props.displayFields.map((field: string) => `${props.defaultValue[field]}`)
                : props.defaultValue}
            </span>
          </div>
        )
      : ''
  );

  const filteredData = useMemo(
    () => {
      const matchedData =
        props.filterFields?.length > 0
          ? props.options?.filter((val: any) => {
              for (const field of props.filterFields) {
                if (
                  val[field]
                    .toLowerCase()
                    .includes(typeof input === 'string' ? input.toLowerCase() : input[field])
                ) {
                  return true;
                }
              }

              return false;
            })
          : props.options?.filter((val: any) => {
              return val.toLowerCase().includes(input.toLowerCase());
            });

      return matchedData;
    },
    props.maps ? [props.options] : [input]
  );

  const handleListSelect = (option: any) => {
    setSelectedValue(
      textContent(
        <div className="flex w-full items-center justify-start gap-3 overflow-hidden text-xs text-black">
          <span className="font-light capitalize">
            {props.displayFields
              ? props.displayFields.map((field: string) => `${option[field]}`)
              : option}
          </span>
        </div>
      )
    );
    setInput(props.valueKey && option[props.valueKey] ? option[props.valueKey] : option);
    setInvalid(false);
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

  const chooseData = (e: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
    setInput(e.currentTarget.textContent || '');
    setIsSelected(true);
  };

  const messages = props.validationObjects || [];

  return (
    <div className="flex w-full flex-col">
      <LabelText
        invalid={invalid}
        isClicked={props.isClicked}
        required={props.required}
        label={props.label}
      >
        {props.label}
      </LabelText>
      <div
        className={`relative flex size-full flex-col truncate rounded-3xl bg-bgColor shadow-inner duration-200 ${
          props.isClicked && invalid ? 'border border-red' : ''
        }`}
      >
        {props.IconOne && (
          <span className="absolute left-6 top-3 flex items-center justify-center pb-1">
            {props.IconOne}
          </span>
        )}
        <input
          className={`${props.IconOne ? 'pl-14' : 'pl-6'} flex h-11 w-full justify-center rounded-full ${props.disabled ? 'cursor-not-allowed' : 'cursor-auto'} bg-transparent px-6 py-2 font-text text-sm font-light outline-none duration-300 ease-in-out md:text-base`}
          value={selectedValue}
          type="text"
          disabled={props.disabled}
          // defaultValue={props.defaultValue}
          required={props.required}
          placeholder={
            props.value && Object.keys(props.value).length !== 0 ? '' : props.placeholder
          }
          onChange={(e) => {
            setInput(e.target.value);
            setIsSelected(false);
            setInvalid(true);
            setSelectedValue(undefined);
            if (props.handleChange) props.handleChange(e.target.value);
          }}
        />
        <input
          type="hidden"
          name={props.name}
          value={typeof input === 'object' ? JSON.stringify(input) : input}
        />
        {!isSelected && (
          <div
            className={`flex flex-col justify-start duration-300 ${
              props.IconOne ? 'px-10' : 'px-2'
            } divide-y divide-gray-400/30 overflow-auto ${
              input?.length > 0 ? 'max-h-52' : 'max-h-0'
            }`}
          >
            {filteredData?.length > 0 ? (
              filteredData?.map((option, idx) => (
                <div
                  className={`flex w-full items-center justify-start gap-20 px-4 py-5 hover:bg-bgColorHover ${
                    input?.length === 0 ? 'h-0 p-0 opacity-0' : 'h-8 py-1'
                  } cursor-pointer duration-200`}
                  key={idx}
                  onClick={(e) => {
                    chooseData(e);
                    handleListSelect(option);
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
                    input?.length === 0 ? 'h-0 p-0 opacity-0' : 'h-11 py-4'
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
      {messages.map((message, index) => (
        <span
          key={index}
          className={`mx-4 pt-1 text-sm text-red ${props.isClicked && invalid ? 'block' : 'hidden'}`}
        >
          {message}
        </span>
      ))}
    </div>
  );
}
function AutoCompleteMaps(props: AutocompleteProps) {
  const [locationOptions, setLocationOptions] = useState<any[]>([]);

  const locations = locationOptions?.map((location) => ({
    city: location.description,
    id_: location.place_id
  }));

  let filterTimeout: any;

  const googleMapsHandleChange = async (e: any) => {
    clearTimeout(filterTimeout);
    filterTimeout = setTimeout(async () => {
      if (e) {
        const { response, status } = await GetLocationsAutoComplete(e);
        if (response && status === 200) {
          setLocationOptions(response.predictions);
        }
      }
    }, 400);
  };

  return (
    <Autocomplete
      {...props}
      maps
      handleChange={(e) => googleMapsHandleChange(e)}
      options={locations}
    />
  );
}

function HybridAutoComplete(props: AutocompleteProps) {
  const { setIsOpen, setTitle, setContent } = useModal();

  const openModal = () => {
    setTitle('Add brand');
    setContent(<DynamicForm config={props.config.inputConfig} action={props.config.action} />);
    setIsOpen(true);
  };

  //TODO : Alter autocomplete component in a way to change default value according to previous action result
  return (
    <Autocomplete
      HandleNoMatch={
        <Button className="h-11 w-36" label={'Add brand'} type="button" onClick={openModal} />
      }
      {...props}
    />
  );
}
function MultiSelectAutoComplete(props: AutocompleteProps) {
  const [options, setOptions] = useState<any[]>(props?.options || []);
  const [selectedValue, setSelectedValue] = useState<any[]>(props?.defaultValue || []);
  const [inputValue, setInputValue] = useState<string[]>(
    props.defaultValue?.map((item: any) => item.value) || []
  );
  const [newValues, setNewValues] = useState<any[]>([]);
  const [input, setInput] = useState<string>('');
  const [isSelected, setIsSelected] = useState<boolean>(false);
  const [isInvalid, setIsInvalid] = useState<boolean>(props.required || false);
  const messages = props.validationObjects || [];

  const updateInputValue = () => {
    const newInputValueArray: string[] = [];
    const inputValueArray: string[] = [];
    selectedValue.forEach((item: any) => {
      if (props.options.some((option: any) => option.value === item.value)) {
        for (let i = 0; i < item.count; i++) {
          inputValueArray.push(item.value);
        }
      } else {
        for (let i = 0; i < item.count; i++) {
          newInputValueArray.push(item.value);
        }
      }
    });
    setInputValue(inputValueArray);
    setNewValues(newInputValueArray);
  };
  useEffect(() => {
    updateInputValue();
  }, [selectedValue]);

  const handleRemoveSelectedItem = (valueToRemove: any) => {
    setSelectedValue((prevValues: any) =>
      prevValues.filter((item: any) => item.name !== valueToRemove.name)
    );
  };
  const filteredData = options?.filter((val: any) => {
    return val.name.toLowerCase().includes(input.toLowerCase());
  });
  const addNewOption = (newOption: any) => {
    setSelectedValue((prevValues: any) => [...prevValues, newOption]);
    setOptions((prevOptions: any) => [...prevOptions, newOption]);
  };
  const HandleIncrementOption = (option: any) => {
    //if the option does not exist, add the option to the list of options and selected values
    if (!options.some((value: any) => value.name.toLowerCase() === option.name.toLowerCase())) {
      addNewOption(option);
    } else {
      setSelectedValue((prevValues: any) => {
        // if the option is already selected, increment the count
        // otherwise, add the option to the list
        if (prevValues.some((value: any) => value.name === option.name)) {
          return prevValues.map((item: any) => {
            if (item.name === option.name) {
              return { name: item.name, value: item.value, count: item.count + 1 };
            }

            return item;
          });
        } else {
          return [...prevValues, { name: option.name, value: option.value, count: 1 }];
        }
      });
    }
  };
  const HandleDecrementOption = (option: any) => {
    setSelectedValue((prevValues: any) => {
      // if the option count is 1, delete the option
      // otherwise, decrement the count
      if (prevValues.filter((value: any) => value.name === option.name)[0].count <= 1) {
        return prevValues.filter((value: any) => value.name !== option.name);
      } else {
        return prevValues.map((value: any) => {
          if (value.name === option.name) {
            return { name: value.name, value: value.value, count: value.count - 1 };
          }

          return value;
        });
      }
    });
  };

  const getItemCount = (option: any) => {
    const optionIfSelected = selectedValue.filter((value: any) => value.name === option.name);

    return optionIfSelected.length > 0 ? optionIfSelected[0].count || 0 : 0;
  };

  return (
    <div className="mt-2 flex flex-col">
      <div className="flex flex-wrap">
        <LabelText
          isClicked={props.isClicked}
          label={props.label}
          required={props.required}
          invalid={isInvalid}
        />
        {selectedValue.map((item: any, index: any) => (
          <span key={index} className="mx-2 mb-2 w-fit overflow-hidden rounded-full">
            <div
              onClick={(e) => {
                e.stopPropagation();
              }}
              className="relative flex h-5 w-fit items-center justify-center gap-3 rounded-xl bg-primary/15 p-2 text-sm"
            >
              {`${capitalize(item.name)} (${item.count})`}
              <svg
                onClick={() => {
                  handleRemoveSelectedItem(item);
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
          className={`${props.IconOne ? 'pl-14' : 'pl-6'} flex h-11 w-full ${
            props.isClicked && isInvalid ? 'border border-red' : ''
          } justify-center rounded-full bg-transparent px-6 py-2 font-text text-sm font-light outline-none duration-300 ease-in-out md:text-base`}
          value={input}
          required={props.required}
          name={'inputField'}
          placeholder={
            props.value && Object.keys(props.value).length !== 0 ? '' : props.placeholder
          }
          onChange={(e) => {
            setInput(e.target.value);
            setIsSelected(false);
            if (props.handleChange) props.handleChange(e.target.value);
            setIsInvalid(false);
          }}
        />

        {!isSelected && (
          <div
            className={`flex flex-col justify-start duration-300 ${
              props.IconOne ? 'px-10' : 'px-2'
            } divide-y divide-gray-400/20 overflow-auto ${
              input?.length > 0 ? 'max-h-52' : 'max-h-0'
            }`}
          >
            {filteredData?.map((option, idx) => (
              <div
                className={`flex w-full items-center justify-start gap-20 py-5 pl-4 hover:bg-bgColorHover ${
                  input?.length === 0 ? 'h-0 p-0 opacity-0' : 'h-14 py-1'
                } duration-200`}
                key={idx}
              >
                <div className="flex h-14 w-full items-center justify-between gap-3 overflow-hidden pr-4 text-sm text-black">
                  <span className="font-light capitalize">{option.name}</span>
                  <span className="flex w-full max-w-32 flex-row items-center justify-end align-middle">
                    <RoundedButton
                      className="size-7"
                      disabled={getItemCount(option) === 0}
                      onClick={() => {
                        HandleDecrementOption(option);
                      }}
                      label={<MinusIcon className="size-2.5" />}
                    />
                    <span className="w-2/5 text-center">{getItemCount(option)}</span>
                    <RoundedButton
                      className="size-7"
                      onClick={() => {
                        HandleIncrementOption(option);
                      }}
                      label={<AddIcon className="size-2.5" />}
                    />
                  </span>
                </div>
              </div>
            ))}
            {(filteredData?.length === 0 ||
              filteredData?.filter((val) => val.name.toLowerCase() === input.toLowerCase())
                .length === 0) && (
              <div
                className={`flex w-full items-center justify-start gap-20 py-5 pl-4 hover:bg-bgColorHover ${
                  input?.length === 0 ? 'h-0 p-0 opacity-0' : 'h-14 py-1'
                } duration-200`}
              >
                <div className="flex h-14 w-full items-center justify-between gap-3 overflow-hidden pr-4 text-sm text-black">
                  <span className="font-light capitalize">{input}</span>
                  <span className="flex w-full max-w-32 flex-row items-center justify-end align-middle">
                    <RoundedButton
                      disabled
                      className="size-7"
                      onClick={() => {
                        HandleDecrementOption({ name: input, value: input, count: 1 });
                      }}
                      label={<MinusIcon className="size-2.5" />}
                    />
                    <span className="w-2/5 text-center">0</span>
                    <RoundedButton
                      className="size-7"
                      onClick={() => {
                        HandleIncrementOption({ name: input, value: input, count: 1 });
                      }}
                      label={<AddIcon className="size-2.5" />}
                    />
                  </span>
                </div>
              </div>
            )}
          </div>
        )}
        <input type="hidden" name={props.name} value={JSON.stringify(inputValue)} />
        <input
          type="hidden"
          name={props?.name?.replace('_old', '_new')}
          value={JSON.stringify(newValues)}
        />
      </div>
      {messages.map((message, index) => (
        <span
          key={index}
          className={`mx-4 pt-1 text-sm text-red ${props.isClicked && isInvalid ? 'block' : 'hidden'}`}
        >
          {message}
        </span>
      ))}
    </div>
  );
}
export { AutoCompleteMaps, HybridAutoComplete, MultiSelectAutoComplete };
export default Autocomplete;
