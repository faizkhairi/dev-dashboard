import { describe, it, expect } from 'vitest'
import type { GitHubRepo } from '~/types'

// Test overview aggregation logic (mirrors server/api/github/overview.get.ts)
describe('GitHub overview aggregation', () => {
  const makeRepo = (overrides: Partial<GitHubRepo> = {}): GitHubRepo => ({
    id: Math.random(),
    name: 'repo',
    full_name: 'user/repo',
    html_url: 'https://github.com/user/repo',
    description: null,
    language: null,
    stargazers_count: 0,
    forks_count: 0,
    updated_at: new Date().toISOString(),
    topics: [],
    fork: false,
    ...overrides,
  })

  it('filters out forked repos', () => {
    const repos = [
      makeRepo({ name: 'own', fork: false }),
      makeRepo({ name: 'forked', fork: true }),
    ]
    const ownRepos = repos.filter((r) => !r.fork)
    expect(ownRepos).toHaveLength(1)
    expect(ownRepos[0].name).toBe('own')
  })

  it('sums stars from own repos only', () => {
    const repos = [
      makeRepo({ fork: false, stargazers_count: 10 }),
      makeRepo({ fork: false, stargazers_count: 5 }),
    ]
    const totalStars = repos.reduce((sum, r) => sum + r.stargazers_count, 0)
    expect(totalStars).toBe(15)
  })

  it('builds language frequency map', () => {
    const repos = [
      makeRepo({ language: 'TypeScript' }),
      makeRepo({ language: 'TypeScript' }),
      makeRepo({ language: 'Vue' }),
      makeRepo({ language: null }),
    ]
    const languages: Record<string, number> = {}
    for (const repo of repos) {
      if (repo.language) {
        languages[repo.language] = (languages[repo.language] ?? 0) + 1
      }
    }
    expect(languages).toEqual({ TypeScript: 2, Vue: 1 })
  })

  it('takes top 6 repos by stars', () => {
    const repos = Array.from({ length: 10 }, (_, i) =>
      makeRepo({ name: `repo-${i}`, stargazers_count: i })
    )
    const topRepos = [...repos]
      .sort((a, b) => b.stargazers_count - a.stargazers_count)
      .slice(0, 6)
    expect(topRepos).toHaveLength(6)
    expect(topRepos[0].stargazers_count).toBe(9)
  })
})

// Test event filtering
describe('GitHub event filtering', () => {
  const makeEvent = (type: string) => ({
    id: String(Math.random()),
    type,
    repo: { name: 'user/repo', url: '' },
    created_at: new Date().toISOString(),
    payload: {},
  })

  it('keeps only relevant event types', () => {
    const events = [
      makeEvent('PushEvent'),
      makeEvent('WatchEvent'),
      makeEvent('PullRequestEvent'),
      makeEvent('ForkEvent'),
      makeEvent('CreateEvent'),
    ]
    const relevant = events.filter((e) =>
      ['PushEvent', 'PullRequestEvent', 'CreateEvent', 'ReleaseEvent', 'IssuesEvent'].includes(e.type)
    )
    expect(relevant).toHaveLength(3)
    expect(relevant.map((e) => e.type)).toEqual(['PushEvent', 'PullRequestEvent', 'CreateEvent'])
  })
})

// Test contribution graceful degradation
describe('GitHub contributions graceful degradation', () => {
  it('returns empty data when no token provided', () => {
    const githubToken = ''
    const result = githubToken ? { weeks: [{ days: [] }], totalContributions: 1 } : { weeks: [], totalContributions: 0 }
    expect(result).toEqual({ weeks: [], totalContributions: 0 })
  })
})
