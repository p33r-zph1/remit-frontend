import { z } from 'zod';

const contactInfoSchema = z.object({
  url: z.string().url(),
  deeplink: z.string().url(),
});

export const contactSchema = z.object({
  telegram: contactInfoSchema,
});

const contactDetailsSchema = z.object({
  recipient: contactSchema,
  sender: contactSchema,
  senderAgent: contactSchema.optional(),
  recipientAgent: contactSchema.optional(),
});

export type ContactInfo = z.infer<typeof contactInfoSchema>;

export type Contact = z.infer<typeof contactSchema>;

export default contactDetailsSchema;
