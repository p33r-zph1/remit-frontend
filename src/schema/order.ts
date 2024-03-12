import { z } from 'zod';

import { makeApiSchema } from './api/fetch';
import {
  crossBorderContactDetailsSchema,
  crossBorderSelfContactDetailsSchema,
  localBuyContactDetailsSchema,
  localSellContactDetailsSchema,
} from './contact';
import escrowDetailsSchema from './escrow';
import {
  crossBorderFeesSchema,
  crossBorderSelfFeesSchema,
  localBuyFeesSchema,
  localSellFeesSchema,
} from './fees';
import locationDetailsSchema from './location';
import {
  crossBorderSelfTransferDetailsSchema,
  crossBorderTransferDetailsSchema,
  localBuyTransferDetailsSchema,
  localSellTransferDetailsSchema,
} from './order/transfer-details';
import {
  crossBorderSelfTimelineSchema,
  crossBorderSelfTimelineStatusSchema,
  crossBorderTimelineSchema,
  crossBorderTimelineStatusSchema,
  localBuyTimelineSchema,
  localBuyTimelineStatusSchema,
  localSellTimelineSchema,
  localSellTimelineStatusSchema,
} from './order/transfer-timeline';

export const orderStatusSchema = z.enum([
  'COMPLETED',
  'IN_PROGRESS',
  'CANCELLED',
  'EXPIRED',
]);

export const crossBorderLiteral = z.literal('CROSS_BORDER_REMITTANCE');
export const crossBorderSelfLiteral = z.literal('CROSS_BORDER_SELF_REMITTANCE');
export const localBuyLiteral = z.literal('LOCAL_BUY_STABLECOINS');
export const localSellLiteral = z.literal('LOCAL_SELL_STABLECOINS');

export const orderTypeSchema = z.union([
  crossBorderLiteral,
  crossBorderSelfLiteral,
  localBuyLiteral,
  localSellLiteral,
]);

export const baseOrderSchema = z.object({
  orderId: z.string(),
  createdAt: z.coerce.date(),
  updatedAt: z.coerce.date(),
  expiresAt: z.coerce.date(),
  orderStatus: orderStatusSchema,
  priceOracleRates: z.record(z.string(), z.number()),
  escrowDetails: escrowDetailsSchema,
});

export const crossBorderSchema = baseOrderSchema.extend({
  senderId: z.string(),
  recipientId: z.string(),
  senderAgentId: z.string(),
  recipientAgentId: z.string().optional(),
  fees: crossBorderFeesSchema,
  transferTimelineStatus: crossBorderTimelineStatusSchema,
  transferTimeline: z.array(crossBorderTimelineSchema),
  transferDetails: crossBorderTransferDetailsSchema,
  collectionDetails: locationDetailsSchema.optional(),
  deliveryDetails: locationDetailsSchema.optional(),
  contactDetails: crossBorderContactDetailsSchema,
});

export const crossBorderSelfSchema = baseOrderSchema.extend({
  senderId: z.string(),
  senderAgentId: z.string(),
  recipientAgentId: z.string(),
  arrivesAt: z.coerce.date(),
  fees: crossBorderSelfFeesSchema,
  transferTimelineStatus: crossBorderSelfTimelineStatusSchema,
  transferTimeline: z.array(crossBorderSelfTimelineSchema),
  transferDetails: crossBorderSelfTransferDetailsSchema,
  collectionDetails: locationDetailsSchema.optional(),
  deliveryDetails: locationDetailsSchema.optional(),
  contactDetails: crossBorderSelfContactDetailsSchema,
});

export const localBuySchema = baseOrderSchema.extend({
  senderId: z.string(),
  senderAgentId: z.string(),
  fees: localBuyFeesSchema,
  transferTimelineStatus: localBuyTimelineStatusSchema,
  transferTimeline: z.array(localBuyTimelineSchema),
  transferDetails: localBuyTransferDetailsSchema,
  collectionDetails: locationDetailsSchema.optional(),
  contactDetails: localBuyContactDetailsSchema,
});

export const localSellSchema = baseOrderSchema.extend({
  recipientId: z.string(),
  recipientAgentId: z.string(),
  fees: localSellFeesSchema,
  transferTimelineStatus: localSellTimelineStatusSchema,
  transferTimeline: z.array(localSellTimelineSchema),
  transferDetails: localSellTransferDetailsSchema,
  deliveryDetails: locationDetailsSchema.optional(),
  contactDetails: localSellContactDetailsSchema,
});

export const orderSchema = z.discriminatedUnion('orderType', [
  crossBorderSchema.extend({ orderType: crossBorderLiteral }),

  crossBorderSelfSchema.extend({ orderType: crossBorderSelfLiteral }),

  localBuySchema.extend({ orderType: localBuyLiteral }),

  localSellSchema.extend({ orderType: localSellLiteral }),
]);

const orderApiSchema = makeApiSchema(orderSchema);

export type Order = z.infer<typeof orderSchema>;

export type CrossBorderOrder = z.infer<typeof crossBorderSchema>;

export type CrossBorderSelfOrder = z.infer<typeof crossBorderSelfSchema>;

export type LocalBuyOrder = z.infer<typeof localBuySchema>;

export type LocalSellOrder = z.infer<typeof localSellSchema>;

export type OrderApi = z.infer<typeof orderApiSchema>;

export type OrderStatus = z.infer<typeof orderStatusSchema>;

export type OrderType = z.infer<typeof orderTypeSchema>;

export function getRecipient(order: Order) {
  switch (order.orderType) {
    case 'CROSS_BORDER_REMITTANCE':
    case 'LOCAL_SELL_STABLECOINS':
      return order.recipientId;

    case 'CROSS_BORDER_SELF_REMITTANCE':
    case 'LOCAL_BUY_STABLECOINS':
      return order.senderId; // sender is recipient
  }
}

export function isUserRecipient(order: Order, userId: string | undefined) {
  return getRecipient(order) === userId;
}

export function getRecipientAgent(order: Order) {
  switch (order.orderType) {
    case 'CROSS_BORDER_REMITTANCE':
    case 'CROSS_BORDER_SELF_REMITTANCE':
    case 'LOCAL_SELL_STABLECOINS':
      return order.recipientAgentId;

    case 'LOCAL_BUY_STABLECOINS':
      return false; // only senderAgentId

    // FIXME: is this safe to remove
    // case 'LOCAL_BUY_STABLECOINS':
    //   return order.senderAgentId; // senderAgent is recipientAgent
  }
}

export function isUserRecipientAgent(order: Order, userId: string | undefined) {
  return getRecipientAgent(order) === userId;
}

export function getOrderDetails(
  order: Order,
  isRecipientCustomer: boolean,
  isRecipientAgent: boolean
) {
  switch (order.orderType) {
    case 'CROSS_BORDER_REMITTANCE':
    case 'CROSS_BORDER_SELF_REMITTANCE':
      return isRecipientCustomer
        ? order.transferDetails.recipient
        : isRecipientAgent
          ? order.escrowDetails
          : order.transferDetails.sender;

    case 'LOCAL_BUY_STABLECOINS':
      return isRecipientCustomer
        ? order.escrowDetails
        : order.transferDetails.sender;

    case 'LOCAL_SELL_STABLECOINS':
      return isRecipientCustomer
        ? order.transferDetails.recipient
        : order.escrowDetails;
  }
}

export default orderApiSchema;
