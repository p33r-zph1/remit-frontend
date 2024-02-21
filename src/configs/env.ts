import urlJoin from 'url-join';
import { z } from 'zod';

export const envs = z.object({
  VITE_MAPS_JS_API: z.string().min(1),
  VITE_COGNITO_USER_POOL_ID: z.string().min(1),
  VITE_COGNITO_USER_POOL_CLIENT_ID: z.string().min(1),
  VITE_API_URL: z.string().url(),
  VITE_API_FLAVOR: z.enum(['develop', 'main']),
});

export const parsedEnvs = envs.parse(import.meta.env);

const { VITE_API_URL, VITE_API_FLAVOR } = parsedEnvs;

export function makeApiUrl(relativeUrl: `/${string}`) {
  return new URL(urlJoin(VITE_API_URL, VITE_API_FLAVOR, relativeUrl));
}
