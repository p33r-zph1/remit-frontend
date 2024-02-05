import { z } from 'zod';
import { makeApiSchema } from './api/fetch';

export const orderStatusSchema = z.enum([
  'COMPLETED',
  'IN_PROGRESS',
  'CANCELLED',
  'EXPIRED',
]);

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
]);

export const feesSchema = z.object({
  platformFee: z.number(),
  senderAgentCommission: z.string(),
  recipientAgentCommission: z.string().nullish(),
});

export const transferInfoSchema = z.object({
  amount: z.number(),
  currency: z.string(),
  countryIsoCode: z.string(),
});

export const transferDetailsSchema = z.object({
  sender: transferInfoSchema,
  recipient: transferInfoSchema,
});

export const transferTimelineSchema = z.object({
  title: z.string(),
  description: z.string(),
  dateTime: z.coerce.date(),
  status: transferTimelineStatusSchema,
  orderStatus: orderStatusSchema,
});

export const coordinatesSchema = z.object({
  latitude: z.string(),
  longitude: z.string(),
});

export const radiusSchema = z.object({
  value: z.number(),
  unit: z.string(),
});

export const locationDetailsSchema = z.object({
  startDate: z.coerce.date(),
  endDate: z.coerce.date(),
  areaName: z.string(),
  coordinates: coordinatesSchema,
  radius: radiusSchema,
});

export const contactDetailsSchema = z.object({
  recipient: z.object({ telegram: z.string() }),
  sender: z.object({ telegram: z.string() }),
  senderAgent: z.object({ telegram: z.string() }).optional(),
  recipientAgent: z.object({ telegram: z.string() }).optional(),
});

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
});

const orderApiSchema = makeApiSchema(orderSchema);

export type Order = z.infer<typeof orderSchema>;

export type OrderStatus = z.infer<typeof orderStatusSchema>;

export type TransferTimeline = z.infer<typeof transferTimelineSchema>;

export type TransferTimelineStatus = z.infer<
  typeof transferTimelineStatusSchema
>;

export type TransferInfo = z.infer<typeof transferInfoSchema>;

export default orderApiSchema;
