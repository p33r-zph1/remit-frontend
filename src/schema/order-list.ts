import { z } from 'zod';

import { makeApiSchema } from './api/fetch';
import { orderSchema } from './order';

const orderListSchema = z.object({
  orders: z.array(orderSchema),
  pageSize: z.number(),
  pageNumber: z.number(),
  totalItems: z.number(),
  totalPages: z.number(),
  hasNextPage: z.boolean(),
  hasPreviousPage: z.boolean(),
});

const orderListApiSchema = makeApiSchema(orderListSchema);

export type OrderList = z.infer<typeof orderListSchema>;

export default orderListApiSchema;
