export function computedIconStyle(style: string): string {
  let className = 'fa'
  switch (style) {
    case 'brands':
      className = 'fab'
      break
    case 'regular':
      className = 'far'
      break
    case 'solid':
      className = 'fa'
      break
    default:
      className = style
  }
  return className
}
