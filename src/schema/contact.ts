import { z } from 'zod';

const contactLinksSchema = z.object({
  url: z.string().url(),
  deeplink: z.string().url(),
  handle: z.string().optional(),
});

export const contactSchema = z.object({
  telegram: contactLinksSchema,
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

export type ContactLinks = z.infer<typeof contactLinksSchema>;

export type Contact = z.infer<typeof contactSchema>;

export type CrossBorderContactDetails = z.infer<
  typeof crossBorderContactDetailsSchema
>;

export type CrossBorderSelfContactDetails = z.infer<
  typeof crossBorderSelfContactDetailsSchema
>;

export type LocalBuyContactDetails = z.infer<
  typeof localBuyContactDetailsSchema
>;

export type LocalSellContactDetails = z.infer<
  typeof localSellContactDetailsSchema
>;

export type ContactDetails =
  | CrossBorderContactDetails
  | CrossBorderSelfContactDetails
  | LocalBuyContactDetails
  | LocalSellContactDetails;
