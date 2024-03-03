import { memo, useCallback, useEffect, useState } from 'react';
import { numericFormatter } from 'react-number-format';
import { type Address, erc20Abi, parseUnits } from 'viem';
import { useWaitForTransactionReceipt, useWriteContract } from 'wagmi';

import { trimErrorMessage } from '@/src/utils';

import ErrorAlert from '../Alert/ErrorAlert';
import LoadingAlert from '../Alert/LoadingAlert';
import SuccessAlert from '../Alert/SuccessAlert';
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
    data: txnHash,
    writeContractAsync,
    error: writeContractError,
    isPending: isApproving,
  } = useWriteContract();

  const {
    isLoading: isConfirming,
    isSuccess: isConfirmed,
    error: receiptError,
  } = useWaitForTransactionReceipt({
    confirmations: 5,
    hash: txnHash,
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
      {txnHash && isConfirmed && (
        <SuccessAlert
          title="Transaction confirmed!"
          message={txnHash}
          action={
            isConfirmed && {
              fn: () =>
                window.open(`${blockExplorerUrl}/tx/${txnHash}`, '_blank'),
              label: 'View on Block Explorer',
            }
          }
          isComplete
        />
      )}

      {isConfirming && (
        <LoadingAlert message="Waiting for enough blockchain confirmations, please wait..." />
      )}

      {!txnHash && (
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
        disabled={isApproving || isConfirming || isConfirmed}
      >
        <img src="/metamask.png" alt="metamask icon" className="h-8 w-8" />
        Approve Transfer
      </button>

      <Modal
        open={modalVisible}
        isLoading={isApproving || isConfirming}
        onClose={() => setModalVisible(false)}
        type="action"
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
          You&apos;re about to approve{' '}
          <span className="font-bold">
            {numericFormatter(`${value} ${symbol}`, {
              thousandSeparator: ',',
            })}
          </span>
          <br />
          <br />
          <span className="text-xs font-semibold text-accent">
            Tip: Make sure the spending cap matches the numbers above
          </span>
        </p>
      </Modal>
    </div>
  );
});
