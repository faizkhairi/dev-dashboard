import { defineStore } from 'pinia'
import type { GitHubOverview, GitHubEvent, ContributionData, NpmStats, VercelDeployment } from '~/types'

export const useDashboardStore = defineStore('dashboard', () => {
  const overview = ref<GitHubOverview | null>(null)
  const events = ref<GitHubEvent[]>([])
  const contributions = ref<ContributionData | null>(null)
  const npmStats = ref<NpmStats[]>([])
  const deployments = ref<VercelDeployment[]>([])

  function setOverview(data: GitHubOverview) {
    overview.value = data
  }

  function setEvents(data: GitHubEvent[]) {
    events.value = data
  }

  function setContributions(data: ContributionData) {
    contributions.value = data
  }

  function setNpmStats(data: NpmStats[]) {
    npmStats.value = data
  }

  function setDeployments(data: VercelDeployment[]) {
    deployments.value = data
  }

  return { overview, events, contributions, npmStats, deployments, setOverview, setEvents, setContributions, setNpmStats, setDeployments }
})
