import { queryOptions, useSuspenseQuery } from '@tanstack/react-query';

import { Options, genericFetch } from '../../schema/api/fetch';
import priceOracleSchema from '../../schema/price-oracle';

const BASE_URL =
  'https://9tbw1uqhph.execute-api.ap-southeast-1.amazonaws.com/main';

export type Pair = {
  from: string;
  to: string;
};

export default function usePriceOracle(
  { from, to }: Pair,
  { refetchInterval }: Options = { refetchInterval: 5000 }
) {
  const priceOracleQueryOptions = queryOptions({
    queryKey: ['price-oracle'],
    queryFn: () => genericFetch(`${BASE_URL}/${from}/${to}`, priceOracleSchema),
    refetchInterval: refetchInterval,
  });

  return useSuspenseQuery(priceOracleQueryOptions);
}
