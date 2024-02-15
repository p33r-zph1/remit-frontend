import { numericFormatter } from 'react-number-format';
import { z } from 'zod';

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

export default feesSchema;
