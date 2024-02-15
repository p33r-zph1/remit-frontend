import { useCallback, useEffect, useMemo } from 'react';
import { twMerge } from 'tailwind-merge';
import {
  ProviderNotFoundError,
  useAccount,
  useConnect,
  useDisconnect,
} from 'wagmi';
import { injected } from 'wagmi/connectors';

type Props = {
  disabled?: boolean;
};

export default function ConnectWallet({ disabled }: Props) {
  const { isConnected, isConnecting, isDisconnected } = useAccount();
  const { connect, error } = useConnect();
  const { disconnect } = useDisconnect();

  const noProviderError = useMemo(
    () => error instanceof ProviderNotFoundError,
    [error]
  );

  useEffect(() => {
    if (noProviderError) {
      window.open('https://metamask.io/', '_blank');
    }
  }, [noProviderError]);

  const handleClick = useCallback(() => {
    if (isConnected) return disconnect();
    connect({ connector: injected() });
  }, [connect, disconnect, isConnected]);

  return (
    <button
      type="button"
      className={twMerge(
        'btn btn-primary btn-block rounded-full text-base font-semibold shadow-sm disabled:bg-primary/70 disabled:text-primary-content md:text-lg',
        isConnected && 'btn-outline'
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
  );
}
