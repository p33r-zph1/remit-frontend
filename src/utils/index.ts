export function cx(...classes: Array<string | false | undefined>) {
  return classes.filter(Boolean).join(' ');
}

export function delay(ms: number) {
  return new Promise(resolve => setTimeout(resolve, ms));
}
