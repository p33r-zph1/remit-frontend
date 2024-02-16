import { CalendarIcon } from '@heroicons/react/20/solid';
import {
  GoogleMap,
  type Libraries,
  useLoadScript,
} from '@react-google-maps/api';
import { format } from 'date-fns';
import { type ElementRef, useRef } from 'react';

import MapsAPI from '@/src/components/Location/MapsAPI';
import LoadingRing from '@/src/components/Spinner/LoadingRing';
import type { LocationDetails } from '@/src/schema/location';

const libraries: Libraries = ['places'];

type Props = {
  locationDetails: LocationDetails;
};

export default function CustomerMeetup({
  locationDetails: { areaName, coordinates, radius, startDate, endDate },
}: Props) {
  const mapRef = useRef<ElementRef<typeof GoogleMap>>();

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

        <div className="flex w-full flex-row space-x-2 rounded-md border border-slate-200 p-2 text-sm md:text-base">
          <CalendarIcon className="h-5 w-5" />

          <span className="font-semibold">
            {format(startDate, 'MMMM dd, yyyy')}
            {` `}
            <span className="tracking-tighter">
              {format(startDate, 'h:mm a')}
              {' - '}
              {format(endDate, 'h:mm a')}
            </span>
          </span>
        </div>
      </div>

      <div>
        <div className="text-sm font-semibold text-gray-400">Meetup area</div>

        <div className="rounded-lg border border-slate-200">
          <div className="mt-2 flex flex-col space-y-4 p-4">
            <span className="w-full rounded-lg border border-slate-200 p-2 text-sm font-semibold">
              {areaName}
            </span>
          </div>

          <MapsAPI
            ref={mapRef}
            meetUpLocation={{
              lat: Number(coordinates.latitude),
              lng: Number(coordinates.longitude),
            }}
            radius={radius.value}
            disabled={false}
            onLoad={() => {
              mapRef.current?.panTo({
                lat: Number(coordinates.latitude),
                lng: Number(coordinates.longitude),
              });
            }}
          />
        </div>
      </div>
    </div>
  );
}
