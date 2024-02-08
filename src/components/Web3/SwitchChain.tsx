import { twMerge } from 'tailwind-merge';
import { useAccount, useSwitchChain } from 'wagmi';

export default function SwitchChain() {
  const { chainId } = useAccount();
  const { chains, switchChain } = useSwitchChain();

  return (
    <div className="flex flex-col space-y-2 md:flex-row md:space-x-2 md:space-y-0">
      {chains.map(chain => (
        <button
          className={twMerge(
            'btn btn-primary btn-sm px-2 py-1',
            chainId !== chain.id && 'btn-outline'
          )}
          key={chain.id}
          onClick={() => switchChain({ chainId: chain.id })}
        >
          {chain.name}
        </button>
      ))}
    </div>
  );
}
