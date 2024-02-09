import { useCallback, useEffect, useRef, useState } from 'react';
import { QrCodeIcon } from '@heroicons/react/20/solid';
import QrScanner from 'qr-scanner';

import { Route } from '../../../routes/_auth/order/scanQr';
import HeaderTitle from '../../../components/HeaderTitle';
import useConfirmDelivery from '../../../hooks/api/useConfirmDelivery';
import ErrorAlert from '../../../components/Alert/ErrorAlert';

export default function ScanQrCode() {
  const {
    mutate: confirmDelivery,
    isPending: isConfirmingDelivery,
    error: confirmDeliveryError,
  } = useConfirmDelivery();

  const { orderId } = Route.useSearch();

  const scanner = useRef<QrScanner>();
  const videoEl = useRef<HTMLVideoElement>(null);
  const qrBoxEl = useRef<HTMLDivElement>(null);

  const [qrOn, setQrOn] = useState<boolean>(true);
  const [scannedResult, setScannedResult] = useState<string | undefined>('');

  const onScanSuccess = useCallback((result: QrScanner.ScanResult) => {
    setScannedResult(result.data);
  }, []);

  const onScanFail = useCallback((err: string | Error) => {
    console.error(err);
  }, []);

  useEffect(() => {
    if (scannedResult) {
      confirmDelivery({ body: { deliveryCode: scannedResult }, orderId });
    }
  }, [confirmDelivery, orderId, scannedResult]);

  useEffect(() => {
    if (videoEl?.current && !scanner.current) {
      scanner.current = new QrScanner(videoEl?.current, onScanSuccess, {
        onDecodeError: onScanFail,
        // environment = back camera, user = front camera
        preferredCamera: 'environment',
        highlightScanRegion: true,
        highlightCodeOutline: true,
        overlay: qrBoxEl?.current || undefined,
      });

      scanner?.current
        ?.start()
        .then(() => setQrOn(true))
        .catch(err => {
          if (err) setQrOn(false);
        });
    }

    return () => {
      if (!videoEl?.current) {
        scanner?.current?.stop();
      }
    };
  }, []);

  useEffect(() => {
    if (!qrOn)
      alert(
        'Camera is blocked or not accessible. Please allow camera in your browser permissions and Reload.'
      );
  }, [qrOn]);

  return (
    <div className="flex flex-1 flex-col items-center justify-center">
      <div className="relative mx-auto min-h-96 w-full sm:max-w-lg">
        <HeaderTitle className="flex items-center justify-center text-center text-xl drop-shadow-lg md:text-2xl">
          <QrCodeIcon className="mr-2 h-6 w-6 sm:h-8 sm:w-8" />
          Place QR Code in frame to scan
        </HeaderTitle>

        <video
          className="mb-4 h-auto w-full object-center"
          ref={videoEl}
        ></video>

        <div ref={qrBoxEl} className="left-0 w-full">
          <img
            src="/qr-frame.svg"
            alt="Qr Frame"
            className="absolute inset-1/2 h-64 w-64 -translate-x-1/2 -translate-y-1/2 transform fill-none"
          />
        </div>

        {isConfirmingDelivery && (
          <div role="alert" className="alert bg-white shadow-md">
            <div className="loading loading-dots"></div>

            <div>
              <h3 className="font-bold">QR Code scanned!</h3>
              <div className="font-medium">
                Please wait while we verify the transaction...
              </div>
            </div>
          </div>
        )}

        {confirmDeliveryError && (
          <ErrorAlert message={confirmDeliveryError.message} />
        )}
      </div>
    </div>
  );
}
