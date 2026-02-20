import type { NpmStats } from '~/types'

// All published @faizkhairi packages
export const NPM_PACKAGES = [
  '@faizkhairi/loadtest-cli',
  '@faizkhairi/migra-cli',
  'fetch-backoff',
  'flatfile-js',
]

export function useNpmStats(packageName: string) {
  const encoded = encodeURIComponent(packageName)
  return useFetch<NpmStats>(`/api/npm/${encoded}`, {
    key: `npm-${packageName}`,
  })
}

export function useAllNpmStats() {
  return NPM_PACKAGES.map((pkg) => {
    const encoded = encodeURIComponent(pkg)
    return useFetch<NpmStats>(`/api/npm/${encoded}`, {
      key: `npm-${pkg}`,
    })
  })
}
