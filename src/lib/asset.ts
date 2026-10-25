/**
 * Prefix a path from `public/` with the deployment base path. GitHub Pages
 * serves project sites from a subdirectory, so `'/images/x.svg'` alone would
 * resolve to the domain root and return 404.
 */
export function asset(path: string): string {
  return `${import.meta.env.BASE_URL}${path.replace(/^\/+/, '')}`
}
