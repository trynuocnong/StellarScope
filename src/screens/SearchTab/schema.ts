import { z } from 'zod';
export type SearchFormValue = z.infer<typeof searchFormSchema>;
export const SEARCH_FORM_FIELDS = {
  START_DATE: 'startDate',
  END_DATE: 'endDate',
} as const;

export const searchFormSchema = z
  .object({
    startDate: z.string(),
    endDate: z.string(),
  })
  .refine((data) => data.endDate >= data.startDate, {
    message: 'End date must be greater than or equal to start date',
    path: ['startDate'],
  });
