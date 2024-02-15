import { isAddress } from 'viem';
import { z } from 'zod';

import { isSupportedChain } from '@/src/utils';

import { makeApiSchema } from './api/fetch';
import contactSchema from './contact';

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

export const commissionDetailsSchema = z.object({
  commission: z.number(),
  amount: z.number(),
  token: z.string(),
});

export const feesSchema = z.object({
  platform: commissionDetailsSchema,
  senderAgent: commissionDetailsSchema,
  recipientAgent: commissionDetailsSchema.nullish(),
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

export const contactInfoSchema = z.object({
  url: z.string().url(),
  deeplink: z.string().url(),
});

export const contactDetailsSchema = z.object({
  recipient: contactSchema,
  sender: contactSchema,
  senderAgent: contactSchema.optional(),
  recipientAgent: contactSchema.optional(),
});

export const escrowDetailsSchema = z.object({
  amount: z.number(),
  token: z.string(),
  tokenAddress: z.string().refine(isAddress).optional(),
  tokenDecimals: z.number().optional(),
  chain: z.string().optional(),
  chainId: z.coerce.number().refine(isSupportedChain).optional(),
  escrow: z.string().refine(isAddress).optional(),
  depositTransaction: z.string().url().optional(),
  releaseTransaction: z.string().url().optional(),
  refundTransaction: z.string().url().optional(),
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
  escrowDetails: escrowDetailsSchema,
});

const orderApiSchema = makeApiSchema(orderSchema);

export type Order = z.infer<typeof orderSchema>;

export type OrderStatus = z.infer<typeof orderStatusSchema>;

export type TransferTimeline = z.infer<typeof transferTimelineSchema>;

export type TransferTimelineStatus = z.infer<
  typeof transferTimelineStatusSchema
>;

export type TransferInfo = z.infer<typeof transferInfoSchema>;

export type LocationDetails = z.infer<typeof locationDetailsSchema>;

export default orderApiSchema;
