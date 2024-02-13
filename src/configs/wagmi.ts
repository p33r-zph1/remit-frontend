import { http } from 'viem';
import { mainnet, sepolia, bsc, bscTestnet } from 'viem/chains';
import { createConfig } from 'wagmi';
import { injected } from 'wagmi/connectors';

const wagmi = createConfig({
  chains: [mainnet, sepolia, bsc, bscTestnet],
  transports: {
    [mainnet.id]: http(),
    [sepolia.id]: http(),
    [bsc.id]: http(),
    [bscTestnet.id]: http(),
  },
  connectors: [injected()],
});

export default wagmi;

declare module 'wagmi' {
  interface Register {
    config: typeof wagmi;
  }
}
