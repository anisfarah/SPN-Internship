import { DynamicInputsProps } from '@/types/inputs.type';
import { getInputComponent } from '@/utils/inputHelpers';
import cn from '@/utils/tailwindClassNameMerge';
import { ComponentType, memo } from 'react';

const DynamicInputs = memo((props: DynamicInputsProps) => {
  const { inputConfig, isClicked, invisible, className, errors } = props;
  const currentConfig = inputConfig || [];
  // console.log('🚀 ~ DynamicInputs ~ inputConfig:', currentConfig);

  return (
    <div
      className={cn(
        `${invisible ? 'hidden' : 'flex'} size-full flex-col gap-3 duration-500 ease-in-out`,
        className
      )}
    >
      {currentConfig.map((config: any, index: number) => {
        const isArray = Array.isArray(config);
        const content = isArray ? config : [config];

        return (
          <div
            key={index}
            className={`flex w-full gap-4 ${isClicked ? 'cursor-pointer' : ''} ${!isArray ? 'flex-col' : 'flex-row'}`}
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
                        ? // ||
                          // item.type === 'accordionSelect'
                          errors
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
