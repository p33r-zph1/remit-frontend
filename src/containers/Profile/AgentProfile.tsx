import useGetAgent from '@/src/hooks/api/useGetAgent';

import EditProfile from './EditProfile';

type Props = {
  agentId: string;
};

export default function AgentProfile({ agentId }: Props) {
  const { data: agent } = useGetAgent({ agentId });

  return (
    <EditProfile
      userId={agentId}
      type="agents"
      walletAddress={agent.walletAddress}
      contact={agent.contactDetails}
    />
  );
}
