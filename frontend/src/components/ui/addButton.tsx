'use client';
import { addUserAction } from '@/actions/users/addUser.action';
import React, { useState } from 'react';

import data from '../../data/users/users.json';
import AddIcon from '../icons/addIcon';
import { RoundedButton } from './buttons';
import { CreateOverlayContainer } from './containers';
import { DynamicForm } from './forms';

function AddButton(props: { title: string; action: any; config: any }) {
  const [isOpen, setIsOpen] = useState(false);
  const addUserConfig = data.forms.addUser;

  return (
    <>
      <RoundedButton
        label={<AddIcon className="size-3" />}
        onClick={async () => setIsOpen(true)}
        className="group flex size-10 items-center justify-center rounded-full font-text text-2xl hover:fill-primary hover:text-primary"
      />
      <CreateOverlayContainer
        setIsOpen={setIsOpen}
        isOpen={isOpen}
        title={props.title || `${data.texts.add_user}`}
      >
        <DynamicForm
          overlayIsOpen={isOpen}
          setOverlayIsOpen={setIsOpen}
          config={props.config || addUserConfig}
          action={props.action || addUserAction}
          withSteps={false}
        />
      </CreateOverlayContainer>
    </>
  );
}

export default AddButton;
