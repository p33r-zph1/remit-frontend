import { useMemo } from 'react';
import { Address, erc20Abi, formatUnits } from 'viem';
import { useReadContract } from 'wagmi';
import { z } from 'zod';

export type BalanceProps = {
  address: Address;
  tokenAddress: Address;
  decimals: number;
};

export default function useTokenBalance({
  address,
  tokenAddress,
  decimals,
}: BalanceProps) {
  const { data, ...readContractProps } = useReadContract({
    abi: erc20Abi,
    address: tokenAddress,
    functionName: 'balanceOf',
    args: [address],
  });

  const balance = useMemo(() => {
    if (data === undefined || data === null) return;

    const result = z.coerce.bigint().parse(data);

    return {
      formatted: formatUnits(result, decimals),
      value: result,
    };
  }, [data, decimals]);

  return {
    balance,
    ...readContractProps,
  };
}
