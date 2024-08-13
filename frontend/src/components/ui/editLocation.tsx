'use client';
import { EditAgencyLocationAction } from '@/actions/agencies/editAgencyLocation.action';
import { editAgencyLocationConfig } from '@/forms/agencies/editAgencyLocation.config';
import React, { useState } from 'react';

import EditIcon from '../icons/editIcon';
import { RoundedButton } from './buttons';
import { EditOverlayContainer } from './containers';
import { DynamicForm } from './forms';

function EditLocation({
  location,
  index,
  agencyId
}: {
  location: any;
  index: number;
  agencyId: string;
}) {
  const [isOpen, setIsOpen] = useState(false);
  const editLocationConfig = editAgencyLocationConfig(agencyId, index, location);
  const EditAgencyLocationWithConfig = EditAgencyLocationAction.bind(
    null,
    editLocationConfig,
    agencyId,
    index
  );

  return (
    <>
      <RoundedButton
        label={<EditIcon className="size-4" />}
        onClick={async () => setIsOpen(true)}
        className="group flex size-5 items-center justify-center rounded-full font-text text-2xl hover:fill-primary hover:text-primary"
      />
      <EditOverlayContainer setIsOpen={setIsOpen} isOpen={isOpen} title="Edit Location">
        <DynamicForm
          overlayIsOpen={isOpen}
          setOverlayIsOpen={setIsOpen}
          config={editLocationConfig}
          action={EditAgencyLocationWithConfig}
        />
      </EditOverlayContainer>
    </>
  );
}

export default EditLocation;
