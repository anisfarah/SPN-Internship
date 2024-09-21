import { getCountries } from '@/helpers/cities';

export const addLocationConfig = (agencyId: string) => [
  { name: 'id', type: 'hidden', value: agencyId },
  { type: 'cities', name: 'location', options: getCountries() }
];
