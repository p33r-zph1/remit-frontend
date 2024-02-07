import { forwardRef, useCallback, useMemo } from 'react';
import { CircleF, GoogleMap, MarkerF } from '@react-google-maps/api';
import type { CircleProps } from '@react-google-maps/api';
import { coerce } from 'zod';

type Props = {
  meetUpLocation: LatLng | undefined;
  radius: number;
  disabled?: boolean;
  onLoad?: () => void;
};

const defaultCenter: LatLng = {
  lat: 1.2933,
  lng: 103.8535,
};

function getRadiusOptions(radius: number) {
  if (radius <= 250) return closeOptions;
  if (radius <= 500) return middleOptions;

  return farOptions;
}

function getZoomLevel(radius: number) {
  if (radius === 0) return 17;
  if (radius <= 250) return 16.5;
  if (radius <= 500) return 15;
  if (radius <= 750) return 14.5;
  if (radius <= 1000) return 14;

  return 12;
}

const MapsAPI = forwardRef<google.maps.Map | undefined, Props>(
  ({ meetUpLocation, radius, disabled, onLoad }: Props, ref) => {
    const mapOptions = useMemo<google.maps.MapOptions>(
      () => ({
        disableDefaultUI: true,
        clickableIcons: false,
        zoom: getZoomLevel(radius),
        gestureHandling: disabled ? 'none' : 'cooperative',
      }),
      [disabled, radius]
    );

    const onload = useCallback(
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      (mapRef: any) => {
        if (!ref) return;

        if (typeof ref === 'function') ref(mapRef);
        else ref.current = mapRef;

        onLoad?.();
      },
      [onLoad, ref]
    );

    return (
      <GoogleMap
        zoom={meetUpLocation ? getZoomLevel(radius) : 10}
        center={defaultCenter}
        mapContainerClassName="h-56 md:h-[40vh] w-full"
        options={mapOptions}
        onLoad={onload}
      >
        {meetUpLocation && (
          <>
            <MarkerF position={meetUpLocation} />

            {coerce.number().safeParse(radius).success && (
              <CircleF
                center={meetUpLocation}
                radius={radius}
                options={getRadiusOptions(radius)}
              />
            )}
          </>
        )}
      </GoogleMap>
    );
  }
);

MapsAPI.displayName = 'Google Maps API';

export default MapsAPI;

const defaultOptions: CircleProps['options'] = {
  strokeOpacity: 0.5,
  strokeWeight: 2,
  clickable: false,
  draggable: false,
  editable: false,
  visible: true,
};
const closeOptions: CircleProps['options'] = {
  ...defaultOptions,
  zIndex: 3,
  fillOpacity: 0.05,
  strokeColor: '#1165EF',
  fillColor: '#1165EF',
};

const middleOptions: CircleProps['options'] = {
  ...defaultOptions,
  zIndex: 2,
  fillOpacity: 0.05,
  strokeColor: '#de8800',
  fillColor: '#de8800',
};
const farOptions: CircleProps['options'] = {
  ...defaultOptions,
  zIndex: 1,
  fillOpacity: 0.05,
  strokeColor: '#cf3452',
  fillColor: '#cf3452',
};
