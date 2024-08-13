const getContactConfig = async (contacts: any[], agencyId: string) => [
  {
    type: 'add',
    name: 'addContact',
    title: 'New Contact',
    addButtonLabel: 'Add Contact',
    updatable: true,
    config: {
      fields: [
        contacts?.map((contact: any, index: any) => ({
          type: 'accordion',
          title: `contact ${index + 1}`,
          config: [
            {
              name: `contact_${index}_name`,
              label: 'Name',
              type: 'text',
              defaultValue: contact?.name || '',
              required: true
            },
            {
              name: `contact_${index}_position`,
              label: 'Position',
              type: 'text',
              defaultValue: contact?.position || '',
              required: true
            },
            {
              type: 'extend',
              name: `contact_${index}_emails`,
              label: 'Emails',
              inputType: 'email',
              required: true,
              config:
                contact?.emails.map((email: any, idx: any) => ({
                  defaultValue: email,
                  name: `contact_${index}_emails_${idx}`,
                  type: 'email',
                  required: true
                })) || []
            },
            {
              type: 'extend',
              name: `contact_${index}_phoneNumbers`,
              inputType: 'phone',
              label: 'Phone Numbers',
              required: true,
              config:
                contact?.phoneNumbers.map((phoneNumber: any, idx: any) => ({
                  initialValue: phoneNumber,
                  name: `contact_${index}_phoneNumbers_${idx}`,
                  type: 'phone',
                  required: true
                })) || []
            }
          ]
        })),

        [
          {
            name: `contact_${contacts.length}_name`,
            label: 'Name',
            placeholder: 'Enter Name',
            type: 'text',
            required: true
          },
          {
            name: `contact_${contacts.length}_position`,
            label: 'Position',
            placeholder: 'Enter Position',
            type: 'text',
            required: true
          },
          {
            type: 'extend',
            name: `contact_${contacts.length}_emails`,
            label: 'Emails',
            required: true,
            inputType: 'email',
            config: [{ type: 'email', name: `contact_${contacts.length}_emails_0`, required: true }]
          },
          {
            type: 'extend',
            name: `contact_${contacts.length}_phoneNumbers`,
            inputType: 'phone',
            required: true,
            label: 'Phone Numbers',
            config: [
              { type: 'phone', name: `contact_${contacts.length}_phoneNumbers_0`, required: true }
            ]
          }
        ]
      ],
      options: { withAccordion: true }
    }
  },
  {
    name: 'id',
    type: 'hidden',
    value: agencyId
  }
];
export default getContactConfig;
