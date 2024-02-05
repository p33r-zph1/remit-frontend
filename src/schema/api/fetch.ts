import { fetchAuthSession } from 'aws-amplify/auth';
import { fromZodError } from 'zod-validation-error';
import { z } from 'zod';

export const baseSchema = z.object({
  message: z.string(),
  data: z.any(),
  copyright: z.string(),
});

export async function genericFetch<T extends z.ZodSchema>(
  url: string,
  schema: T,
  fetchOptions?: RequestInit
): Promise<z.infer<T>> {
  const session = await fetchAuthSession();

  const response = await fetch(url, {
    ...fetchOptions,
    headers: {
      Authorization: `Bearer ${session?.tokens?.idToken}`,
      'Content-Type': 'application/json',
      ...fetchOptions?.headers,
    },
  });
  const json = await response.json();
  const result = schema.safeParse(json);

  console.log(url, 'hi');

  if (!result.success) {
    console.log(url, 'ello');
    throw new Error(getMessage(json, result.error, response.ok));
  }
  console.log(url, 'wow');

  return result.data;
}

export function makeApiSchema<T extends z.ZodSchema>(schema: T) {
  return baseSchema.extend({ data: schema });
}

export function getMessage(
  response: unknown,
  resultError: z.ZodError,
  isResponseOk: boolean
) {
  const result = baseSchema.safeParse(response);

  // message from zod
  if (isResponseOk) return fromZodError(resultError).toString();

  // message from the api
  if (result.success) return result.data.message;

  // generic message (unhandled error)
  return 'An unexpected error occurred while processing your request. Please try again later.';
}
