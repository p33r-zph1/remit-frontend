import { useRef, useState } from 'react';
import { SubmitHandler, useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import {
  useLoadScript,
  // type GoogleMap,
  Libraries,
} from '@react-google-maps/api';
import { twMerge } from 'tailwind-merge';
import { z } from 'zod';

import MapsAPI from '../../components/Location/MapsAPI';
import CalendarPopover from '../../components/Popover/CalendarPopover';
import PlacesAutocomplete from '../../components/Autocomplete/PlacesAutocomplete';
import LoadingRing from '../../components/Spinner/LoadingRing';

const deliveryProps = z.object({
  startDate: z.coerce.date(),
  endDate: z.coerce.date(),
  // areaName: z.string(),
  // radius: z.object({
  //   value: z.number(),
  //   unit: z.enum(['m', 'km']),
  // }),
  // coordinates: z.object({
  //   latitude: z.string(),
  //   longitude: z.string(),
  // }),
});

type Delivery = z.infer<typeof deliveryProps>;

const libraries: Libraries = ['places'];

// let rerender = 0;

export default function SetCollectionMeetup() {
  const {
    control,
    handleSubmit,
    setValue,
    formState: { isSubmitting },
  } = useForm<Delivery>({
    resolver: zodResolver(deliveryProps),
  });

  const { isLoaded } = useLoadScript({
    googleMapsApiKey: import.meta.env.VITE_MAPS_JS_API,
    libraries,
  });

  const mapRef = useRef<google.maps.Map>();

  // TODO: refactor (temporary state)
  const [radius, setRadius] = useState(0);
  const [meetUpLocation, setMeetUpLocation] = useState<LatLng>();

  const onSubmit: SubmitHandler<Delivery> = props => {
    console.log('success', { props });
  };

  // rerender++;

  if (!isLoaded) return <LoadingRing className="h-32" />;

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col space-y-4">
      {/* {rerender / 2} */}

      <div>
        <div className="text-sm font-semibold text-gray-400">
          Set delivery date and time
        </div>

        <CalendarPopover
          control={control}
          name="startDate"
          setEndDate={date => setValue('endDate', date)}
        />
      </div>

      <div>
        <div className="text-sm font-semibold text-gray-400">
          Set delivery area
        </div>

        <div className="rounded-lg border border-slate-200">
          <div className="mt-2 flex flex-col space-y-4 p-4">
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

            <div
              className={twMerge('tooltip', !meetUpLocation && 'tooltip-error')}
              data-tip={
                meetUpLocation
                  ? 'Select a radius'
                  : 'Select a delivery area first'
              }
            >
              <input
                type="range"
                min={0}
                disabled={!meetUpLocation}
                max={1000}
                value={radius}
                onChange={e =>
                  setRadius(z.coerce.number().parse(e.target.value))
                }
                className={twMerge(
                  `range range-sm md:range-md disabled:hover:cursor-not-allowed`,
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
          </div>

          <MapsAPI
            ref={mapRef}
            meetUpLocation={meetUpLocation}
            radius={radius}
          />
        </div>
      </div>

      <button
        className="btn btn-primary btn-block rounded-lg text-base font-semibold shadow-sm disabled:bg-primary/70 disabled:text-primary-content"
        type="submit"
        disabled={isSubmitting}
      >
        {isSubmitting && <span className="loading loading-spinner"></span>}
        Set collection
      </button>
    </form>
  );
}
