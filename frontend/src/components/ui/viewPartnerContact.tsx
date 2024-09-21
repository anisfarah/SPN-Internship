'use client';
import { useState } from 'react';

import ContactIcon from '../icons/ContactIcon';
import { RoundedButton } from './buttons';
import { AccordionContainer, EditOverlayContainer } from './containers';
import SimpleInput, { PhoneInput } from './inputs';
import { LabelText } from './texts';

function ViewPartnerContact({
  contactList,
  agencyName
}: {
  contactList: any[];
  agencyName: string;
}) {
  const [containerIsOpen, setContainerIs] = useState(false);
  const [isAccordionOpen, setIsAccordionOpen] = useState(contactList.map(() => false));
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
        label={<ContactIcon className="flex size-7 shrink-0 grow-0 fill-primary" />}
        onClick={handleClick}
      />
      {containerIsOpen && (
        <EditOverlayContainer
          title={`${agencyName} Contact`}
          isOpen={containerIsOpen}
          setIsOpen={setContainerIs}
        >
          <div className="flex flex-col gap-3">
            {contactList.map((contact: any, idx: number) => (
              <AccordionContainer
                key={idx}
                setIsOpen={handleIsAccordionOpen(idx)}
                isOpen={isAccordionOpen[idx]}
                title={`contact ${idx + 1}`}
                inputContainer
              >
                <div className="flex flex-col gap-3 p-2">
                  <SimpleInput
                    disabled
                    readOnly
                    className="w-full"
                    label="Name"
                    defaultValue={contact.name}
                  />
                  <SimpleInput
                    disabled
                    readOnly
                    className="w-full"
                    label="Position"
                    defaultValue={contact.position}
                  />
                  <LabelText label="Emails" />
                  <div className="-mt-4 flex flex-wrap gap-3">
                    {contact.emails &&
                      contact.emails.map((email: any, idx: number) => (
                        <div className="w-full max-w-[49%] items-end" key={idx}>
                          <SimpleInput disabled readOnly label="" key={idx} defaultValue={email} />
                        </div>
                      ))}
                  </div>
                  <LabelText label="Phone numbers" />
                  <div className="-mt-4 flex flex-wrap gap-3">
                    {contact.phoneNumbers &&
                      contact.phoneNumbers.map((phoneNumber: any, idx: number) => (
                        <div className="w-full max-w-[49%] items-end" key={idx}>
                          <PhoneInput
                            disabled
                            readOnly
                            label=""
                            name="phoneNumber"
                            key={idx}
                            initialValue={phoneNumber}
                          />
                        </div>
                      ))}
                  </div>
                </div>
              </AccordionContainer>
            ))}
          </div>
        </EditOverlayContainer>
      )}
    </div>
  );
}

export default ViewPartnerContact;
