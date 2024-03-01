import { numericFormatter } from 'react-number-format';
import { z } from 'zod';

const transferInfoSchema = z.object({
  amount: z.number(),
  amountMinusFees: z.number(),
  currency: z.string(),
  countryIsoCode: z.string(),
});

export type TransferInfo = z.infer<typeof transferInfoSchema>;

export function formatTranferInfo({
  amountMinusFees,
  currency,
}: TransferInfo): string {
  return numericFormatter(`${amountMinusFees} ${currency}`, {
    thousandSeparator: ',',
  });
}

export default transferInfoSchema;
