import { type ElementRef, useRef } from 'react';
import { type SubmitHandler, useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import {
  useLoadScript,
  type Libraries,
  GoogleMap,
} from '@react-google-maps/api';
import { twMerge } from 'tailwind-merge';
import { z } from 'zod';

import useSetCollection, {
  type MutationProps,
} from '../../hooks/api/useSetCollection';
import useOrderDetails from '../../hooks/useOrderDetails';

import MapsAPI from '../../components/Location/MapsAPI';
import CalendarPopover from '../../components/Popover/CalendarPopover';
import PlacesAutocomplete from '../../components/Autocomplete/PlacesAutocomplete';
import LoadingRing from '../../components/Spinner/LoadingRing';
import ErrorAlert from '../../components/Alert/ErrorAlert';

const deliveryProps = z.object({
  startDate: z.date({
    required_error: 'Please enter a valid delivery date',
  }),
  endDate: z.date(),
  areaName: z.string().min(1, { message: 'Please enter your delivery area' }),
  radius: z.string(),
  coordinates: z.object({
    latitude: z.string(),
    longitude: z.string(),
  }),
});

type Delivery = z.infer<typeof deliveryProps>;

const libraries: Libraries = ['places'];

// let rerender = 0;

type Props = {
  meetupType: MutationProps['meetupType'];
};

export default function AgentMeetup({ meetupType }: Props) {
  const {
    control,
    register,
    handleSubmit,
    setValue,
    getValues,
    watch,
    formState: { errors, isSubmitting },
  } = useForm<Delivery>({
    resolver: zodResolver(deliveryProps),
    defaultValues: {
      radius: '200',
      areaName: '',
    },
  });

  const mapRef = useRef<ElementRef<typeof GoogleMap>>();

  const { isLoaded } = useLoadScript({
    googleMapsApiKey: import.meta.env.VITE_MAPS_JS_API,
    libraries,
  });

  const {
    order: { orderId },
  } = useOrderDetails();

  const { mutateAsync: setCollectionAsync, error } = useSetCollection();

  const onSubmit: SubmitHandler<Delivery> = async ({
    areaName,
    coordinates,
    startDate,
    endDate,
    radius,
  }) => {
    try {
      await setCollectionAsync({
        orderId,
        meetupType,
        body: {
          areaName,
          startDate,
          endDate,
          radius: {
            value: Number(radius),
            unit: 'm',
          },
          coordinates,
        },
      });
    } catch (err) {
      console.error(err);
    }
  };

  // rerender++;

  if (!isLoaded) return <LoadingRing className="h-32" />;

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col space-y-4">
      {/* {rerender / 2} */}

      <label className="form-control w-full">
        <div className="label">
          <span className="label-text text-sm font-semibold text-gray-400">
            Set delivery date and time
          </span>

          {errors.startDate && (
            <span className="label-text-alt font-semibold text-error">
              {errors.startDate.message}
            </span>
          )}
        </div>

        <CalendarPopover
          control={control}
          name="startDate"
          setEndDate={date => setValue('endDate', date)}
        />
      </label>

      <label className="form-control w-full">
        <div className="label">
          <span className="label-text text-sm font-semibold text-gray-400">
            Set delivery area
          </span>

          {errors.areaName && (
            <span className="label-text-alt font-semibold text-error">
              {errors.areaName.message}
            </span>
          )}
        </div>

        <div className="flex flex-col rounded-lg border border-slate-200">
          <div className="mt-2 flex flex-col space-y-4 p-4">
            <PlacesAutocomplete
              control={control}
              name="areaName"
              onSelect={location => {
                setValue('coordinates', {
                  latitude: String(location.lat),
                  longitude: String(location.lng),
                });

                mapRef.current?.panTo(location);
              }}
            />

            <div className="flex flex-col">
              <div className="text-sm font-semibold text-gray-400">Radius</div>
            </div>

            <div className="tooltip" data-tip="Select a radius">
              <input
                {...register('radius')}
                type="range"
                min={200}
                max={1000}
                disabled={!watch('coordinates') || isSubmitting}
                className={twMerge(
                  `range range-sm md:range-md disabled:hover:cursor-not-allowed`,
                  watch('coordinates') && !isSubmitting && 'range-primary'
                )}
                step="200"
              />
              <div className="flex w-full justify-between px-2 text-xs">
                <span>200</span>
                <span>400m</span>
                <span>600m</span>
                <span>800m</span>
                <span>1km</span>
              </div>
            </div>
          </div>

          {!errors.areaName && errors.coordinates && (
            <span className="my-2 self-center text-xs font-semibold text-error">
              Oops! that location is currently not available, please try again
              later.
            </span>
          )}

          <MapsAPI
            ref={mapRef}
            meetUpLocation={
              watch('coordinates') && {
                lat: Number(getValues('coordinates').latitude),
                lng: Number(getValues('coordinates').longitude),
              }
            }
            radius={Number(watch('radius'))}
            disabled={isSubmitting}
          />
        </div>
      </label>

      {error && <ErrorAlert message={error.message} />}

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
