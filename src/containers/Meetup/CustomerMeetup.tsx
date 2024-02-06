import { useRef } from 'react';
import { useLoadScript, Libraries } from '@react-google-maps/api';

import MapsAPI from '../../components/Location/MapsAPI';
import LoadingRing from '../../components/Spinner/LoadingRing';
import { LocationDetails } from '../../schema/order';

const libraries: Libraries = ['places'];

type Props = {
  collectionDetails: LocationDetails | undefined;
};

export default function CustomerMeetup({ collectionDetails }: Props) {
  if (!collectionDetails) throw new Error('Missing collection details');

  const { areaName, coordinates, radius } = collectionDetails;

  const mapRef = useRef<google.maps.Map>();

  const { isLoaded } = useLoadScript({
    googleMapsApiKey: import.meta.env.VITE_MAPS_JS_API,
    libraries,
  });

  if (!isLoaded) return <LoadingRing className="h-32" />;

  return (
    <div className="flex flex-col space-y-4">
      <div>
        <div className="text-sm font-semibold text-gray-400">
          Collection date and time
        </div>

        <span>date and time here</span>
      </div>

      <div>
        <div className="text-sm font-semibold text-gray-400">Meetup area</div>

        <div className="rounded-lg border border-slate-200">
          <div className="mt-2 flex flex-col space-y-4 p-4">
            <span>{areaName}</span>
          </div>

          <MapsAPI
            ref={mapRef}
            meetUpLocation={{
              lat: Number(coordinates.latitude),
              lng: Number(coordinates.longitude),
            }}
            radius={radius.value}
          />
        </div>
      </div>
    </div>
  );
}
