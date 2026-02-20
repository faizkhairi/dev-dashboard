import type { GitHubOverview, GitHubEvent, ContributionData } from '~/types'

export function useGitHubOverview() {
  return useFetch<GitHubOverview>('/api/github/overview', {
    key: 'github-overview',
  })
}

export function useGitHubEvents() {
  return useFetch<GitHubEvent[]>('/api/github/events', {
    key: 'github-events',
  })
}

export function useGitHubContributions() {
  return useFetch<ContributionData>('/api/github/contributions', {
    key: 'github-contributions',
  })
}
