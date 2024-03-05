import { type Commission, formatCommissionDetails } from '@/src/schema/fees';

type Props = {
  priceOracleRates: Record<string, number>;
  platformFee: Commission;
  summary?: {
    message: string;
    amount: string;
  };
};

export default function OrderSummary({
  priceOracleRates,
  platformFee,
  summary,
}: Props) {
  return (
    <code className="space-y-2 text-xs text-accent md:text-sm">
      <p>
        FX Rate:
        {Object.entries(priceOracleRates).map(([key, value]) => (
          <div className="font-bold" key={key}>
            <strong>&gt;{key} </strong> ({value})
          </div>
        ))}
      </p>
      <p>
        Platform Fee:{' '}
        <strong className="font-bold">
          {formatCommissionDetails(platformFee)}
        </strong>
      </p>
      {summary && (
        <p>
          {summary.message}:{' '}
          <strong className="font-bold">{summary.amount}</strong>
        </p>
      )}
    </code>
  );
}
