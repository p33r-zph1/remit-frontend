import { useSwitchChain } from 'wagmi';

import type { SupportedChains } from '@/src/configs/wagmi';

type Props = {
  name: string;
  preferredChainId: SupportedChains;
};

export default function SwitchChain({ name, preferredChainId }: Props) {
  const { switchChain, isPending } = useSwitchChain();

  return (
    <button
      type="button"
      className="btn btn-outline btn-primary btn-block rounded-full text-base font-semibold shadow-sm disabled:bg-primary/70 disabled:text-primary-content md:text-lg"
      onClick={() => switchChain({ chainId: preferredChainId })}
    >
      {isPending && <span className="loading loading-spinner"></span>}
      Switch to {name}
    </button>
  );
}
