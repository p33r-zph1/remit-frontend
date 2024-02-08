import useTokenBalance, { Props } from '../../hooks/erc20/useTokenBalance';

export default function TokenBalance(props: Props) {
  const { balance } = useTokenBalance(props);

  return <div>Balance: {balance?.toString()}</div>;
}
