import { z } from 'zod';

import { phoneNumberSchema } from './addAgency.validation';

const updateAgencyInfoSchema = z.object({
  name: z.string().min(1, { message: 'Name is required' }),
  email: z.string().email({ message: 'Please enter a valid email' }).optional(),
  phoneNumber: phoneNumberSchema.optional(),
  website: z.string().optional(),
  catalog: z.string().array().optional()
});
const updateAgencyRatingsSchema = z.object({
  qualityOfService: z.coerce
    .number()
    .min(0, { message: 'Please give the quality of service a rating' })
    .max(5, { message: 'Please give the quality of service a rating' })
    .optional(),
  responseTime: z.coerce
    .number()
    .min(0, { message: 'Please give the response time a rating' })
    .max(5, { message: 'Please give the response time a rating' })
    .optional(),
  trust: z.coerce
    .number()
    .min(0, { message: 'Please give the trust a rating' })
    .max(5, { message: 'Please give the trust a rating' })
    .optional(),
  prices: z.coerce
    .number()
    .min(0, { message: 'Please give the prices a rating' })
    .max(5, { message: 'Please give the prices a rating' })
    .optional()
});
const commentValidationSchema = z.object({
  comment: z.string().min(1, { message: 'you cannot leave an empty comment' })
});
const locationSchema = z.object({
  location: z.object({
    country: z.string().min(1, { message: 'Country is required' }),
    cities: z.string().array().min(1, { message: 'City is required' })
  })
});

const updateContactSchema = z.object({
  contact: z
    .object({
      name: z.string().min(1, { message: 'name is required' }),
      position: z.string().min(1, { message: 'position is required' }),
      emails: z.string().min(1, { message: 'email is required' }).array().optional(),
      phoneNumbers: phoneNumberSchema.array().min(1, { message: 'phone Number is required' })
    })
    .array()
});

export default updateAgencyInfoSchema;
export { updateAgencyRatingsSchema, locationSchema, commentValidationSchema, updateContactSchema };
