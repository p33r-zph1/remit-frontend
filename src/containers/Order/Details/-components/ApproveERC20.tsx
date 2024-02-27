import { memo, useCallback, useMemo } from 'react';
import { numericFormatter } from 'react-number-format';
import { useAccount } from 'wagmi';

import ErrorAlert from '@/src/components/Alert/ErrorAlert';
import LoadingAlert from '@/src/components/Alert/LoadingAlert';
import HeaderTitle from '@/src/components/HeaderTitle';
import ApproveAllowance from '@/src/components/Web3/ApproveAllowance';
import ConnectWallet from '@/src/components/Web3/ConnectWallet';
import SwitchChain from '@/src/components/Web3/SwitchChain';
import useEscrowDeposit from '@/src/hooks/api/useEscrowDeposit';
import useOrderDetails from '@/src/hooks/useOrderDetails';
import { getTransferInfo } from '@/src/schema/order/transfer-details';

export default memo(function ApproveERC20() {
  const { address, chain, chainId, isDisconnected } = useAccount();

  const {
    mutateAsync: escrowDepositAsync,
    isPending: isDepositingOnEscrow,
    isSuccess: isDeposited,
    error: depositError,
  } = useEscrowDeposit();

  const {
    order: {
      escrowDetails: {
        escrow: escrowAddress,
        amount: tokenAmount,
        token: tokenSymbol,
        tokenAddress,
        tokenDecimals,
        chain: chainName,
        chainId: prefferedChainId,
      },
      transferDetails,
      orderType,
      orderId,
    },
  } = useOrderDetails();

  if (!escrowAddress)
    throw new Error('Escrow contract address cannot be missing!');

  if (!tokenAddress || !tokenDecimals)
    throw new Error('Token address/decimals cannot be missing!');

  if (!chainName || !prefferedChainId)
    throw new Error('Chain/ChainId cannot be missing!');

  const onApprove = useCallback(async () => {
    if (!address) throw new Error('Please connect your wallet.');

    try {
      await escrowDepositAsync({
        orderType,
        orderId,
        body: { walletAddress: address },
      });
    } catch (err) {
      console.log(err);
    }
  }, [address, escrowDepositAsync, orderId, orderType]);

  const approveAmountSummary = useMemo(() => {
    const transferInfo = getTransferInfo(transferDetails);

    const str = `${tokenSymbol} ${tokenAmount} (${transferInfo.currency} ${transferInfo.amount})`;
    return numericFormatter(str, { thousandSeparator: ',' });
  }, [tokenAmount, tokenSymbol, transferDetails]);

  return (
    <div className="flex flex-col space-y-12">
      <HeaderTitle className="text-xl md:text-2xl">
        <span className="text-gray-400">Send </span>

        {approveAmountSummary}

        <span className="text-gray-400"> to escrow</span>
      </HeaderTitle>

      {(() => {
        if (isDisconnected || !address) {
          return <ConnectWallet />;
        }

        if (!chain || !chainId) {
          return (
            <SwitchChain preferredChainId={prefferedChainId} name={chainName} />
          );
        }

        if (depositError) {
          return <ErrorAlert message={depositError.message} />;
        }

        return (
          <div className="flex flex-col space-y-2">
            {isDepositingOnEscrow && (
              <LoadingAlert
                tone="info"
                message="Please wait while we confirm your transaction on our end."
              />
            )}

            {isDeposited && (
              <LoadingAlert
                tone="info"
                message="We have confirmed your transaction, please wait for the transfer timeline to get updated."
              />
            )}

            <ApproveAllowance
              ownerAddress={address}
              spenderAddress={escrowAddress}
              tokenAddress={tokenAddress}
              value={String(tokenAmount)}
              decimals={tokenDecimals}
              symbol={tokenSymbol}
              chainName={chain.name}
              blockExplorerUrl={chain.blockExplorers.default.url}
              onApproved={onApprove}
            />

            {prefferedChainId !== chainId && (
              <SwitchChain
                preferredChainId={prefferedChainId}
                name={chainName}
              />
            )}
          </div>
        );
      })()}
    </div>
  );
});
