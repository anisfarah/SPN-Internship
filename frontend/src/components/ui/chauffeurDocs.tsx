'use client';
import { updateDocumentsAction } from '@/actions/chauffeurs/updateDocument.action';
import { getDocumentConfig } from '@/forms/chauffeurs/updateDocument.config';
import { useAlert } from '@/helpers/alertHelper';
import { ValidateChauffeurDocuments } from '@/services/chauffeurs.service';
import { useRouter } from 'next/navigation';
import React, { useState } from 'react';

import AddIcon from '../icons/addIcon';
import CheckIcon from '../icons/checkIcon';
import EditIcon from '../icons/editIcon';
import XIcon from '../icons/xIcon';
import { RoundedButton } from './buttons';
import { EditOverlayContainer, ImageContainer } from './containers';
import { DynamicForm } from './forms';
import SimpleInput from './inputs';
import { Category, LabelText } from './texts';

function ChauffeurDoc(props: {
  title: string;
  document: any;
  chauffeurId: string;
  valueKey: string;
}) {
  const updateChauffeurDocumentAction = updateDocumentsAction.bind(
    null,
    props.chauffeurId,
    props.valueKey,
    props.document
  );
  const route = useRouter();
  const [isOpen, setIsOpen] = useState(false);
  const [overlayTitle, setOverlayTitle] = useState<string>('');

  const { setAlert } = useAlert();
  const validateDocument = async (isValid: boolean) => {
    const doc = { [`${props.valueKey}`]: { isValid: isValid } };
    const response = await ValidateChauffeurDocuments(props.chauffeurId, doc);
    if (response.status === 200) {
      route.refresh();
    }
    setAlert({ status: response.status, message: response.alert as string });

    return response;
  };

  return (
    <>
      <div className="my-6 flex justify-between">
        <div className="flex items-center gap-2">
          <Category>{props.title} </Category>
          {props.document && (
            <RoundedButton
              className="size-8"
              label={<EditIcon className="size-5" />}
              onClick={() => {
                setIsOpen(true);
                setOverlayTitle('Edit ' + props.title);
              }}
            />
          )}
        </div>
        <div className="flex gap-2">
          {props.document ? (
            props.document?.isValid === null ? (
              <>
                <RoundedButton
                  onClick={() => validateDocument(true)}
                  className="size-8"
                  label={<CheckIcon className="size-5 fill-green" />}
                />
                <RoundedButton
                  onClick={() => validateDocument(false)}
                  className="size-8"
                  label={<XIcon className="size-3 fill-red" />}
                />
              </>
            ) : props.document?.isValid ? (
              <div
                className={`bold flex w-full items-center justify-center gap-2 rounded-3xl bg-greenAccent px-2 font-normal text-green`}
              >
                APPROVED
              </div>
            ) : (
              <div
                className={`bold flex w-full items-center justify-center gap-2 rounded-3xl bg-redAccent px-2 font-normal text-red`}
              >
                REJECTED
              </div>
            )
          ) : (
            <RoundedButton
              className="size-8"
              label={<AddIcon className="size-3" />}
              onClick={() => {
                setIsOpen(true);
                setOverlayTitle('Add ' + props.title);
              }}
            />
          )}
        </div>
      </div>
      {props.document && (
        <div>
          <div className="mb-1 flex flex-col gap-2 lg:flex-row">
            <ImageContainer hideDelete expand image={props.document?.frontView} />
            <ImageContainer hideDelete expand image={props.document?.backView} />
          </div>
          <SimpleInput disabled defaultValue={props.document?.cardNumber} label="" />
        </div>
      )}
      <EditOverlayContainer isOpen={isOpen} setIsOpen={setIsOpen} title={overlayTitle}>
        <DynamicForm
          overlayIsOpen={isOpen}
          setOverlayIsOpen={setIsOpen}
          config={getDocumentConfig(props.valueKey, props.document)}
          action={updateChauffeurDocumentAction}
          withSteps={false}
        />
      </EditOverlayContainer>
    </>
  );
}

export default ChauffeurDoc;
