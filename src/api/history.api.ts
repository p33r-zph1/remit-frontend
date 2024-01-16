import axios from 'axios';

import { queryOptions } from '@tanstack/react-query';

export type HistoryType = {
  id: string;
  title: string;
  body: string;
};

export const fetchHistory = async () => {
  console.log('Fetching history...');

  await new Promise(r => setTimeout(r, 500));

  return axios
    .get<HistoryType[]>('https://jsonplaceholder.typicode.com/posts')
    .then(r => r.data.slice(0, 10));
};

export const historyQueryOptions = queryOptions({
  queryKey: ['history'],
  queryFn: () => fetchHistory(),
  refetchInterval: 5000,
});
