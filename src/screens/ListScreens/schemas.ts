import { z } from 'zod';

export const apodSchema = z.object({
  startDate: z.string(),
  endDate: z.string(),
  useCount: z.boolean(),
  count: z.number(),
})
  .refine((data) => data.endDate >= data.startDate, {
    message: 'End date must be greater than or equal to start date',
    path: ['startDate'],
  });
