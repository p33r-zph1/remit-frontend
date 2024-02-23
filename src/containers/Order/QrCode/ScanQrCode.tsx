import { QrCodeIcon } from '@heroicons/react/20/solid';
import QrScanner from 'qr-scanner';
import { useCallback, useEffect, useRef, useState } from 'react';

import ErrorAlert from '@/src/components/Alert/ErrorAlert';
import HeaderTitle from '@/src/components/HeaderTitle';
import useConfirmDelivery from '@/src/hooks/api/useConfirmDelivery';
import useOrderDetails from '@/src/hooks/useOrderDetails';

export default function ScanQrCode() {
  const {
    order: { orderType, orderId },
  } = useOrderDetails();

  const {
    mutateAsync: confirmDeliveryAsync,
    isPending: isConfirmingDelivery,
    error: confirmDeliveryError,
  } = useConfirmDelivery();

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
      confirmDeliveryAsync({
        body: { deliveryCode: scannedResult },
        orderType,
        orderId,
      });
    }
  }, [confirmDeliveryAsync, orderId, orderType, scannedResult]);

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
      <div className="relative mx-auto h-full w-full sm:max-w-lg">
        <HeaderTitle className="flex items-center justify-center text-center text-xl drop-shadow-lg md:text-2xl">
          <QrCodeIcon className="mr-2 h-6 w-6 sm:h-8 sm:w-8" />
          Place QR Code in frame to scan
        </HeaderTitle>

        <div className="mb-4 h-full max-h-96 w-full">
          <video
            width="100%"
            height={96}
            className="object-cover object-center"
            ref={videoEl}
          ></video>
        </div>

        <div ref={qrBoxEl} className="left-0 w-full">
          <img
            src="/qr-frame.svg"
            alt="Qr Frame"
            className="absolute inset-1/2 h-64 w-64 -translate-x-1/2 -translate-y-1/2 transform fill-none"
          />
        </div>

        <div className="absolute left-6 right-6 top-1/2">
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
    </div>
  );
}
