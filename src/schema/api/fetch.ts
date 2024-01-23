import { z } from 'zod';

export type Options = {
  refetchInterval: number;
};

export const baseSchema = z.object({
  message: z.string(),
  data: z.any(),
  copyright: z.string(),
});

export async function genericFetch<T extends z.ZodSchema>(
  url: string,
  schema: T
): Promise<z.infer<T>> {
  const response = await fetch(url);
  const json = await response.json();
  const result = schema.safeParse(json);

  if (!result.success) {
    throw new Error(getMessage(json));
  }

  return result;
}

export function makeApiSchema<T extends z.ZodSchema>(schema: T) {
  return baseSchema.extend({ data: schema });
}

export function getMessage(response: unknown) {
  const result = baseSchema.safeParse(response);

  if (!result.success) {
    console.error(result.error.message);

    throw new Error(
      'There was a problem parsing the response of the api. Please try again later.'
    );
  }

  return result.data.message;
}
