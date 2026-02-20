export interface GitHubProfile {
  login: string
  name: string
  avatar_url: string
  bio: string
  public_repos: number
  followers: number
  following: number
  html_url: string
}

export interface GitHubRepo {
  id: number
  name: string
  full_name: string
  html_url: string
  description: string | null
  language: string | null
  stargazers_count: number
  forks_count: number
  updated_at: string
  topics: string[]
  fork: boolean
}

export interface GitHubOverview {
  profile: GitHubProfile
  totalStars: number
  totalForks: number
  topRepos: GitHubRepo[]
  languages: Record<string, number>
}

export interface GitHubEvent {
  id: string
  type: string
  repo: { name: string; url: string }
  created_at: string
  payload: Record<string, unknown>
}

export interface ContributionDay {
  date: string
  count: number
}

export interface ContributionWeek {
  days: ContributionDay[]
}

export interface ContributionData {
  weeks: ContributionWeek[]
  totalContributions: number
}

export interface NpmDownload {
  day: string
  downloads: number
}

export interface NpmStats {
  package: string
  total: number
  weekly: NpmDownload[]
}

export interface VercelDeployment {
  uid: string
  name: string
  url: string
  state: 'READY' | 'ERROR' | 'BUILDING' | 'CANCELED' | 'QUEUED'
  createdAt: number
  target: string | null
}
