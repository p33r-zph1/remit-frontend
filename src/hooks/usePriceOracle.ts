import { queryOptions, useSuspenseQuery } from '@tanstack/react-query';

import { Pair, fetchPriceOracle } from '../api/price-oracle/query';
import { Options } from '../api/types';

export default function usePriceOracle(
  pair: Pair,
  { refetchInterval }: Options = { refetchInterval: 5000 }
) {
  const priceOracleQueryOptions = queryOptions({
    queryKey: ['price-oracle'],
    queryFn: () => fetchPriceOracle(pair),
    refetchInterval: refetchInterval,
  });

  return useSuspenseQuery(priceOracleQueryOptions);
}
