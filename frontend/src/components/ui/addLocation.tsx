'use client';
import { addLocationAction } from '@/actions/agencies/addLocation.action';
import { addLocationConfig } from '@/forms/agencies/addLocation.config';
import React, { useState } from 'react';

import AddIcon from '../icons/addIcon';
import { RoundedButton } from './buttons';
import { CreateOverlayContainer } from './containers';
import { DynamicForm } from './forms';
import { Text } from './texts';

function AddLocation({ agencyId }: { agencyId: string }) {
  const [isOpen, setIsOpen] = useState(false);
  const addLocationToAgencyConfig = addLocationConfig(agencyId);
  const AddLocationWithConfig = addLocationAction.bind(null, addLocationToAgencyConfig, agencyId);

  return (
    <div className="my-5 mt-10 flex w-full items-center justify-center gap-2">
      <RoundedButton
        onClick={() => {
          setIsOpen(true);
        }}
        className="size-8"
        label={<AddIcon className="size-3" />}
      />
      <Text> Add a location</Text>
      <CreateOverlayContainer setIsOpen={setIsOpen} isOpen={isOpen} title="Add Location">
        <DynamicForm
          overlayIsOpen={isOpen}
          setOverlayIsOpen={setIsOpen}
          config={addLocationToAgencyConfig}
          action={AddLocationWithConfig}
        />
      </CreateOverlayContainer>
    </div>
  );
}

export default AddLocation;
