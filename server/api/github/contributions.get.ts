import type { ContributionData } from '~/types'

const CONTRIBUTION_QUERY = `
  query($username: String!) {
    user(login: $username) {
      contributionsCollection {
        contributionCalendar {
          totalContributions
          weeks {
            contributionDays {
              date
              contributionCount
            }
          }
        }
      }
    }
  }
`

export default defineEventHandler(async (event): Promise<ContributionData> => {
  const { githubToken, public: { githubUsername } } = useRuntimeConfig(event)

  if (!githubToken) {
    return { weeks: [], totalContributions: 0 }
  }

  const response = await $fetch<{
    data: {
      user: {
        contributionsCollection: {
          contributionCalendar: {
            totalContributions: number
            weeks: Array<{
              contributionDays: Array<{ date: string; contributionCount: number }>
            }>
          }
        }
      }
    }
  }>('https://api.github.com/graphql', {
    method: 'POST',
    headers: {
      Authorization: `Bearer ${githubToken}`,
      'User-Agent': 'dev-dashboard/1.0',
    },
    body: { query: CONTRIBUTION_QUERY, variables: { username: githubUsername } },
  })

  const calendar = response.data.user.contributionsCollection.contributionCalendar

  return {
    totalContributions: calendar.totalContributions,
    weeks: calendar.weeks.map((week) => ({
      days: week.contributionDays.map((day) => ({
        date: day.date,
        count: day.contributionCount,
      })),
    })),
  }
})
