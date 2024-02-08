import LoadingRing from '../../components/Spinner/LoadingRing';
import useTokenAllowance, {
  AllowanceProps,
} from '../../hooks/erc20/useTokenAllowance';
import ApproveAllowance from './ApproveAllowance';

type Props = AllowanceProps & {
  symbol: string;
  tokenAmount: string;
};

export default function TokenAllowance({
  ownerAddress,
  spenderAddress,
  tokenAddress,
  tokenAmount,
  decimals,
  symbol,
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
        spenderAddress={spenderAddress}
        tokenAddress={tokenAddress}
        value={tokenAmount}
        decimals={decimals}
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
