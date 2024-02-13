import type { Address } from 'viem';

export function delay(ms: number) {
  return new Promise(resolve => setTimeout(resolve, ms));
}

export function isValidAddress(data: string | undefined): data is Address {
  if (!data) return false;

  return data.startsWith('0x');
}

export function trimErrorMessage(errorMessage: string): string {
  // Find indices of possible sentence-ending characters
  const periodIndex = errorMessage.indexOf('.');
  const exclamationIndex = errorMessage.indexOf('!');
  const questionIndex = errorMessage.indexOf('?');

  // Determine the earliest index among them; ignore if index is -1 (not found)
  const indices = [periodIndex, exclamationIndex, questionIndex].filter(
    index => index !== -1
  );

  if (indices.length === 0) {
    // No sentence-ending character found; return the whole message
    return errorMessage;
  }

  const firstSentenceEndIndex = Math.min(...indices);

  // Extract and return the first sentence, including the ending character
  return errorMessage.substring(0, firstSentenceEndIndex + 1);
}
