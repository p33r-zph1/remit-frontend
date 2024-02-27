import HeaderTitle from '@/src/components/HeaderTitle';
import { Route } from '@/src/routes/_auth/order/$orderId/showQr';

type Props = {
  senderAgentId: string;
};

export default function ShowQrCode({ senderAgentId }: Props) {
  const { qrCode } = Route.useSearch();

  return (
    <div className="flex flex-1 flex-col space-y-10">
      <div>
        <HeaderTitle className="text-xl md:text-2xl">
          Cash collected?
        </HeaderTitle>

        <p className="text-xs font-medium text-gray-400 md:text-base">
          Show this QR code to{' '}
          <span className="font-semibold text-gray-600">
            Agent #{senderAgentId}
          </span>{' '}
          to confirm delivery.
        </p>
      </div>

      <img
        src={qrCode}
        className="h-full w-full object-cover object-center sm:h-1/2 sm:w-1/2"
      />

      <p className="text-center text-xs font-medium text-gray-400 sm:text-start md:text-base">
        Warning: Do not share or display this QR code until you have received
        your cash.
      </p>
    </div>
  );
}
