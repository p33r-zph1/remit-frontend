import { useAccount } from 'wagmi';
import { numericFormatter } from 'react-number-format';

import useOrderDetails from '../../hooks/useOrderDetails';
import HeaderTitle from '../../components/HeaderTitle';
import ConnectWallet from '../Web3/ConnectWallet';
import TokenAllowance from '../Web3/TokenAllowance';

export default function ApproveERC20() {
  const {
    order: {
      escrowDetails: {
        escrow: escrowAddress,
        amount: tokenAmount,
        token: tokenSymbol,
        tokenAddress,
        tokenDecimals,
      },
      transferDetails: { recipient },
    },
  } = useOrderDetails();

  if (!escrowAddress)
    throw new Error('Escrow contract address cannot be missing!');

  if (!tokenAddress || !tokenDecimals)
    throw new Error('Token address/decimals cannot be missing!');

  const { address } = useAccount();

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

      {/* {address && (
        <code className="flex w-full flex-col text-balance break-words rounded-lg border border-slate-200 p-2 text-center text-sm font-semibold shadow-md">
          <span className="text-sm md:text-base">{address}</span>
          <span className="text-base font-medium md:text-lg">
            {getChainName(chainId)}
          </span>
        </code>
      )} */}

      <div className="flex flex-col space-y-2">
        {address && (
          <TokenAllowance
            ownerAddress={address}
            spenderAddress={escrowAddress}
            tokenAddress={tokenAddress}
            tokenAmount={String(tokenAmount)}
            decimals={tokenDecimals}
            symbol={tokenSymbol}
          />
        )}

        <ConnectWallet />
      </div>
    </div>
  );
}
