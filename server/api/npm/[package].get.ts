import type { NpmStats, NpmDownload } from '~/types'

interface NpmDownloadPoint {
  downloads: number
  day: string
  package: string
}

interface NpmDownloadRange {
  downloads: NpmDownloadPoint[]
  package: string
  start: string
  end: string
}

export default defineEventHandler(async (event): Promise<NpmStats> => {
  const packageName = decodeURIComponent(getRouterParam(event, 'package') ?? '')

  if (!packageName) {
    throw createError({ statusCode: 400, message: 'Package name is required' })
  }

  // npm Downloads API: last 30 days
  const encoded = encodeURIComponent(packageName)
  const data = await $fetch<NpmDownloadRange>(
    `https://api.npmjs.org/downloads/range/last-month/${encoded}`
  ).catch(() => null)

  if (!data) {
    return { package: packageName, total: 0, weekly: [] }
  }

  const weekly: NpmDownload[] = data.downloads.map((d) => ({
    day: d.day,
    downloads: d.downloads,
  }))

  const total = weekly.reduce((sum, d) => sum + d.downloads, 0)

  return { package: packageName, total, weekly }
})
