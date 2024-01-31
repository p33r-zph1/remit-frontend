import { useState } from 'react';
import { useForm, SubmitHandler } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';

import Brand from '../components/Brand';
import Page from '../components/Page';
import useAuth from '../hooks/useAuth';
import { z } from 'zod';

const loginSchema = z.object({
  username: z.string().min(1, { message: 'Username is required' }),
  password: z.string().min(1, { message: 'Password is required' }),
});

type Inputs = z.infer<typeof loginSchema>;

export default function Login() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<Inputs>({
    resolver: zodResolver(loginSchema),
  });

  const { authenticate } = useAuth();

  const [isSubmitting, setIsSubmitting] = useState(false);

  const onSubmit: SubmitHandler<Inputs> = ({ username, password }) => {
    setIsSubmitting(true);

    authenticate({ username, password }).then(() => {
      setIsSubmitting(false);
    });
  };

  return (
    <Page className="mx-auto max-w-sm items-center justify-center space-y-16 p-0 md:max-w-md">
      <Brand />

      <form
        className="flex w-full flex-col space-y-5 rounded-lg border border-base-200 bg-white p-8 shadow-md"
        onSubmit={handleSubmit(onSubmit)}
      >
        <h1 className="text-3xl font-extrabold">Log in</h1>

        <label className="form-control w-full">
          <div className="label">
            <span className="label-text font-bold text-gray-400">ID #</span>

            {errors.username?.message && (
              <span className="label-text-alt font-semibold text-error">
                {errors.username.message}
              </span>
            )}
          </div>

          <input
            {...register('username')}
            type="text"
            className="input input-bordered w-full"
            disabled={isSubmitting}
          />
        </label>

        <label className="form-control w-full">
          <div className="label">
            <span className="label-text font-bold text-gray-400">Password</span>

            {errors.password?.message && (
              <span className="label-text-alt font-semibold text-error">
                {errors.password.message}
              </span>
            )}
          </div>

          <input
            {...register('password')}
            type="password"
            className="input input-bordered w-full"
            disabled={isSubmitting}
          />
        </label>

        <button
          className="btn btn-primary btn-block rounded-lg text-base font-semibold shadow-sm disabled:bg-primary/70 disabled:text-primary-content"
          type="submit"
          disabled={isSubmitting}
        >
          {isSubmitting && <span className="loading loading-spinner"></span>}
          Login
        </button>
      </form>
    </Page>
  );
}
