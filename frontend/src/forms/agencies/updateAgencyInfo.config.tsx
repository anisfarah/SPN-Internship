import { GetAgencyCatalog } from '@/services/agency.service';
import { capitalize } from '@/utils/inputHelpers';

async function getUpdateAgencyInfoConfigFromData(agencyData: any) {
  const response = await GetAgencyCatalog();
  const agencyCatalog = response?.response?.data || [];
  const catalogOptions = agencyCatalog
    .sort()
    .map((item: string) => ({ name: capitalize(item), value: item }));

  return [
    {
      type: 'hidden',
      required: true,
      name: 'id',
      value: agencyData?._id
    },
    {
      label: 'Name',
      type: 'text',
      placeholder: 'Agency Name',
      required: true,
      name: 'name',
      defaultValue: agencyData?.name
    },
    {
      label: 'Email',
      type: 'email',
      placeholder: 'Email',
      required: false,
      name: 'email',
      defaultValue: agencyData?.email
    },
    {
      label: 'Phone number',
      type: 'phone',
      placeholder: 'Phone number',
      required: false,
      name: 'phoneNumber',
      initialValue: agencyData?.phoneNumber
    },
    {
      label: 'Website',
      type: 'text',
      placeholder: 'Website',
      required: false,
      name: 'website',
      defaultValue: agencyData?.website
    },
    {
      label: 'Catalog',
      type: 'select',
      required: false,
      name: 'catalog',
      options: catalogOptions,
      isInner: true,
      multiple: true,
      defaultValue: agencyData?.catalog?.map((item: any) => {
        return { name: capitalize(item), value: item };
      })
    }
  ];
}

export default getUpdateAgencyInfoConfigFromData;
