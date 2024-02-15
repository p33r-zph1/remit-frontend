import { numericFormatter } from 'react-number-format';
import { z } from 'zod';

const transferInfoSchema = z.object({
  amount: z.number(),
  currency: z.string(),
  countryIsoCode: z.string(),
});

export type TransferInfo = z.infer<typeof transferInfoSchema>;

export function formatTranferInfo({ amount, currency }: TransferInfo) {
  return numericFormatter(`${amount} ${currency}`, {
    thousandSeparator: ',',
  });
}

export default transferInfoSchema;
