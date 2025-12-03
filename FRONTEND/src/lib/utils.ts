export function cn(...args: Array<string | false | null | undefined>) {
  return args.filter(Boolean).join(' ')
}

export function normalizeSearchValue(value: string) {
  return value
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    .toLowerCase()
    .trim()
}

export default cn
