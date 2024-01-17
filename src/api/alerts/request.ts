import { queryOptions } from '@tanstack/react-query';

import { delay } from '../../utils';
// import alertSchema from './schema';

export const fetchAlerts = async () => {
  console.log('Fetching alerts...');

  // simulating internet speed delay
  await delay(1000);

  return {};

  // Uncomment below for actual api implementation
  // const response = await fetch('https://jsonplaceholder.typicode.com/posts');

  // if (!response.ok) {
  //   throw new Error(
  //     'There was a problem loading your alerts. Please try again later.'
  //   );
  // }

  // const result = alertSchema.safeParse(await response.json());

  // if (!result.success) {
  //   throw new Error(
  //     'There was a problem parsing your data from the server. Please try again later.'
  //   );
  // }

  // console.log({ alerts: result.data });

  // return result.data;
};

export const alertsQueryOptions = queryOptions({
  queryKey: ['alert'],
  queryFn: () => fetchAlerts(),
  refetchInterval: 5000,
});
