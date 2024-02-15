import useTokenAllowance, {
  type AllowanceProps,
} from '@/src/hooks/erc20/useTokenAllowance';

import LoadingRing from '../Spinner/LoadingRing';
import ApproveAllowance from './ApproveAllowance';

type Props = AllowanceProps & {
  symbol: string;
  tokenAmount: string;
  chainName: string;
  blockExplorerUrl: string;
  onApproved: () => void;
};

export default function TokenAllowance({
  ownerAddress,
  spenderAddress,
  tokenAddress,
  tokenAmount,
  chainName,
  blockExplorerUrl,
  decimals,
  symbol,
  onApproved,
}: Props) {
  const { allowance, isLoading } = useTokenAllowance({
    ownerAddress,
    spenderAddress,
    tokenAddress,
    decimals,
  });

  if (isLoading) return <LoadingRing className="h-32" />;

  if (!allowance || allowance.value === 0n) {
    return (
      <ApproveAllowance
        ownerAddress={ownerAddress}
        spenderAddress={spenderAddress}
        tokenAddress={tokenAddress}
        value={tokenAmount}
        decimals={decimals}
        symbol={symbol}
        chainName={chainName}
        blockExplorerUrl={blockExplorerUrl}
        onApproved={onApproved}
      />
    );
  }

  return (
    <code className="flex w-full flex-col text-balance break-words rounded-lg border border-slate-200 p-2 text-center text-sm font-semibold shadow-md">
      <span className="text-sm md:text-base">
        You&apos;ve allowed the escrow to spend:
      </span>
      <span className="text-base font-medium md:text-lg">
        {allowance.formatted} {symbol}
      </span>
    </code>
  );
}
