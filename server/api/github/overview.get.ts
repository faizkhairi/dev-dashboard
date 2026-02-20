import type { GitHubOverview, GitHubProfile, GitHubRepo } from '~/types'

export default defineEventHandler(async (event) => {
  const { githubToken, public: { githubUsername } } = useRuntimeConfig(event)

  const headers: Record<string, string> = {
    Accept: 'application/vnd.github.v3+json',
    'User-Agent': 'dev-dashboard/1.0',
  }
  if (githubToken) {
    headers.Authorization = `Bearer ${githubToken}`
  }

  const [profile, repos] = await Promise.all([
    $fetch<GitHubProfile>(`https://api.github.com/users/${githubUsername}`, { headers }),
    $fetch<GitHubRepo[]>(`https://api.github.com/users/${githubUsername}/repos?per_page=100&sort=updated`, { headers }),
  ])

  const ownRepos = repos.filter((r) => !r.fork)

  const totalStars = ownRepos.reduce((sum, r) => sum + r.stargazers_count, 0)
  const totalForks = ownRepos.reduce((sum, r) => sum + r.forks_count, 0)

  const topRepos = [...ownRepos]
    .sort((a, b) => b.stargazers_count - a.stargazers_count)
    .slice(0, 6)

  const languages: Record<string, number> = {}
  for (const repo of ownRepos) {
    if (repo.language) {
      languages[repo.language] = (languages[repo.language] ?? 0) + 1
    }
  }

  return {
    profile,
    totalStars,
    totalForks,
    topRepos,
    languages,
  } satisfies GitHubOverview
})
