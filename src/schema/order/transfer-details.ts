import { z } from 'zod';

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

export type TranferDetails =
  | CrossBorderTransferDetails
  | CrossBorderSelfTransferDetails
  | LocalBuyTransferDetails
  | LocalSellTransferDetails;

export function getSenderTransferDetails(transferDetails: TranferDetails) {
  if ('sender' in transferDetails) {
    return transferDetails.sender;
  }

  // recipient is same as sender
  if ('recipient' in transferDetails) {
    return transferDetails.recipient;
  }

  throw new Error(
    'Expected recipient/sender transfer info but none was received.'
  );
}

export function getRecipientTransferDetails(transferDetails: TranferDetails) {
  if ('recipient' in transferDetails) {
    return transferDetails.recipient;
  }

  // sender is same as recipient
  if ('sender' in transferDetails) {
    return transferDetails.sender;
  }

  throw new Error(
    'Expected recipient/sender transfer info but none was received.'
  );
}
