import { CheckIcon } from '@heroicons/react/20/solid';
import { useCallback, useEffect, useMemo, useState } from 'react';
import { numericFormatter } from 'react-number-format';
import { type Address, erc20Abi, parseUnits } from 'viem';
import {
  useAccount,
  useWaitForTransactionReceipt,
  useWriteContract,
} from 'wagmi';

import { trimErrorMessage } from '@/src/utils';

import ErrorAlert from '../Alert/ErrorAlert';
import Modal from '../Modal';

type Props = {
  tokenAddress: Address;
  spenderAddress: Address;
  value: string;
  decimals: number;
  symbol: string;
  onApproved: () => void;
};

export default function ApproveAllowance({
  tokenAddress,
  spenderAddress,
  value,
  decimals,
  symbol,
  onApproved,
}: Props) {
  const { chain } = useAccount();
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
    confirmations: 2,
    hash: txnhash,
  });

  const [modalVisible, setModalVisible] = useState(false);

  const handleApproveTransfer = useCallback(async () => {
    try {
      await writeContractAsync({
        address: tokenAddress,
        abi: erc20Abi,
        functionName: 'approve',
        args: [spenderAddress, parseUnits(value, decimals)],
      });
    } catch (err) {
      setModalVisible(false);
      console.error(err);
    }
  }, [decimals, spenderAddress, tokenAddress, value, writeContractAsync]);

  useEffect(() => {
    if (isConfirmed) {
      setModalVisible(false);
      onApproved();
    }
  }, [isConfirmed, onApproved]);

  useEffect(() => {
    if (receiptError) {
      setModalVisible(false);
    }
  }, [receiptError]);

  const blockExplorerUrl = useMemo(
    () => chain?.blockExplorers.default.url,
    [chain]
  );

  return (
    <div className="flex flex-col space-y-2">
      {writeContractError && (
        <ErrorAlert message={trimErrorMessage(writeContractError.message)} />
      )}
      {receiptError && (
        <ErrorAlert message={trimErrorMessage(receiptError.message)} />
      )}

      {txnhash && (
        <div role="alert" className="alert bg-white shadow-md">
          <CheckIcon className="h-6 w-6 text-success" />

          <div className="w-full overflow-hidden text-balance break-words">
            <h3 className="font-bold">Transaction sent to blockchain</h3>

            <div className="text-xs">{txnhash}</div>
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

      <button
        type="button"
        className="btn btn-primary btn-block rounded-full text-base font-semibold shadow-sm disabled:bg-primary/70 disabled:text-primary-content md:text-lg"
        onClick={() => setModalVisible(true)}
        disabled={isPending}
      >
        {isPending ? (
          <span className="loading loading-spinner"></span>
        ) : (
          <img src="/metamask.png" alt="metamask icon" className="h-8 w-8" />
        )}
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
          {isConfirming ? (
            <>Waiting for enough blockchain confirmations, please wait...</>
          ) : (
            <>
              You&apos;re about to approve{' '}
              <span className="font-bold">
                {numericFormatter(`${value} ${symbol}`, {
                  thousandSeparator: ',',
                })}
              </span>
              <br />
              Are you sure you want to continue?
            </>
          )}
        </p>
      </Modal>
    </div>
  );
}
