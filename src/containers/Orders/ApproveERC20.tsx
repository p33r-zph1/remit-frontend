import { useAccount } from 'wagmi';
import { numericFormatter } from 'react-number-format';

import useOrderDetails from '../../hooks/useOrderDetails';
import HeaderTitle from '../../components/HeaderTitle';
import ApproveAllowance from '../Web3/ApproveAllowance';
import ConnectWallet from '../Web3/ConnectWallet';

export default function ApproveERC20() {
  const {
    order: {
      escrowDetails: { escrow, amount, token },
      transferDetails: { recipient },
    },
  } = useOrderDetails();

  const { address } = useAccount();

  return (
    <div className="flex flex-col space-y-12">
      <HeaderTitle className="text-xl md:text-2xl">
        <span className="text-gray-400">Send </span>
        {numericFormatter(`${token} ${amount}`, {
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
        {address && escrow && (
          <ApproveAllowance
            spenderAddress={escrow}
            tokenAddress="0x0009dEF2AEef8131628cc02c7e0Ad8354bb1D71C"
            value="69"
            decimals={18}
          />
        )}

        <ConnectWallet />
      </div>
    </div>
  );
}
