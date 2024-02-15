import { isAddress } from 'viem';
import { z } from 'zod';

import { isSupportedChain } from '../utils';

const escrowDetailsSchema = z.object({
  amount: z.number(),
  token: z.string(),
  tokenAddress: z.string().refine(isAddress).optional(),
  tokenDecimals: z.number().optional(),
  chain: z.string().optional(),
  chainId: z.number().refine(isSupportedChain).optional(),
  escrow: z.string().refine(isAddress).optional(),
  depositTransaction: z.string().url().optional(),
  releaseTransaction: z.string().url().optional(),
  refundTransaction: z.string().url().optional(),
});

export default escrowDetailsSchema;
