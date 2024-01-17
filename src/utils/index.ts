export function cx(...classes: string[]) {
  return classes.filter(Boolean).join(' ');
}

export function delay(ms: number) {
  return new Promise(resolve => setTimeout(resolve, ms));
}
