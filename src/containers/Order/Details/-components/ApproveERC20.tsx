import { numericFormatter } from 'react-number-format';
import { useAccount } from 'wagmi';

import ErrorAlert from '@/src/components/Alert/ErrorAlert';
import HeaderTitle from '@/src/components/HeaderTitle';
import ConnectWallet from '@/src/components/Web3/ConnectWallet';
import SwitchChain from '@/src/components/Web3/SwitchChain';
import TokenAllowance from '@/src/components/Web3/TokenAllowance';
import { getSupportedChain } from '@/src/configs/wagmi';
import useEscrowDeposit from '@/src/hooks/api/useEscrowDeposit';
import useOrderDetails from '@/src/hooks/useOrderDetails';

export default function ApproveERC20() {
  const { address, chainId, isDisconnected } = useAccount();

  const {
    mutateAsync: escrowDepositAsync,
    isPending: isDepositingOnEscrow,
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
      transferDetails: { recipient },
      orderId,
    },
  } = useOrderDetails();

  if (!escrowAddress)
    throw new Error('Escrow contract address cannot be missing!');

  if (!tokenAddress || !tokenDecimals)
    throw new Error('Token address/decimals cannot be missing!');

  if (!chainName || !prefferedChainId)
    throw new Error('Chain/ChainId cannot be missing!');

  return (
    <div className="flex flex-col space-y-12">
      <HeaderTitle className="text-xl md:text-2xl">
        <span className="text-gray-400">Send </span>
        {numericFormatter(`${tokenSymbol} ${tokenAmount}`, {
          thousandSeparator: ',',
        })}
        {` `}
        {numericFormatter(`(${recipient.currency} ${recipient.amount})`, {
          thousandSeparator: ',',
        })}
        <span className="text-gray-400"> to escrow</span>
      </HeaderTitle>

      {(() => {
        if (isDisconnected || !address || !chainId) {
          return <ConnectWallet />;
        }

        if (isDepositingOnEscrow) {
          return (
            <div role="alert" className="alert bg-white shadow-md">
              <span className="loading loading-dots"></span>

              <span className="text-sm font-medium md:text-base">
                Please wait while we confirm your transaction on our end.
              </span>
            </div>
          );
        }

        if (depositError) {
          return <ErrorAlert message={depositError.message} />;
        }

        return (
          <>
            <code className="flex w-full flex-col text-balance break-words rounded-lg border border-slate-200 p-2 text-center text-sm font-semibold shadow-md">
              <span className="text-sm md:text-base">{address}</span>
              <span className="text-base font-medium md:text-lg">
                {getSupportedChain(chainId)?.name || 'Unsupported chain'}
              </span>
            </code>

            <div className="flex flex-col space-y-2">
              <TokenAllowance
                ownerAddress={address}
                spenderAddress={escrowAddress}
                tokenAddress={tokenAddress}
                tokenAmount={String(tokenAmount)}
                decimals={tokenDecimals}
                symbol={tokenSymbol}
                onApproved={() =>
                  escrowDepositAsync({
                    orderId,
                    body: { walletAddress: address },
                  })
                }
              />

              {prefferedChainId !== chainId && (
                <SwitchChain
                  preferredChainId={prefferedChainId}
                  name={chainName}
                />
              )}
            </div>
          </>
        );
      })()}
    </div>
  );
}
