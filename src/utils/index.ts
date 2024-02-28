import { type NumericFormatProps, numericFormatter } from 'react-number-format';

import type { SupportedChains } from '../configs/wagmi';
import wagmi from '../configs/wagmi';

/**
 * @description Creates a promise that resolves after a specified duration.
 *
 * @param ms - The delay duration in milliseconds.
 * @returns A promise that resolves once the delay has elapsed.
 */
export function delay(ms: number): Promise<unknown> {
  return new Promise(resolve => setTimeout(resolve, ms));
}

/**
 * Converts a string to a slug format: lowercase with hyphens instead of underscores.
 *
 * @param data - The string to slugify.
 * @returns The slugified string.
 */
export function slugify(data: string): string {
  return data.toLowerCase().replace(/_/g, '-');
}

/**
 * @description Checks if the preferredChainId is supported.
 *
 * @param preferredChainId - The preffered chainId.
 * @returns `true` if the chainId is supported, otherwise `false`.
 */
export function isSupportedChain(
  preferredChainId: number | undefined
): preferredChainId is SupportedChains {
  return wagmi.chains.some(c => c.id === preferredChainId);
}

/**
 * @description Trims an error message to its first sentence.
 *
 * @param errorMessage The error message.
 * @returns First sentence or the full message if no punctuation found.
 */
export function trimErrorMessage(errorMessage: string): string {
  const match = errorMessage.match(/.*?[.!?]/);

  return match ? match[0] : errorMessage;
}

/**
 * @description Formats a number into a formatted numeric string.
 *
 * @param number - The number to format.
 * @param props - Additional formatting options (optional).
 * @returns The formatted number string.
 */
export function formatNumber(
  number: string | number,
  props?: NumericFormatProps
) {
  return numericFormatter(String(number), {
    thousandSeparator: ',',
    ...props,
  });
}
