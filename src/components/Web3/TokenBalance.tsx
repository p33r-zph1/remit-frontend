import useTokenBalance, {
  BalanceProps,
} from '../../hooks/erc20/useTokenBalance';

export default function TokenBalance(props: BalanceProps) {
  const { balance } = useTokenBalance(props);

  return <div>Balance: {balance?.formatted}</div>;
}
