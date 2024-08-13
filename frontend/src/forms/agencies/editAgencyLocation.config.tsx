import { getCountries } from '@/helpers/cities';

export const editAgencyLocationConfig = (agencyId: string, index: number, location: any) => [
  { name: 'id', type: 'hidden', value: agencyId },
  { name: 'index', type: 'hidden', value: index },
  {
    type: 'cities',
    required: true,
    name: 'location',
    options: getCountries(),
    defaultValue: location
  }
];
