import { z } from 'zod';
import { agentSchema } from './agent';
import { makeApiSchema } from './api/fetch';

const agentListSchema = z.array(agentSchema);

const agentListApiSchema = makeApiSchema(agentListSchema);

export type AgentList = z.infer<typeof agentListSchema>;

export default agentListApiSchema;
