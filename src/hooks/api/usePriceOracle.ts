import { useSuspenseQuery } from '@tanstack/react-query';

import { Options, genericFetch } from '../../schema/api/fetch';
import priceOracleSchema from '../../schema/price-oracle';

const BASE_URL =
  'https://9tbw1uqhph.execute-api.ap-southeast-1.amazonaws.com/main';

export type Pair = {
  from: string;
  to: string;
};

export default function usePriceOracle(
  { from, to }: Partial<Pair>,
  { refetchInterval }: Options = { refetchInterval: 5_000 } // 5 seconds
) {
  return useSuspenseQuery({
    queryKey: ['price-oracle', `${from}:${to}`],
    queryFn: () => genericFetch(`${BASE_URL}/${from}/${to}`, priceOracleSchema),
    select: response => response.data,
    refetchInterval,
  });
}
