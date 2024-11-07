import { getCountries } from '@/helpers/cities';
// import { GetAgencyCatalog } from '@/services/penalty.service';
import { capitalize } from '@/utils/inputHelpers';


export const getAddPenaltyConfig = async (initialData = {}) => {
  return [
    {
      label: 'Type',
      type: 'text',
      required: true,
      name: 'typePenalty',
      defaultValue: initialData.typePenalty || '',  // Ensure the description is pre-filled
    },
    {
      label: 'Location',
      type: 'text',
      required: false,
      name: 'locationPenalty',
      defaultValue: initialData.locationPenalty || '',  // Pre-fill with the extracted location
    },
    {
      label: 'Infraction number',
      type: 'text',  // Using text to support non-numeric characters
      required: false,
      name: 'InfractionNumberPenalty',
      defaultValue: initialData.InfractionNumberPenalty || '',  // Pre-fill with the extracted id_penalty
    },
    {
      label: 'Car',
      type: 'text',
      required: false,
      name: 'CarPenalty',
      defaultValue: initialData.CarPenalty || '',  // Pre-fill with the extracted car registration
    },
    {
      label: 'PRICE',
      type: 'label',
      required: false,
      name: 'PriceLabel',
      style: { fontWeight: 'bold', display: 'block', marginBottom: '10px' },
    },
    {
      label: 'Amount',
      type: 'number',
      required: false,
      name: 'AmountPenalty',
      defaultValue: initialData.AmountPenalty || '',  // Pre-fill with the extracted amount
    },
    {
      label: 'Currency',
      type: 'text',
      required: false,
      name: 'CurrencyPenalty',
      defaultValue: initialData.CurrencyPenalty || '',  // Pre-fill with the extracted currency
    }

  ];
};
