import { useSuspenseQuery } from '@tanstack/react-query';

import { genericFetch } from '@/src/schema/api/fetch';
import exchangeCurrencyApiSchema from '@/src/schema/currency';

const BASE_URL =
  'https://35ipxeiky6.execute-api.ap-southeast-1.amazonaws.com/develop/config';

export default function useExchangeCurrency() {
  return useSuspenseQuery({
    queryKey: ['exchange-currency'],
    queryFn: () =>
      genericFetch(`${BASE_URL}/currency`, exchangeCurrencyApiSchema),
    select: response => response.data,
    refetchInterval: 10_000,
  });
}
