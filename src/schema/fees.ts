import { numericFormatter } from 'react-number-format';
import { z } from 'zod';

import type { Agent } from './agent';

const commissionSchema = z.object({
  commission: z.number(),
  amount: z.number(),
  token: z.string(),
});

const baseFeesSchema = z.object({
  platform: commissionSchema,
});

export const crossBorderFeesSchema = baseFeesSchema.extend({
  senderAgent: commissionSchema,
  recipientAgent: commissionSchema.optional(),
});

export const crossBorderSelfFeesSchema = baseFeesSchema.extend({
  senderAgent: commissionSchema,
  recipientAgent: commissionSchema,
});

export const localBuyFeesSchema = baseFeesSchema.extend({
  senderAgent: commissionSchema,
});

export const localSellFeesSchema = baseFeesSchema.extend({
  recipientAgent: commissionSchema,
});

export type Commission = z.infer<typeof commissionSchema>;

export type CrossBorderFees = z.infer<typeof crossBorderFeesSchema>;

export type CrossBorderSelfFees = z.infer<typeof crossBorderSelfFeesSchema>;

export type LocalBuyFees = z.infer<typeof localBuyFeesSchema>;

export type LocalSellFees = z.infer<typeof localSellFeesSchema>;

export type Fees =
  | CrossBorderFees
  | CrossBorderSelfFees
  | LocalBuyFees
  | LocalSellFees;

export function formatCommissionDetails({ amount, token }: Commission) {
  return numericFormatter(`${amount} ${token}`, {
    thousandSeparator: ',',
  });
}

export function calculateFees({
  amount,
  precision,
  exchangeRate,
  platformFee,
  fromAgent,
  toAgent,
}: {
  amount: number;
  precision: number;
  exchangeRate: number;
  platformFee: number;
  fromAgent: Agent | undefined;
  toAgent: Agent | undefined;
}) {
  // Calculate the initial fiat value
  let fiatAmount = amount * exchangeRate;

  // If an agent is involved, apply their commission fee
  if (fromAgent) fiatAmount -= fiatAmount * (fromAgent.commission / 100);
  if (toAgent) fiatAmount -= fiatAmount * (toAgent.commission / 100);

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

export default baseFeesSchema;
