import { useMemo } from 'react';
import { Address, erc20Abi, formatUnits } from 'viem';
import { useReadContract } from 'wagmi';
import { z } from 'zod';

export type AllowanceProps = {
  spenderAddress: Address;
  ownerAddress: Address;
  tokenAddress: Address;
  decimals: number;
};

export default function useTokenAllowance({
  spenderAddress,
  ownerAddress,
  tokenAddress,
  decimals,
}: AllowanceProps) {
  const { data, ...readContractProps } = useReadContract({
    abi: erc20Abi,
    address: tokenAddress,
    functionName: 'allowance',
    args: [ownerAddress, spenderAddress],
  });

  const allowance = useMemo(() => {
    if (data === undefined || data === null) return;

    const result = z.coerce.bigint().parse(data);
    return {
      formatted: formatUnits(result, decimals),
      value: result,
    };
  }, [data, decimals]);

  return {
    allowance,
    ...readContractProps,
  };
}
