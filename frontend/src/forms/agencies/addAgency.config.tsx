import { getCountries } from '@/helpers/cities';
import { GetAgencyCatalog } from '@/services/agency.service';
import { capitalize } from '@/utils/inputHelpers';

// Update the last element's onClick function

export const getAddAgencyConfig = async () => {
  const { response: agencyCatalogResponse } = await GetAgencyCatalog();
  const agencyCatalogs = agencyCatalogResponse?.data || [];
  const catalogOptions = agencyCatalogs
    .sort()
    .map((item: string) => ({ name: capitalize(item), value: item }));

  return [
    {
      label: 'Name',
      type: 'text',
      required: true,
      name: 'name'
    },
    {
      label: 'Email',
      type: 'email',
      required: false,
      name: 'email'
    },
    {
      label: 'Phone number',
      type: 'phone',
      required: false,
      name: 'phoneNumber'
    },
    {
      label: 'Website',
      type: 'text',
      required: false,
      name: 'website'
    },
    {
      label: 'Catalog',
      type: 'select',
      multiple: true,
      options: catalogOptions,
      required: false,
      name: 'catalog'
    },
    {
      label: 'Country',
      type: 'cities',
      isInner: true,
      withAddButton: true,
      options: getCountries(),
      name: 'locations'
    }
  ];
};
