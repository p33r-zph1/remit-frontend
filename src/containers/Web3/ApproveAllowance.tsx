import { Address, erc20Abi, parseUnits } from 'viem';
import { useAccount, useWriteContract } from 'wagmi';
import ErrorAlert from '../../components/Alert/ErrorAlert';
import { trimErrorMessage } from '../../utils';
import { CheckIcon } from '@heroicons/react/20/solid';

type Props = {
  tokenAddress: Address;
  spenderAddress: Address;
  value: string;
  decimals: number;
};

export default function ApproveAllowance({
  tokenAddress,
  spenderAddress,
  value,
  decimals,
}: Props) {
  const { chain } = useAccount(); // TODO: create a helper function for getting the block explorer
  const { data: hash, writeContract, error, isPending } = useWriteContract();

  return (
    <div className="flex flex-col space-y-2">
      {error && <ErrorAlert message={trimErrorMessage(error.message)} />}

      {hash && (
        <div role="alert" className="alert bg-white shadow-md">
          <CheckIcon className="h-6 w-6 text-success" />

          <div className="w-full overflow-hidden text-balance break-words">
            <h3 className="font-bold">Transaction sent to blockchain</h3>

            <div className="text-xs">{hash}</div>
          </div>

          {chain?.blockExplorers.default.url && (
            <button
              onClick={() =>
                window.open(
                  `${chain.blockExplorers.default.url}/tx/${hash}`,
                  '_blank'
                )
              }
              className="btn btn-ghost btn-link btn-sm max-w-32 text-balance"
            >
              View on Block Explorer
            </button>
          )}
        </div>
      )}

      <button
        type="button"
        className="btn btn-primary btn-block rounded-full text-base font-semibold shadow-sm disabled:bg-primary/70 disabled:text-primary-content md:text-lg"
        onClick={() => {
          writeContract({
            address: tokenAddress,
            abi: erc20Abi,
            functionName: 'approve',
            args: [spenderAddress, parseUnits(value, decimals)],
          });
        }}
      >
        {isPending ? (
          <span className="loading loading-spinner"></span>
        ) : (
          <img src="/metamask.png" alt="metamask icon" className="h-8 w-8" />
        )}
        Approve Transfer
      </button>
    </div>
  );
}
