import { z } from 'zod';

import type { Order } from '../order';
import transferInfoSchema from './transfer-info';

export const crossBorderTransferDetailsSchema = z.object({
  sender: transferInfoSchema,
  recipient: transferInfoSchema,
});

export const crossBorderSelfTransferDetailsSchema = z.object({
  sender: transferInfoSchema,
  recipient: transferInfoSchema,
});

export const localBuyTransferDetailsSchema = z.object({
  sender: transferInfoSchema,
});

export const localSellTransferDetailsSchema = z.object({
  recipient: transferInfoSchema,
});

export type CrossBorderTransferDetails = z.infer<
  typeof crossBorderTransferDetailsSchema
>;

export type CrossBorderSelfTransferDetails = z.infer<
  typeof crossBorderSelfTransferDetailsSchema
>;

export type LocalBuyTransferDetails = z.infer<
  typeof localBuyTransferDetailsSchema
>;

export type LocalSellTransferDetails = z.infer<
  typeof localSellTransferDetailsSchema
>;

export type TransferDetails =
  | CrossBorderTransferDetails
  | CrossBorderSelfTransferDetails
  | LocalBuyTransferDetails
  | LocalSellTransferDetails;

export function getTransferInfo(order: Order, isRecipientCustomer: boolean) {
  switch (order.orderType) {
    case 'CROSS_BORDER_REMITTANCE':
    case 'CROSS_BORDER_SELF_REMITTANCE':
      return isRecipientCustomer
        ? order.transferDetails.recipient
        : order.transferDetails.sender;

    case 'LOCAL_BUY_STABLECOINS':
      return order.transferDetails.sender; // sender is recipient

    case 'LOCAL_SELL_STABLECOINS':
      return order.transferDetails.recipient; // recipient is sender
  }
}
