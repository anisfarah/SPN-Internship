import { z } from 'zod';

const phoneNumberSchema = z.object({
  phone: z.string().or(z.literal('')),
  internationalCode: z.object({
    areaCode: z.string(),
    countryCode: z.string()
  })
});
const AddAgencySchema = z.object({
  name: z.string().min(1, { message: 'Agency name is required' }),
  email: z.string().email({ message: 'Please enter a valid email' }).or(z.literal('')).optional(),
  phoneNumber: phoneNumberSchema.optional(),
  website: z.string().optional(),
  country: z.string().or(z.literal('')).optional(),
  cities: z.string().array().optional().or(z.literal('')),
  catalog: z.string().array().optional()
});
export default AddAgencySchema;
export { phoneNumberSchema };
