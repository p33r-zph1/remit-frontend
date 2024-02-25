import { z } from 'zod';

import { makeApiSchema } from './api/fetch';
import contactDetailsSchema from './contact';
import escrowDetailsSchema from './escrow';
import feesSchema from './fees';
import locationDetailsSchema from './location';
import transferDetailsSchema from './order/transfer-details';
import transferTimelineSchema, {
  transferTimelineStatusSchema,
} from './order/transfer-timeline';

export const orderStatusSchema = z.enum([
  'COMPLETED',
  'IN_PROGRESS',
  'CANCELLED',
  'EXPIRED',
]);

export const orderTypeSchema = z.enum(
  [
    'CROSS_BORDER_REMITTANCE',
    'CROSS_BORDER_SELF_REMITTANCE',
    'LOCAL_SELL_STABLECOINS',
    'LOCAL_BUY_STABLECOINS',
  ],
  { required_error: 'Please select your order type' }
);

export const orderSchema = z.object({
  orderId: z.string(),
  createdAt: z.coerce.date(),
  updatedAt: z.coerce.date(),
  expiresAt: z.coerce.date(),
  senderId: z.string(),
  recipientId: z.string(),
  senderAgentId: z.string(),
  recipientAgentId: z.string().optional(),
  orderStatus: orderStatusSchema,
  transferTimelineStatus: transferTimelineStatusSchema,
  contactDetails: contactDetailsSchema,
  fees: feesSchema,
  priceOracleRates: z.record(z.string(), z.number()),
  transferDetails: transferDetailsSchema,
  transferTimeline: z.array(transferTimelineSchema),
  collectionDetails: locationDetailsSchema.optional(),
  deliveryDetails: locationDetailsSchema.optional(),
  escrowDetails: escrowDetailsSchema,
  orderType: orderTypeSchema,
});

const orderApiSchema = makeApiSchema(orderSchema);

export type Order = z.infer<typeof orderSchema>;

export type OrderApi = z.infer<typeof orderApiSchema>;

export type OrderStatus = z.infer<typeof orderStatusSchema>;

export type OrderType = z.infer<typeof orderTypeSchema>;

export default orderApiSchema;
