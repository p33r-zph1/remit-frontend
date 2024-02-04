import { useSuspenseQuery } from '@tanstack/react-query';

import { genericFetch } from '../../schema/api/fetch';
import priceOracleApiSchema from '../../schema/price-oracle';

const BASE_URL =
  'https://9tbw1uqhph.execute-api.ap-southeast-1.amazonaws.com/main';

export type Pair = {
  from: string;
  to: string;
};

export default function usePriceOracle({ from, to }: Pair) {
  return useSuspenseQuery({
    queryKey: ['price-oracle', `${from}:${to}`],
    queryFn: () =>
      genericFetch(`${BASE_URL}/${from}/${to}`, priceOracleApiSchema),
    select: response => response.data,
    refetchInterval: 5_000,
  });
}
