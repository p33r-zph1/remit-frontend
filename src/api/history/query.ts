import { delay } from '../../utils';
// import historySchema from './schema';

export const fetchHistory = async () => {
  console.log('Fetching history...');

  // simulating internet speed delay
  await delay(1000);

  return {};

  //   Uncomment below for actual api implementation
  // const response = await fetch('https://jsonplaceholder.typicode.com/posts');

  // if (!response.ok) {
  //   throw new Error(
  //     'There was a problem loading your history. Please try again later.'
  //   );
  // }

  // const result = historySchema.safeParse(await response.json());

  // if (!result.success) {
  //   throw new Error(
  //     'There was a problem parsing your data from the server. Please try again later.'
  //   );
  // }

  // console.log({ history: result.data });

  // return result.data;
};
