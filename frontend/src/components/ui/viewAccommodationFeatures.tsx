'use client';
import { capitalize, toComponentName } from '@/utils/inputHelpers';
import { ComponentProps, ComponentType, useState } from 'react';

import * as Icon from '@/components/icons/featuresIcons';

import EyeIcon from '../icons/eyeIcon';
import Button, { RoundedButton } from './buttons';
import { AccordionContainer, EditOverlayContainer } from './containers';

export function ViewAccommodationFeatures({ features }: { features: any[] }) {
  const [containerIsOpen, setContainerIs] = useState(false);

  const uniqueCategories = [...new Set(features.map((feature: any) => feature.category))];
  const categories = uniqueCategories.map((category: any) => ({
    title: capitalize(category).split('_').join(' '),
    value: features.filter((feature: any) => feature.category === category)
  }));
  const [isAccordionOpen, setIsAccordionOpen] = useState(uniqueCategories.map(() => false));
  const handleIsAccordionOpen = (idx: number) => () => {
    const newIsAccordionOpen = [...isAccordionOpen];
    newIsAccordionOpen[idx] = !newIsAccordionOpen[idx];
    setIsAccordionOpen(newIsAccordionOpen);
  };
  const handleClick = () => {
    setContainerIs(!containerIsOpen);
  };

  return (
    <div>
      <RoundedButton
        className="duration-300 ease-in-out hover:scale-110"
        label={<EyeIcon className="flex size-7 shrink-0 grow-0 fill-primary" />}
        onClick={handleClick}
      />
      {containerIsOpen && (
        <EditOverlayContainer title="Features" isOpen={containerIsOpen} setIsOpen={setContainerIs}>
          <div className="flex flex-col gap-3">
            {categories.map((category: any, idx: number) => (
              <AccordionContainer
                key={idx}
                setIsOpen={handleIsAccordionOpen(idx)}
                isOpen={isAccordionOpen[idx]}
                title={category.title}
                inputContainer
              >
                <div className="flex flex-wrap gap-3 p-2">
                  {category?.value?.map((amenity: any, idx: number) => {
                    const IconComponent: ComponentType<ComponentProps<'svg'>> =
                      (Icon as any)[`${toComponentName(amenity.title)}Icon`] || Icon.FeatureIcon;

                    return (
                      <Button
                        className="w-fit"
                        key={idx}
                        label={
                          <div className="mx-2 flex cursor-pointer flex-row items-center justify-center gap-1">
                            <IconComponent className="flex size-8 stroke-black" />
                            <div className="w-fit font-light"> {amenity.title}</div>
                          </div>
                        }
                      />
                    );
                  })}
                </div>
              </AccordionContainer>
            ))}
          </div>
        </EditOverlayContainer>
      )}
    </div>
  );
}

export default ViewAccommodationFeatures;
