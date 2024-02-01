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
  'COLLECTION_MEETUP_SET',
  'CASH_COLLECTED',
  'ESCROW_DEPOSITED',
  'DELIVERY_MEETUP_SET',
  'CASH_DELIVERED',
  'ESCROW_RELEASED',
]);

export const feesSchema = z.object({
  platformFee: z.number(),
  senderAgentCommission: z.number(),
  recipientAgentCommission: z.number().optional(),
});

export const transferInfoSchema = z.object({
  amount: z.number(),
  currency: z.string(),
});

export const transferDetailsSchema = z.object({
  sender: transferInfoSchema,
  recipient: transferInfoSchema,
});

export const transferTimelineSchema = z.object({
  dateTime: z.string(),
  description: z.string(),
  status: transferTimelineStatusSchema,
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
  startDate: z.string(),
  endDate: z.string(),
  areaName: z.string(),
  coordinates: coordinatesSchema,
  radius: radiusSchema,
});

export const orderSchema = z.object({
  orderId: z.string(),
  createdAt: z.string(),
  updatedAt: z.string(),
  expiresAt: z.string(),
  senderId: z.string(),
  recipientId: z.string(),
  senderAgentId: z.string(),
  recipientAgentId: z.string().optional(),
  orderStatus: orderStatusSchema,
  transferTimelineStatus: transferTimelineStatusSchema,
  fees: feesSchema,
  priceOracleRates: z.record(z.string(), z.number()),
  transferDetails: transferDetailsSchema,
  transferTimeline: z.array(transferTimelineSchema),
  collectionDetails: locationDetailsSchema.optional(),
  deliveryDetails: locationDetailsSchema.optional(),
});

export const paginatedOrdersSchema = z.object({
  orders: z.array(orderSchema),
  pageSize: z.number(),
  pageNumber: z.number(),
  totalItems: z.number(),
  totalPages: z.number(),
  hasNextPage: z.boolean(),
  hasPreviousPage: z.boolean(),
});

const orderApiSchema = makeApiSchema(orderSchema);

export type Order = z.infer<typeof orderSchema>;

export default orderApiSchema;
