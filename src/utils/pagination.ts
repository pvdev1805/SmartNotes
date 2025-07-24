export const getPagination = (current: number, total: number, window: number = 2) => {
  const pages: (number | string)[] = []
  if (total <= 1) return [1]
  pages.push(1)
  if (current - window > 2) pages.push('...')
  for (let i = Math.max(2, current - window); i <= Math.min(total - 1, current + window); i++) {
    pages.push(i)
  }
  if (current + window < total - 1) pages.push('...')
  if (total > 1) pages.push(total)
  return pages
}
