import priceOracleSchema from './schema';

export type Pair = {
  from: string;
  to: string;
};

export const fetchPriceOracle = async ({ from, to }: Pair) => {
  console.log('Fetching price oracle...');

  const response = await fetch(
    `https://9tbw1uqhph.execute-api.ap-southeast-1.amazonaws.com/main/${from}/${to}`
  );

  if (!response.ok) {
    throw new Error(
      'There was a problem loading the price oracle. Please try again later.'
    );
  }

  const result = priceOracleSchema.safeParse(await response.json());

  if (!result.success) {
    throw new Error(
      'There was a problem parsing the price oracle. Please try again later.'
    );
  }

  console.log({ priceOracle: result.data });

  return result.data;
};
