import { http } from 'viem';
import { bsc, bscTestnet } from 'viem/chains';
import { createConfig } from 'wagmi';
import { injected } from 'wagmi/connectors';

const wagmi = createConfig({
  chains: import.meta.env.PROD ? [bsc] : [bscTestnet],
  transports: {
    [bsc.id]: http(),
    [bscTestnet.id]: http(),
  },
  connectors: [injected()],
});

export function getCustomChainId(chainId: number | undefined) {
  switch (true) {
    case bsc.id === chainId:
    case bscTestnet.id === chainId:
      return 'bnb';

    default:
      return 'unsupported chain';
  }
}

export function getSupportedChain(chainId: number) {
  return wagmi.chains.find(c => c.id === chainId);
}

export const supportedChainIds = wagmi.chains.map(c => c.id);

export type SupportedChains = (typeof supportedChainIds)[number];

export type Chains = typeof wagmi.chains;

export default wagmi;

declare module 'wagmi' {
  interface Register {
    config: typeof wagmi;
  }
}
