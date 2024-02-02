import { z } from 'zod';

import { makeApiSchema } from './api/fetch';
import { orderSchema } from './order';

const orderHistorySchema = z.object({
  orders: z.array(orderSchema),
  pageSize: z.number(),
  pageNumber: z.number(),
  totalItems: z.number(),
  totalPages: z.number(),
  hasNextPage: z.boolean(),
  hasPreviousPage: z.boolean(),
});

const orderHistoryApiSchema = makeApiSchema(orderHistorySchema);

export type OrderHistory = z.infer<typeof orderHistorySchema>;

export default orderHistoryApiSchema;
