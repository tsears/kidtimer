interface CssClasses {
  [cssClass: string] : boolean
}

export function classList (...classes: CssClasses[]) {
  return classes
    .filter(c => !!c)
    .join(' ')
}
