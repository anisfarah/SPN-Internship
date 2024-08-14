import { DynamicInputsProps } from '@/types/inputs.type';
import { getInputComponent } from '@/utils/inputHelpers';
import cn from '@/utils/tailwindClassNameMerge';
import { ComponentType, memo } from 'react';

const DynamicInputs = memo((props: DynamicInputsProps) => {
  const { inputConfig, isClicked, invisible, className, errors } = props;
  const currentConfig = inputConfig || [];



  return (
    <div
      className={cn(
        `${invisible ? 'hidden' : 'flex'} size-full flex-col gap-3 duration-500 ease-in-out`,
        className
      )}
    >
      {currentConfig.map((config: any, index: number) => {
        // Handle 'label' type directly
        if (config.type === 'label') {
          return (
            <div key={index} className="mb-4">
              <label style={config.style}>{config.label}</label>
            </div>
          );
        }

       if (config.type === 'group') {
  console.log('Rendering group:', config);
  return (
    <div key={index} className="flex mb-4 gap-4">
      {config.fields.map((subField: any, subIndex: number) => (
        <div key={subIndex} className="flex-1">
          <div className="relative flex w-full flex-col">
            <label
              className="pb-2 font-text text-xs font-light text-inputLabelAccent md:text-base lg:text-sm"
              style={subField.style}
            >
              {subField.label}
            </label>
            <input
              type={subField.type}
              name={subField.name}
              required={subField.required}
              className="relative z-10 h-11 w-full rounded-full bg-bgColor py-2 duration-300 ease-in-out flex justify-center px-6 pl-6 font-text text-sm font-light shadow-inner outline-none focus:shadow-innerFocus md:text-base"
              style={subField.style}
            />
          </div>
        </div>
      ))}
    </div>
  );
}

        
        

        // Default handling of regular input types
        const isArray = Array.isArray(config);
        const content = isArray ? config : [config];

        return (
          <div
            key={index}
            className={`flex w-full gap-4 ${isClicked ? 'cursor-pointer' : ''} ${
              !isArray ? 'flex-col' : 'flex-row'
            }`}
          >
            {content.map((item, idx) => {
              const InputComponent: ComponentType<any> = getInputComponent(item.type);

              return (
                <InputComponent
                  {...item}
                  key={idx}
                  isClicked={isClicked}
                  validationObjects={
                    errors
                      ? item.type === 'add' ||
                        item.type === 'multiEntry' ||
                        item.type === 'extend' ||
                        item.type === 'selectableAccordion'
                        ? errors
                        : errors[item.name]
                      : []
                  }
                />
              );
            })}
          </div>
        );
      })}
    </div>
  );
});

DynamicInputs.displayName = 'DynamicInputs';
export default DynamicInputs;
