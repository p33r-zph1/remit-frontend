import { SubmitHandler, useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';

import TransferMap from '../../components/Location/MapsAPI';
import CalendarPopover from '../../components/Popover/CalendarPopover';

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

  const onSubmit: SubmitHandler<Delivery> = props => {
    console.log('success', { props });
  };

  // rerender++;

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

        <TransferMap />
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
