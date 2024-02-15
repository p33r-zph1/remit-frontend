import { CheckIcon } from '@heroicons/react/20/solid';
import { memo, useCallback, useEffect, useState } from 'react';
import { numericFormatter } from 'react-number-format';
import { twMerge } from 'tailwind-merge';
import { type Address, erc20Abi, parseUnits } from 'viem';
import { useWaitForTransactionReceipt, useWriteContract } from 'wagmi';

import { trimErrorMessage } from '@/src/utils';

import ErrorAlert from '../Alert/ErrorAlert';
import LoadingAlert from '../Alert/LoadingAlert';
import Modal from '../Modal';

type Props = {
  ownerAddress: Address;
  spenderAddress: Address;
  tokenAddress: Address;
  value: string;
  decimals: number;
  symbol: string;
  blockExplorerUrl: string;
  chainName: string;
  onApproved: () => void;
};

export default memo(function ApproveAllowance({
  ownerAddress,
  spenderAddress,
  tokenAddress,
  value,
  decimals,
  symbol,
  blockExplorerUrl,
  chainName,
  onApproved,
}: Props) {
  const {
    data: txnhash,
    writeContractAsync,
    error: writeContractError,
    isPending,
  } = useWriteContract();

  const {
    isLoading: isConfirming,
    isSuccess: isConfirmed,
    error: receiptError,
  } = useWaitForTransactionReceipt({
    confirmations: 5,
    hash: txnhash,
  });

  useEffect(() => {
    if (isConfirmed) {
      onApproved();
    }
  }, [isConfirmed, onApproved]);

  const [modalVisible, setModalVisible] = useState(false);

  const handleApproveTransfer = useCallback(async () => {
    try {
      await writeContractAsync({
        address: tokenAddress,
        abi: erc20Abi,
        functionName: 'approve',
        args: [spenderAddress, parseUnits(value, decimals)],
      });

      setModalVisible(false);
    } catch (err) {
      setModalVisible(false);
      console.error(err);
    }
  }, [decimals, spenderAddress, tokenAddress, value, writeContractAsync]);

  return (
    <div className="flex flex-col space-y-2">
      {txnhash && isConfirmed && (
        <div role="alert" className="alert bg-white shadow-md">
          <CheckIcon
            className={twMerge('h-6 w-6', isConfirmed && 'text-success')}
          />

          <div className="w-full overflow-hidden text-balance break-words">
            <h3 className={twMerge('font-bold', isConfirmed && 'text-success')}>
              {isConfirmed
                ? 'Transaction confirmed!'
                : 'Transaction sent to blockchain'}
            </h3>

            <div className={twMerge('text-xs', isConfirmed && 'text-success')}>
              {txnhash}
            </div>
          </div>

          {blockExplorerUrl && (
            <button
              onClick={() =>
                window.open(`${blockExplorerUrl}/tx/${txnhash}`, '_blank')
              }
              className="btn btn-ghost btn-link btn-sm max-w-32 text-balance"
            >
              View on Block Explorer
            </button>
          )}
        </div>
      )}

      {isConfirming && (
        <LoadingAlert message="Waiting for enough blockchain confirmations, please wait..." />
      )}

      {!txnhash && (
        <code className="flex w-full flex-col text-balance break-words rounded-lg border border-slate-200 p-2 text-center text-sm font-semibold shadow-md">
          <span className="text-sm md:text-base">{ownerAddress}</span>
          <span className="text-base font-medium md:text-lg">{chainName}</span>
        </code>
      )}

      {writeContractError && (
        <ErrorAlert message={trimErrorMessage(writeContractError.message)} />
      )}
      {receiptError && (
        <ErrorAlert message={trimErrorMessage(receiptError.message)} />
      )}

      <button
        type="button"
        className="btn btn-primary btn-block rounded-full text-base font-semibold shadow-sm disabled:bg-primary/70 disabled:text-primary-content md:text-lg"
        onClick={() => setModalVisible(true)}
        disabled={isPending || isConfirming || isConfirmed}
      >
        <img src="/metamask.png" alt="metamask icon" className="h-8 w-8" />
        Approve Transfer
      </button>

      <Modal
        open={modalVisible}
        isLoading={isPending || isConfirming}
        onClose={() => setModalVisible(false)}
        actions={{
          confirm: {
            label: 'Approve',
            action: handleApproveTransfer,
          },
          cancel: {
            label: 'Cancel',
          },
        }}
        slideFrom="top"
        title="Confirm transfer approval"
        size="medium"
      >
        <p className="text-balance text-slate-500">
          <></>
          You&apos;re about to approve{' '}
          <span className="font-bold">
            {numericFormatter(`${value} ${symbol}`, {
              thousandSeparator: ',',
            })}
          </span>
          <br />
          <br />
          Are you sure you want to continue?
        </p>
      </Modal>
    </div>
  );
});
