import { z } from 'zod';

export const apodSchema = z.object({
  startDate: z.string(),
  endDate: z.string(),
  count: z.number().max(120, { message: 'Count must not exceed 120' }),
})
  .refine((data) => data.endDate >= data.startDate, {
    message: 'End date must be greater than or equal to start date',
    path: ['startDate'],
  });
