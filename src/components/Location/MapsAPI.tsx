import {
  Circle,
  GoogleMap,
  Marker,
  useLoadScript,
} from '@react-google-maps/api';
import type {
  CircleProps,
  GoogleMapProps,
  Libraries,
} from '@react-google-maps/api';
import { useCallback, useMemo, useRef, useState } from 'react';
import { coerce } from 'zod';

import PlacesAutocomplete from '../Autocomplete/PlacesAutocomplete';
import { cx } from '../../utils';

type LatLng = GoogleMapProps['center'];
type MapOptions = GoogleMapProps['options'];

const libraries: Libraries = ['places'];

export default function TransferMap() {
  const mapRef = useRef<GoogleMap | undefined>();
  const [radius, setRadius] = useState(0);

  const [meetUpLocation, setMeetUpLocation] = useState<LatLng>();

  const { isLoaded } = useLoadScript({
    googleMapsApiKey: import.meta.env.VITE_MAPS_JS_API,
    libraries,
  });

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

  const options = useMemo<MapOptions>(
    () => ({
      disableDefaultUI: true,
      clickableIcons: false,
      zoom: zoomLevel,
    }),
    [zoomLevel]
  );

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const onload = useCallback((map: any) => (mapRef.current = map), []);

  if (!isLoaded) return <div>loading maps, please wait...</div>;

  return (
    <div className="rounded-lg border border-slate-200">
      <div className="mt-4 flex flex-col space-y-4 p-4">
        <PlacesAutocomplete
          onSelect={location => {
            console.log({ location });
            setMeetUpLocation(location);
            mapRef.current?.panTo(location);
          }}
        />

        <div className="flex flex-col">
          <div className="text-sm font-semibold text-gray-400">Radius</div>
        </div>

        <input
          type="range"
          min={0}
          disabled={!meetUpLocation}
          max={1000}
          value={radius}
          onChange={e => setRadius(coerce.number().parse(e.target.value))}
          className={cx(
            `range range-sm md:range-md`,
            meetUpLocation && 'range-primary'
          )}
          step="250"
        />
        <div className="flex w-full justify-between px-2 text-xs">
          <span>0m</span>
          <span>250m</span>
          <span>500m</span>
          <span>750m</span>
          <span>1km</span>
        </div>
      </div>

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
    </div>
  );
}

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
