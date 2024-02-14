import { useNavigate } from '@tanstack/react-router';
import { useEffect } from 'react';

import HeaderTitle from '../../../components/HeaderTitle';
import useOrderDetails from '../../../hooks/useOrderDetails';

type Props = {
  qrCode: string;
};

export default function ShowQrCode({ qrCode }: Props) {
  const navigate = useNavigate();

  const {
    order: { senderAgentId, transferTimelineStatus: status, orderId },
  } = useOrderDetails();

  useEffect(() => {
    if (status === 'ESCROW_RELEASED') {
      navigate({ to: '/order/$orderId', params: { orderId }, replace: true });
    }
  }, [navigate, orderId, status]);

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
