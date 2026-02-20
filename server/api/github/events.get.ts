import type { GitHubEvent } from '~/types'

export default defineEventHandler(async (event) => {
  const { githubToken, public: { githubUsername } } = useRuntimeConfig(event)

  const headers: Record<string, string> = {
    Accept: 'application/vnd.github.v3+json',
    'User-Agent': 'dev-dashboard/1.0',
  }
  if (githubToken) {
    headers.Authorization = `Bearer ${githubToken}`
  }

  const events = await $fetch<GitHubEvent[]>(
    `https://api.github.com/users/${githubUsername}/events/public?per_page=30`,
    { headers }
  )

  // Return only meaningful event types
  const relevant = events.filter((e) =>
    ['PushEvent', 'PullRequestEvent', 'CreateEvent', 'ReleaseEvent', 'IssuesEvent'].includes(e.type)
  )

  return relevant.slice(0, 20)
})
