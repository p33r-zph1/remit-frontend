import { useSuspenseQuery } from '@tanstack/react-query';

import { genericFetch } from '../../schema/api/fetch';
import { Options, defaultOptions } from '../../schema/api';
import exchangeCurrencyApiSchema from '../../schema/currency';

const BASE_URL =
  'https://35ipxeiky6.execute-api.ap-southeast-1.amazonaws.com/develop/config';

export default function useExchangeCurrency({
  refetchInterval,
}: Options = defaultOptions) {
  return useSuspenseQuery({
    queryKey: ['exchange-currency'],
    queryFn: () =>
      genericFetch(`${BASE_URL}/currency`, exchangeCurrencyApiSchema),
    select: response => response.data,
    refetchInterval,
  });
}
