type ErrorWithMessage = {
  message: string;
};

function isErrorWithKey<TKey extends string>(
  error: unknown,
  key: TKey
): error is Record<TKey, string> {
  return (
    typeof error === 'object' &&
    error !== null &&
    key in error &&
    typeof (error as Record<string, unknown>)[key] === 'string'
  );
}

function toErrorWithMessage(maybeError: unknown): ErrorWithMessage {
  // checking for reason key must come first because it has a
  // better error message on metamask than the message key
  if (isErrorWithKey(maybeError, 'reason')) return new Error(maybeError.reason);
  if (isErrorWithKey(maybeError, 'message')) return maybeError;

  try {
    return new Error(JSON.stringify(maybeError));
  } catch {
    // fallback in case there's an error stringifying the maybeError
    // like with circular references for example.
    return new Error(String(maybeError));
  }
}

export function getErrorMessage(error: unknown) {
  return toErrorWithMessage(error).message;
}

/**
 * @description Wrapper around `React.lazy`: If an import fails, it will reload the page once. If it fails again, it will throw an error (error will be handled by `ErrorBoundary`)
 * @param {unknown} error - Expected to be related to dynamic import or code splitting.
 */
export async function maybeLazyError(error: unknown) {
  // Get the last reload time from local storage and the current time
  const timeStr = sessionStorage.getItem('last-reload');
  const time = timeStr ? Number(timeStr) : null;
  const now = Date.now();

  // If the last reload time is more than 10 seconds ago, reload the page
  const isReloading = !time || time + 10_000 < now;

  if (isReloading) {
    console.log('Reloading due to a potential fixable loading error.');
    sessionStorage.setItem('last-reload', String(now));

    window.location.reload();
  }

  // We let ErrorBoundary handle the error
  throw error;
}
