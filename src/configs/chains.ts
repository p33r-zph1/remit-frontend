import {
  mainnet,
  sepolia,
  bsc,
  bscTestnet,
  polygon,
  polygonMumbai,
  Chain,
} from 'wagmi/chains';

const ethChains: Chain[] = [mainnet, sepolia] as const;
const bnbChains: Chain[] = [bsc, bscTestnet] as const;
const maticChains: Chain[] = [polygon, polygonMumbai] as const;

const mainnetChains: Chain[] = [mainnet, bsc, polygon] as const;
const testnetChains: Chain[] = [sepolia, bscTestnet, polygonMumbai] as const;

const chainList = import.meta.env.PROD ? mainnetChains : testnetChains;

export function getCustomChainId(chainId: number | undefined) {
  if (ethChains.some(c => c.id === chainId)) return 'eth';
  if (bnbChains.some(c => c.id === chainId)) return 'bnb';
  if (maticChains.some(c => c.id === chainId)) return 'matic';

  return 'unsupported chain';
}

export function getChainName(chainId: number | undefined) {
  const result = chainList.find(c => c.id === chainId);

  return result ? result.name : 'unsupported chain';
}

export default chainList;
