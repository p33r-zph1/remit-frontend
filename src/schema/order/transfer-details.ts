import { z } from 'zod';

import transferInfoSchema from './transfer-info';

const transferDetailsSchema = z.object({
  sender: transferInfoSchema,
  recipient: transferInfoSchema,
});

export default transferDetailsSchema;
