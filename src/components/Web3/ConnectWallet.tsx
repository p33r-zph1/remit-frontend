import { useCallback } from 'react';
import { twMerge } from 'tailwind-merge';
import { useAccount, useConnect, useDisconnect } from 'wagmi';
import { injected } from 'wagmi/connectors';

type Props = {
  disabled?: boolean;
};

export default function ConnectWallet({ disabled }: Props) {
  const { isConnected, isConnecting, isDisconnected } = useAccount();
  const { connect } = useConnect();
  const { disconnect } = useDisconnect();

  const handleClick = useCallback(() => {
    if (isConnected) return disconnect();
    connect({ connector: injected() });
  }, [connect, disconnect, isConnected]);

  return (
    <div className="flex flex-col space-y-2">
      <button
        type="button"
        className={twMerge(
          'btn btn-primary btn-block rounded-full text-base font-semibold shadow-sm md:text-lg',
          isConnected
            ? 'btn-outline'
            : 'disabled:bg-primary/70 disabled:text-primary-content'
        )}
        onClick={handleClick}
        disabled={disabled}
      >
        {isConnecting && <span className="loading loading-spinner"></span>}

        {isDisconnected && (
          <img src="/metamask.png" alt="metamask icon" className="h-8 w-8" />
        )}

        {isConnected ? 'Disconnect Wallet' : 'Connect wallet'}
      </button>
    </div>
  );
}
