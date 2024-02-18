import { useSuspenseQuery } from '@tanstack/react-query';

import { API_URL } from '@/src/configs/env';
import { genericFetch } from '@/src/schema/api/fetch';
import exchangeCurrencyApiSchema from '@/src/schema/currency';

const BASE_URL = `${API_URL}/config`;

export default function useExchangeCurrency() {
  return useSuspenseQuery({
    queryKey: ['exchange-currency'],
    queryFn: () =>
      genericFetch(`${BASE_URL}/currency`, exchangeCurrencyApiSchema),
    select: response => response.data,
    refetchInterval: 10_000,
  });
}
