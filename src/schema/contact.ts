import { z } from 'zod';

const contactInfoSchema = z.object({
  url: z.string().url(),
  deeplink: z.string().url(),
});

export const contactSchema = z.object({
  telegram: contactInfoSchema,
});

export const crossBorderContactDetailsSchema = z.object({
  sender: contactSchema,
  recipient: contactSchema,
  senderAgent: contactSchema.optional(),
  recipientAgent: contactSchema.optional(),
});

export const crossBorderSelfContactDetailsSchema = z.object({
  sender: contactSchema,
  senderAgent: contactSchema.optional(),
  recipientAgent: contactSchema.optional(),
});

export const localBuyContactDetailsSchema = z.object({
  sender: contactSchema,
  senderAgent: contactSchema,
});

export const localSellContactDetailsSchema = z.object({
  recipient: contactSchema,
  recipientAgent: contactSchema,
});

export type ContactInfo = z.infer<typeof contactInfoSchema>;

export type Contact = z.infer<typeof contactSchema>;
