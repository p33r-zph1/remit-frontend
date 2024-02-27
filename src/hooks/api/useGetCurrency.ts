import { useSuspenseQuery } from '@tanstack/react-query';

import { makeApiUrl } from '@/src/configs/env';
import { genericFetch } from '@/src/schema/api/fetch';
import exchangeCurrencyApiSchema from '@/src/schema/currency';

export default function useGetCurrency() {
  return useSuspenseQuery({
    queryKey: ['exchange-currency'],
    queryFn: () => {
      const apiUrl = makeApiUrl(`/config/currency`);
      return genericFetch(apiUrl, exchangeCurrencyApiSchema);
    },
    select: response => response.data,
    refetchInterval: 20_000,
  });
}
