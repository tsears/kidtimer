export function classList (...classes: string[]) {
  return classes
    .filter(c => !!c)
    .join(' ')
}
