import { GoogleMap, Marker, useLoadScript } from '@react-google-maps/api';
import type { GoogleMapProps, Libraries } from '@react-google-maps/api';
import { useCallback, useMemo, useRef, useState } from 'react';
import PlacesAutocomplete from '../Autocomplete/PlacesAutocomplete';

type LatLng = GoogleMapProps['center'];
type MapOptions = GoogleMapProps['options'];

const libraries: Libraries = ['places'];

export default function TransferMap() {
  const mapRef = useRef<GoogleMap | undefined>();
  const [range, setRange] = useState('100');

  const [meetUpLocation, setMeetUpLocation] = useState<LatLng>();
  console.log({ meetUpLocation });

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

  const options = useMemo<MapOptions>(
    () => ({
      disableDefaultUI: true,
      clickableIcons: false,
    }),
    []
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
          max={400}
          value={range}
          onChange={e => setRange(e.target.value)}
          className="range range-primary range-sm md:range-md"
          step="100"
        />
        <div className="flex w-full justify-between px-2 text-xs">
          <span>0m</span>
          <span>100m</span>
          <span>200m</span>
          <span>300m</span>
          <span>400m</span>
        </div>
      </div>

      <GoogleMap
        zoom={13}
        center={center}
        mapContainerClassName="h-56 md:h-[50vh] w-full"
        options={options}
        onLoad={onload}
      >
        {meetUpLocation && <Marker position={meetUpLocation} />}
      </GoogleMap>
    </div>
  );
}
