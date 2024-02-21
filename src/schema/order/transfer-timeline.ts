import { z } from 'zod';

export const transferTimelineStatusSchema = z.enum([
  'PENDING',
  'RECIPIENT_ACCEPTED',
  'RECIPIENT_REJECTED',
  'SENDER_AGENT_ACCEPTED',
  'SENDER_AGENT_REJECTED',
  'RECIPIENT_AGENT_ACCEPTED',
  'RECIPIENT_AGENT_REJECTED',
  'ORDER_ACCEPTED',
  'COLLECTION_MEETUP_SET',
  'CASH_COLLECTED',
  'ESCROW_DEPOSITED',
  'DELIVERY_MEETUP_SET',
  'CASH_DELIVERED',
  'ESCROW_RELEASED',
  'ORDER_EXPIRED',
]);

const transferTimelineSchema = z.object({
  title: z.string(),
  description: z.string(),
  dateTime: z.coerce.date(),
  status: transferTimelineStatusSchema,
});

export type TransferTimeline = z.infer<typeof transferTimelineSchema>;

export type TransferTimelineStatus = z.infer<
  typeof transferTimelineStatusSchema
>;

export function isOrderSettled(status: TransferTimelineStatus) {
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

export default transferTimelineSchema;
