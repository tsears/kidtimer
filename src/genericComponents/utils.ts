export function classList (...classes: string[]) {
  console.log('c', classes)
  return classes
    .filter(c => !!c)
    .join(' ')
}
