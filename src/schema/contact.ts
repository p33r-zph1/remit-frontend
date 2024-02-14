import { z } from 'zod';

export const contactInfoSchema = z.object({
  url: z.string().url(),
  deeplink: z.string().url(),
});

const contactSchema = z.object({
  telegram: contactInfoSchema,
});

export type ContactInfo = z.infer<typeof contactInfoSchema>;

export type Contact = z.infer<typeof contactSchema>;

export default contactSchema;
