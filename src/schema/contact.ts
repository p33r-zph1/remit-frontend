import { z } from 'zod';

const contactLinksSchema = z.object({
  url: z.string().url(),
  deeplink: z.string().url(),
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

export function getSenderContactDetails(contactDetails: ContactDetails) {
  if ('sender' in contactDetails) {
    return contactDetails.sender;
  }

  // recipient is sender
  if ('recipient' in contactDetails) {
    return contactDetails.recipient;
  }

  throw new Error(
    'Expected recipient/sender contact details but none was received.'
  );
}

export function getRecipientContactDetails(contactDetails: ContactDetails) {
  if ('recipient' in contactDetails) {
    return contactDetails.recipient;
  }

  // sender is recipient
  if ('sender' in contactDetails) {
    return contactDetails.sender;
  }

  throw new Error(
    'Expected recipient/sender contact details but none was received.'
  );
}

export function getRecipientAgentContactDetails(
  contactDetails: ContactDetails
) {
  if ('recipientAgent' in contactDetails) {
    return contactDetails.recipientAgent;
  }

  // senderAgent is recipientAgent
  if ('senderAgent' in contactDetails) {
    return contactDetails.senderAgent;
  }

  throw new Error(
    'Expected recipientAgent/senderAgent contact details but none was received.'
  );
}
