import { getCountries } from '@/helpers/cities';
import { GetAgencyCatalog } from '@/services/agency.service';
import { capitalize } from '@/utils/inputHelpers';

// Update the last element's onClick function

export const getAddPenaltyConfig = async () => {
  const { response: agencyCatalogResponse } = await GetAgencyCatalog();
  const agencyCatalogs = agencyCatalogResponse?.data || [];
  const catalogOptions = agencyCatalogs
    .sort()
    .map((item: string) => ({ name: capitalize(item), value: item }));

    return [
        {
          label: 'Type',
          type: 'text',
          required: false,
          name: 'typePenalty'
        },
        {
          label: 'Location',
          type: 'location',
          required: false,
          name: 'locationPenalty'
        },
        {
          label: 'Infraction number',
          type: 'number',
          required: false,
          name: 'InfractionNumberPenalty'
        },
        {
          label: 'Car',
          type: 'text',
          required: false,
          name: 'CarPenalty'
        },
        {
          label: 'PRICE',
          type: 'label',  // Custom type for label
          required: false,
          name: 'PriceLabel',
          style: { fontWeight: 'bold', display: 'block', marginBottom: '10px' }
        },
        {
          label: '',  // This label can be empty or descriptive, it's for the group
          type: 'group',
          name: 'AmountCurrencyGroup',
          fields: [
            {
              label: 'Amount',
              type: 'number',
              required: false,
              name: 'AmountPenalty',
            },
            {
              label: 'Currency',
              type: 'text',
              required: false,
              name: 'CurrencyPenalty',
            }
          ]
        }
      ];
    };