import { useSuspenseQuery } from '@tanstack/react-query';

import { Options, genericFetch } from '../../schema/api/fetch';
import exchangeCurrencySchema from '../../schema/currency';

const BASE_URL =
  'https://35ipxeiky6.execute-api.ap-southeast-1.amazonaws.com/develop/config';

export default function useExchangeCurrency(
  { refetchInterval }: Options = { refetchInterval: 10_000 } // 10 seconds
) {
  return useSuspenseQuery({
    queryKey: ['exchange-currency'],
    queryFn: () => genericFetch(`${BASE_URL}/currency`, exchangeCurrencySchema),
    select: response => response.data,
    refetchInterval,
  });
}
