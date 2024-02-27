import type { AgentQueryProps } from '../useGetAgent';
import type { AgentsQueryProps } from '../useGetAgents';

export const agentKeys = {
  /**
   *  @description all queries for **agents**.
   *  @example
   *  queryClient.removeQueries({ queryKey: agentKeys.all })
   *  queryClient.invalidateQueries({ queryKey: agentKeys[*] })
   */
  all: ['agents'] as const,

  /**
   * @description queries for **agents list**.
   * @example
   * queryOptions({ queryKey: agentKeys.list(props) })
   */
  list: (props: AgentsQueryProps) =>
    [...agentKeys.all, 'list', { ...props }] as const,

  /**
   * @description queries a **single** agent.
   * @example
   * queryOptions({ queryKey: agentKeys.listItem(props) })
   */
  listItem: ({ agentId }: AgentQueryProps) =>
    [...agentKeys.all, 'list', agentId] as const,
};
