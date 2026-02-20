import { describe, it, expect } from 'vitest'

// Test URL encoding logic for scoped packages (mirrors server/api/npm/[package].get.ts)
describe('npm package URL encoding', () => {
  it('encodes scoped package names correctly', () => {
    const pkg = '@faizkhairi/loadtest-cli'
    const encoded = encodeURIComponent(pkg)
    expect(encoded).toBe('%40faizkhairi%2Floadtest-cli')
  })

  it('encodes unscoped packages correctly', () => {
    const pkg = 'fetch-backoff'
    const encoded = encodeURIComponent(pkg)
    expect(encoded).toBe('fetch-backoff')
  })

  it('decodes back to original', () => {
    const pkg = '@faizkhairi/migra-cli'
    const encoded = encodeURIComponent(pkg)
    const decoded = decodeURIComponent(encoded)
    expect(decoded).toBe(pkg)
  })
})

// Test the download total aggregation
describe('npm stats aggregation', () => {
  it('sums weekly downloads to total', () => {
    const weekly = [
      { day: '2025-01-01', downloads: 100 },
      { day: '2025-01-02', downloads: 200 },
      { day: '2025-01-03', downloads: 150 },
    ]
    const total = weekly.reduce((sum, d) => sum + d.downloads, 0)
    expect(total).toBe(450)
  })

  it('returns 0 for empty downloads', () => {
    const weekly: Array<{ day: string; downloads: number }> = []
    const total = weekly.reduce((sum, d) => sum + d.downloads, 0)
    expect(total).toBe(0)
  })
})
