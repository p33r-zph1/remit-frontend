import { Circle, GoogleMap, Marker } from '@react-google-maps/api';
import type { CircleProps } from '@react-google-maps/api';
import { forwardRef, useCallback, useMemo } from 'react';
import { coerce } from 'zod';

type Props = {
  meetUpLocation: LatLng | undefined;
  radius: number;
};

const MapsAPI = forwardRef<google.maps.Map | undefined, Props>(
  ({ meetUpLocation, radius }: Props, ref) => {
    // const mapRef = useForwardRef<google.maps.Map>(ref);

    const center = useMemo<LatLng>(
      () => ({
        lat: 1.2933,
        lng: 103.8535,
      }),
      []
    );
    const radiusOptions = useMemo(() => {
      if (radius <= 250) return closeOptions;
      if (radius <= 500) return middleOptions;

      return farOptions;
    }, [radius]);

    const zoomLevel = useMemo(() => {
      if (!meetUpLocation) return 10;
      if (radius === 0) return 17;
      if (radius <= 250) return 16.5;
      if (radius <= 500) return 16;
      if (radius <= 750) return 15.5;
      if (radius <= 1000) return 15;

      return 13;
    }, [meetUpLocation, radius]);

    const options = useMemo<google.maps.MapOptions>(
      () => ({
        disableDefaultUI: true,
        clickableIcons: false,
        zoom: zoomLevel,
      }),
      [zoomLevel]
    );

    const onload = useCallback(
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      (mapRef: any) => {
        if (!ref) return;

        if (typeof ref === 'function') ref(mapRef);
        else ref.current = mapRef;
      },
      [ref]
    );

    return (
      <GoogleMap
        zoom={10}
        center={center}
        mapContainerClassName="h-56 md:h-[50vh] w-full"
        options={options}
        onLoad={onload}
      >
        {meetUpLocation && (
          <>
            <Marker position={meetUpLocation} />

            {coerce.number().safeParse(radius).success && (
              <Circle
                center={meetUpLocation}
                radius={radius}
                options={radiusOptions}
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
