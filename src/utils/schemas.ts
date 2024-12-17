import { z } from 'zod';

export const entrySchema = z.object({
  name: z
    .string()
    .min(5, { message: 'Name must be at least 5 characters long' })
    .max(150, { message: 'Name can be maximum 150 characters long.' }),
  description: z
    .string()
    .min(5, { message: 'Description must be at least 5 characters long.' })
    .max(250, { message: 'Description can be maximum 250 characters long.' })
});
