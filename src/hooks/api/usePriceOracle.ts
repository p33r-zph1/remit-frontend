import { useSuspenseQuery } from '@tanstack/react-query';

import { genericFetch } from '@/src/schema/api/fetch';
import priceOracleApiSchema from '@/src/schema/price-oracle';

export type Pair = {
  from: string;
  to: string;
};

export default function usePriceOracle({ from, to }: Partial<Pair>) {
  return useSuspenseQuery({
    queryKey: ['price-oracle', { from, to }],
    queryFn: () => {
      const apiUrl = `https://9tbw1uqhph.execute-api.ap-southeast-1.amazonaws.com/main/${from}/${to}`;
      return genericFetch(apiUrl, priceOracleApiSchema);
    },
    select: response => response.data,
    refetchInterval: 10_000,
  });
}
