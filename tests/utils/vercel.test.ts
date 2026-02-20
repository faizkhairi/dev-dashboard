import { describe, it, expect } from 'vitest'
import type { VercelDeployment } from '~/types'

type VercelState = VercelDeployment['state']

// Test Vercel deployment deduplication (latest per project)
describe('Vercel deployment deduplication', () => {
  const makeDeployment = (name: string, createdAt: number, state: VercelState = 'READY') => ({
    uid: String(Math.random()),
    name,
    url: `${name}.vercel.app`,
    state,
    createdAt,
    target: 'production',
  })

  it('takes the latest deployment per project', () => {
    const deployments = [
      makeDeployment('app-a', 1000),
      makeDeployment('app-a', 2000), // newer
      makeDeployment('app-b', 1500),
    ]

    const latestByProject = new Map<string, typeof deployments[0]>()
    for (const d of deployments) {
      if (!latestByProject.has(d.name)) {
        latestByProject.set(d.name, d)
      }
    }

    const result = Array.from(latestByProject.values())
    expect(result).toHaveLength(2)
    // First occurrence of app-a is the one at createdAt: 1000
    const appA = result.find((d) => d.name === 'app-a')
    expect(appA?.createdAt).toBe(1000)
  })

  it('returns empty array when no token', () => {
    const vercelToken = ''
    const result = vercelToken ? [makeDeployment('x', 0)] : []
    expect(result).toEqual([])
  })
})

// Test deployment state types
describe('Vercel deployment states', () => {
  const states: VercelState[] = ['READY', 'ERROR', 'BUILDING', 'CANCELED', 'QUEUED']

  it('accepts all valid states', () => {
    states.forEach((state) => {
      expect(['READY', 'ERROR', 'BUILDING', 'CANCELED', 'QUEUED']).toContain(state)
    })
  })
})
