import { zodResolver } from '@hookform/resolvers/zod';
import { useCallback } from 'react';
import { type SubmitHandler, useForm } from 'react-hook-form';
import { twMerge } from 'tailwind-merge';
import { type Address, isAddress } from 'viem';
import { z } from 'zod';

import ErrorAlert from '@/src/components/Alert/ErrorAlert';
import useUpdateProfile, {
  type MutationProps,
} from '@/src/hooks/api/useUpdateProfile';
import type { Contact } from '@/src/schema/contact';

const editProfileSchema = z.object({
  walletAddress: z.string().refine(isAddress, { message: 'Invalid address' }),
  telegramHandle: z.string().min(1, { message: 'Enter telelgram handle' }),
});

type EditProfile = z.infer<typeof editProfileSchema>;

type Props = {
  userId: string;
  type: MutationProps['type'];
  walletAddress: Address | undefined;
  contact: Contact | undefined;
};

export default function EditProfile({
  userId,
  type,
  walletAddress,
  contact,
}: Props) {
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<EditProfile>({
    resolver: zodResolver(editProfileSchema),
    defaultValues: {
      walletAddress,
      telegramHandle: contact?.telegram.handle,
    },
  });

  const { mutateAsync: updateProfileAsync, error: updateProfileError } =
    useUpdateProfile();

  const onSubmit: SubmitHandler<EditProfile> = useCallback(
    async ({ walletAddress, telegramHandle }) => {
      try {
        await updateProfileAsync({
          userId,
          type,
          body: { walletAddress, telegram: telegramHandle },
        });
      } catch (err) {
        console.error({ err });
      }
    },
    [type, updateProfileAsync, userId]
  );

  return (
    <form
      className="flex w-full flex-col space-y-5"
      onSubmit={handleSubmit(onSubmit)}
    >
      <label className="form-control w-full">
        <div className="label">
          <span className="label-text font-bold text-gray-400">
            Wallet Address (EVM)
          </span>

          {errors.walletAddress && (
            <span className="label-text-alt font-semibold text-error">
              {errors.walletAddress.message}
            </span>
          )}
        </div>

        <input
          {...register('walletAddress')}
          type="text"
          autoComplete="off"
          placeholder="0x0000000000000000000000000000000000000000"
          className="input input-bordered w-full text-sm"
          disabled={isSubmitting}
        />
      </label>

      <label className="form-control w-full">
        <div className="label">
          <span className="label-text font-bold text-gray-400">
            Telegram Handle
          </span>

          {errors.telegramHandle && (
            <span className="label-text-alt font-semibold text-error">
              {errors.telegramHandle.message}
            </span>
          )}
        </div>

        <span
          className={twMerge(
            'input input-bordered flex w-full items-center gap-2  text-sm',
            isSubmitting && 'bg-slate-100 text-gray-400'
          )}
        >
          @
          <input
            {...register('telegramHandle')}
            type="text"
            autoComplete="off"
            placeholder="username"
            className="grow disabled:cursor-not-allowed"
            disabled={isSubmitting}
          />
        </span>
      </label>

      {updateProfileError && (
        <ErrorAlert message={updateProfileError.message} />
      )}

      <button
        className="btn btn-primary btn-block rounded-lg text-base font-semibold shadow-sm disabled:bg-primary/70 disabled:text-primary-content"
        type="submit"
        disabled={isSubmitting}
      >
        {isSubmitting && <span className="loading loading-spinner"></span>}
        Update
      </button>
    </form>
  );
}
