import { z } from 'zod';

const AddPenaltySchema = z.object({
  typePenalty: z.string().optional(),
  locationPenalty: z.string().optional(),
  InfractionNumberPenalty: z.number().optional(),
  CarPenalty: z.string().optional(),
  AmountPenalty: z.number().optional(),
  CurrencyPenalty: z.string().optional()
});

export default AddPenaltySchema;
