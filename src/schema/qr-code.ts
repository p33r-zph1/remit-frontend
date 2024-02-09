import { z } from 'zod';

import { makeApiSchema } from './api/fetch';

const qrCodeSchema = z.object({
  qrCode: z.string(),
});

const qrCodeApiSchema = makeApiSchema(qrCodeSchema);

export type QrCode = z.infer<typeof qrCodeSchema>;

export default qrCodeApiSchema;
