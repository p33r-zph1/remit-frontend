type Props = {
  fxRate: string;
  assetToDeliver: string;
  assetDetails: string;
};

export default function FxRate({
  fxRate,
  assetToDeliver,
  assetDetails,
}: Props) {
  return (
    <code className="text-sm text-accent md:text-base">
      <p>
        FX Rate: <span className="font-bold">{fxRate}</span>
      </p>
      <p>
        Exact {assetToDeliver} to deliver:{' '}
        <span className="font-bold">{assetDetails}</span>
      </p>
    </code>
  );
}
