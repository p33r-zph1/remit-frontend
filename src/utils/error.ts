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
