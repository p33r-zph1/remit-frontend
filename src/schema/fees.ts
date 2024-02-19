import { numericFormatter } from 'react-number-format';
import { z } from 'zod';

import type { Agent } from './agent';

const commissionDetailsSchema = z.object({
  commission: z.number(),
  amount: z.number(),
  token: z.string(),
});

const feesSchema = z.object({
  platform: commissionDetailsSchema,
  senderAgent: commissionDetailsSchema,
  recipientAgent: commissionDetailsSchema.nullish(),
});

export type TransferInfo = z.infer<typeof commissionDetailsSchema>;

export function formatCommissionDetails({ amount, token }: TransferInfo) {
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

export default feesSchema;
