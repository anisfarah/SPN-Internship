import { getCountries } from '@/helpers/cities';
// import { GetAgencyCatalog } from '@/services/penalty.service';
import { capitalize } from '@/utils/inputHelpers';


export const getAddPenaltyConfig = async () => {
  // const { response: agencyCatalogResponse } = await GetAgencyCatalog();
  // const agencyCatalogs = agencyCatalogResponse?.data || [];
  // const catalogOptions = agencyCatalogs
  //   .sort()
  //   .map((item: string) => ({ name: capitalize(item), value: item }));

  return [
    {
      label: 'Type',
      type: 'text',
      required: true,
      name: 'typePenalty'
    },
    {
      label: 'Location',
      type: 'text',
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
      label: '',
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

type FormFieldConfig = {
  label: string;
  type: string;
  required: boolean;
  name: string;
  style?: React.CSSProperties;
  fields?: FormFieldConfig[];
};
