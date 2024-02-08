import useTokenAllowance, { Props } from '../../hooks/erc20/useTokenAllowance';

export default function TokenAllowance(props: Props) {
  const { allowance } = useTokenAllowance(props);

  return <div>Allowance: {allowance?.toString()}</div>;
}
