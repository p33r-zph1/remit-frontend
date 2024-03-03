import { zodResolver } from '@hookform/resolvers/zod';
import { useCallback, useState } from 'react';
import { type SubmitHandler, useForm } from 'react-hook-form';
import { twMerge } from 'tailwind-merge';
import { type Address, isAddress } from 'viem';
import { z } from 'zod';

import ErrorAlert from '@/src/components/Alert/ErrorAlert';
import SuccessAlert from '@/src/components/Alert/SuccessAlert';
import Modal from '@/src/components/Modal';
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
    getValues,
    formState: { errors },
  } = useForm<EditProfile>({
    resolver: zodResolver(editProfileSchema),
    defaultValues: {
      walletAddress,
      telegramHandle: contact?.telegram.handle,
    },
  });

  const {
    mutateAsync: updateProfileAsync,
    isPending: isUpdatingProfile,
    isSuccess: updateProfileSuccess,
    error: updateProfileError,
  } = useUpdateProfile();

  const [modalVisible, setModalVisible] = useState(false);
  const [onUpdateProfile, setOnUpdateProfile] = useState<() => void>();

  const onSubmit: SubmitHandler<EditProfile> = useCallback(
    ({ walletAddress, telegramHandle }) => {
      async function updateProfile() {
        try {
          await updateProfileAsync({
            userId,
            type,
            body: { walletAddress, telegram: telegramHandle },
          });

          setModalVisible(false);
        } catch (err) {
          setModalVisible(false);
          console.error({ err });
        }
      }

      setOnUpdateProfile(() => updateProfile);
      setModalVisible(true);
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
          disabled={isUpdatingProfile}
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
            isUpdatingProfile && 'bg-slate-100 text-gray-400'
          )}
        >
          @
          <input
            {...register('telegramHandle')}
            type="text"
            autoComplete="off"
            placeholder="username"
            className="grow disabled:cursor-not-allowed"
            disabled={isUpdatingProfile}
          />
        </span>
      </label>

      {updateProfileError && (
        <ErrorAlert message={updateProfileError.message} />
      )}

      {updateProfileSuccess && (
        <SuccessAlert message="Update profile success" isComplete />
      )}

      <button
        className="btn btn-primary btn-block rounded-lg text-base font-semibold shadow-sm disabled:bg-primary/70 disabled:text-primary-content"
        type="submit"
        disabled={isUpdatingProfile}
      >
        Update
      </button>

      <Modal
        open={modalVisible}
        isLoading={isUpdatingProfile}
        onClose={() => setModalVisible(false)}
        type="action"
        actions={{
          confirm: {
            label: 'Update',
            action: () => onUpdateProfile?.(),
          },
          cancel: {
            label: 'Cancel',
          },
        }}
        slideFrom="top"
        title="Confirm profile update"
        size="medium"
      >
        <p className="text-balance text-slate-500">
          My wallet address: {` `}
          <div className="mx-6 sm:m-0">
            <code className=" break-words font-semibold">
              {getValues('walletAddress')}
            </code>
          </div>
          <br />
          My telegram: {` `}
          <button
            className="link link-secondary font-semibold"
            onClick={() =>
              window.open(
                `https://telegram.me/${getValues('telegramHandle')}`,
                '_blank'
              )
            }
          >
            @{getValues('telegramHandle')}
          </button>
        </p>
      </Modal>
    </form>
  );
}
