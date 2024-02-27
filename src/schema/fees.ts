import { numericFormatter } from 'react-number-format';
import { z } from 'zod';

import type { Agent } from './agent';

const commissionDetailsSchema = z.object({
  commission: z.number(),
  amount: z.number(),
  token: z.string(),
});

const baseFeesSchema = z.object({
  platform: commissionDetailsSchema,
});

export const crossBorderFeesSchema = baseFeesSchema.extend({
  senderAgent: commissionDetailsSchema,
  recipientAgent: commissionDetailsSchema.nullish(), // FIXME: is it really nullish?
});

export const crossBorderSelfFeesSchema = baseFeesSchema.extend({
  senderAgent: commissionDetailsSchema,
  recipientAgent: commissionDetailsSchema,
});

export const localBuyFeesSchema = baseFeesSchema.extend({
  senderAgent: commissionDetailsSchema,
});

export const localSellFeesSchema = baseFeesSchema.extend({
  recipientAgent: commissionDetailsSchema,
});

type CommissionDetails = z.infer<typeof commissionDetailsSchema>;

export type CrossBorderFees = z.infer<typeof crossBorderFeesSchema>;

export type CrossBorderSelfFees = z.infer<typeof crossBorderSelfFeesSchema>;

export type LocalBuyFees = z.infer<typeof localBuyFeesSchema>;

export type LocalSellFees = z.infer<typeof localSellFeesSchema>;

export type Fees =
  | CrossBorderFees
  | CrossBorderSelfFees
  | LocalBuyFees
  | LocalSellFees;

export function formatCommissionDetails({ amount, token }: CommissionDetails) {
  return numericFormatter(`${amount} ${token}`, {
    thousandSeparator: ',',
  });
}

export function calculateFees({
  amount,
  precision,
  exchangeRate,
  platformFee,
  agent,
}: {
  amount: number;
  precision: number;
  exchangeRate: number;
  platformFee: number;
  agent: Agent | undefined;
}) {
  // Calculate the initial fiat value
  let fiatAmount = amount * exchangeRate;

  // If an agent is involved, apply their commission fee
  if (agent) {
    fiatAmount -= fiatAmount * (agent.commission / 100);
  }

  // Apply platform fee
  fiatAmount -= fiatAmount * (platformFee / 100);

  // Return the final amount
  return fiatAmount === 0 ? '' : String(fiatAmount.toFixed(precision));
}

export function calculateAgentFee(amount: number, agent: Agent): string {
  // Calculate the commission amount
  const commissionAmount = amount * (agent.commission / 100);

  // Apply the commission fee
  const fiatAmount = amount - commissionAmount;

  // Return the final amount
  return fiatAmount === 0 ? '' : String(fiatAmount);
}

export function getRecipientAgentFees(fees: Fees) {
  if ('recipientAgent' in fees) {
    return fees.recipientAgent;
  }

  // senderAgent is recipients agent
  if ('senderAgent' in fees) {
    return fees.senderAgent;
  }

  throw new Error(
    'Expected recipientAgent/senderAgent fees but none was received.'
  );
}

export default baseFeesSchema;
