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
  amount,
  currency,
  isComputed,
}: TransferInfo & {
  isComputed: boolean;
}): string {
  return numericFormatter(
    `${isComputed ? amountMinusFees : amount} ${currency}`,
    {
      thousandSeparator: ',',
    }
  );
}

export default transferInfoSchema;
