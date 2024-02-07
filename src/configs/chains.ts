import {
  mainnet as ethereum,
  sepolia,
  bsc,
  bscTestnet,
  polygon,
  polygonMumbai,
  arbitrum,
  arbitrumGoerli,
  Chain,
} from 'wagmi/chains';

const ethChains = [ethereum, sepolia];
const bnbChains = [bsc, bscTestnet];
const maticChains = [polygon, polygonMumbai];
const arbitrumChains = [arbitrum, arbitrumGoerli];

const mainnetChains: Chain[] = [ethereum, bsc, polygon, arbitrum];
const testnetChains: Chain[] = [
  sepolia,
  bscTestnet,
  polygonMumbai,
  arbitrumGoerli,
];

const chainList = import.meta.env.PROD ? mainnetChains : testnetChains;

export function getCustomChainId(chainId: number) {
  if (ethChains.some(c => c.id === chainId)) return 'eth';
  if (bnbChains.some(c => c.id === chainId)) return 'bnb';
  if (maticChains.some(c => c.id === chainId)) return 'matic';
  if (arbitrumChains.some(c => c.id === chainId)) return 'arb';

  return 'unsupported chain';
}

export function getChainName(chainId: number) {
  const result = chainList.find(c => c.id === chainId);

  return result ? result.name : 'unsupported chain';
}

export default chainList;
