import { z } from 'zod';

export const baseTimelineStatusSchema = z.enum([
  'PENDING',
  'ESCROW_DEPOSITED',
  'ESCROW_RELEASED',

  // Negative statuses
  'ORDER_EXPIRED',
]);

export const crossBorderTimelineStatusSchema = z.enum([
  ...baseTimelineStatusSchema.options,
  'RECIPIENT_ACCEPTED',
  'SENDER_AGENT_ACCEPTED',
  'RECIPIENT_AGENT_ACCEPTED',
  'ORDER_ACCEPTED',
  'COLLECTION_MEETUP_SET',
  'CASH_COLLECTED',
  'DELIVERY_MEETUP_SET',
  'CASH_DELIVERED',

  // Negative statuses
  'RECIPIENT_REJECTED',
  'SENDER_AGENT_REJECTED',
  'RECIPIENT_AGENT_REJECTED',
]);

export const crossBorderSelfTimelineStatusSchema = z.enum([
  ...baseTimelineStatusSchema.options,
  'SENDER_AGENT_ACCEPTED',
  'RECIPIENT_AGENT_ACCEPTED',
  'ORDER_ACCEPTED',
  'COLLECTION_MEETUP_SET',
  'CASH_COLLECTED',

  'SENDER_ARRIVED',
  'DELIVERY_MEETUP_SET',
  'CASH_DELIVERED',

  // Negative statuses
  'SENDER_AGENT_REJECTED',
  'RECIPIENT_AGENT_REJECTED',
]);

export const localBuyTimelineStatusSchema = z.enum([
  ...baseTimelineStatusSchema.options,
  'SENDER_AGENT_ACCEPTED',
  'COLLECTION_MEETUP_SET',
  'CASH_COLLECTED',

  // Negative statuses
  'SENDER_AGENT_REJECTED',
]);

export const localSellTimelineStatusSchema = z.enum([
  ...baseTimelineStatusSchema.options,
  'RECIPIENT_AGENT_ACCEPTED',
  'DELIVERY_MEETUP_SET',
  'CASH_DELIVERED',

  // Negative statuses
  'RECIPIENT_AGENT_REJECTED',
]);

const baseTimelineSchema = z.object({
  title: z.string(),
  description: z.string(),
  dateTime: z.coerce.date(),
});

export const crossBorderTimelineSchema = baseTimelineSchema.extend({
  status: crossBorderTimelineStatusSchema,
});

export const crossBorderSelfTimelineSchema = baseTimelineSchema.extend({
  status: crossBorderSelfTimelineStatusSchema,
});

export const localBuyTimelineSchema = baseTimelineSchema.extend({
  status: localBuyTimelineStatusSchema,
});

export const localSellTimelineSchema = baseTimelineSchema.extend({
  status: localSellTimelineStatusSchema,
});

export type CrossBorderTimelineStatus = z.infer<
  typeof crossBorderTimelineStatusSchema
>;

export type CrossBorderSelfTimelineStatus = z.infer<
  typeof crossBorderSelfTimelineStatusSchema
>;

export type LocalBuyTimelineStatus = z.infer<
  typeof localBuyTimelineStatusSchema
>;

export type LocalSellTimelineStatus = z.infer<
  typeof localSellTimelineStatusSchema
>;

export type TimelineStatus =
  | CrossBorderTimelineStatus
  | CrossBorderSelfTimelineStatus
  | LocalBuyTimelineStatus
  | LocalSellTimelineStatus;

export type Timeline = z.infer<typeof baseTimelineSchema> & {
  status: TimelineStatus;
};

export function isOrderSettled(status: TimelineStatus) {
  switch (status) {
    case 'RECIPIENT_REJECTED':
    case 'RECIPIENT_AGENT_REJECTED':
    case 'SENDER_AGENT_REJECTED':
    case 'ESCROW_RELEASED':
      return true;

    case 'ORDER_EXPIRED':
    default:
      return false;
  }
}

export default baseTimelineSchema;
