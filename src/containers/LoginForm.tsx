import { zodResolver } from '@hookform/resolvers/zod';
import { useNavigate, useRouter } from '@tanstack/react-router';
import { useState } from 'react';
import { type SubmitHandler, useForm } from 'react-hook-form';
import { z } from 'zod';

import ErrorAlert from '@/src/components/Alert/ErrorAlert';
import useAuth from '@/src/hooks/useAuth';
import { Route } from '@/src/routes/login';

const loginSchema = z.object({
  username: z.string().min(1, { message: 'Username is required' }),
  password: z.string().min(1, { message: 'Password is required' }),
});

type LoginSchema = z.infer<typeof loginSchema>;

export default function Login() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginSchema>({
    resolver: zodResolver(loginSchema),
  });

  const { authenticate, error } = useAuth();

  const navigate = useNavigate({ from: Route.fullPath });
  const router = useRouter();
  const search = Route.useSearch();

  const [isSubmitting, setIsSubmitting] = useState(false);

  const onSubmit: SubmitHandler<LoginSchema> = ({ username, password }) => {
    setIsSubmitting(true);

    authenticate({ username, password }).then(() => {
      setIsSubmitting(false);

      navigate({ to: search.redirect || '/' });
      router.invalidate();
    });
  };

  return (
    <form
      className="flex w-full flex-col space-y-5 rounded-lg border border-base-200 bg-white p-8 shadow-md"
      onSubmit={handleSubmit(onSubmit)}
    >
      <h1 className="text-3xl font-extrabold">Log in</h1>

      <label className="form-control w-full">
        <div className="label">
          <span className="label-text font-bold text-gray-400">ID #</span>

          {errors.username && (
            <span className="label-text-alt font-semibold text-error">
              {errors.username.message}
            </span>
          )}
        </div>

        <input
          {...register('username')}
          type="text"
          autoComplete="off"
          className="input input-bordered w-full"
          disabled={isSubmitting}
        />
      </label>

      <label className="form-control w-full">
        <div className="label">
          <span className="label-text font-bold text-gray-400">Password</span>

          {errors.password && (
            <span className="label-text-alt font-semibold text-error">
              {errors.password.message}
            </span>
          )}
        </div>

        <input
          {...register('password')}
          type="password"
          autoComplete="off"
          className="input input-bordered w-full"
          disabled={isSubmitting}
        />
      </label>

      {error && <ErrorAlert message={error} />}

      <button
        className="btn btn-primary btn-block rounded-lg text-base font-semibold shadow-sm disabled:bg-primary/70 disabled:text-primary-content"
        type="submit"
        disabled={isSubmitting}
      >
        {isSubmitting && <span className="loading loading-spinner"></span>}
        Login
      </button>
    </form>
  );
}
