import type { VercelDeployment } from '~/types'

interface VercelApiDeployment {
  uid: string
  name: string
  url: string
  state: string
  createdAt: number
  target: string | null
}

export default defineEventHandler(async (event): Promise<VercelDeployment[]> => {
  const { vercelToken } = useRuntimeConfig(event)

  if (!vercelToken) {
    return []
  }

  const response = await $fetch<{ deployments: VercelApiDeployment[] }>(
    'https://api.vercel.com/v6/deployments?limit=20',
    {
      headers: {
        Authorization: `Bearer ${vercelToken}`,
      },
    }
  ).catch(() => ({ deployments: [] }))

  // Group by project name, take latest per project
  const latestByProject = new Map<string, VercelApiDeployment>()
  for (const d of response.deployments) {
    if (!latestByProject.has(d.name)) {
      latestByProject.set(d.name, d)
    }
  }

  return Array.from(latestByProject.values()).map((d) => ({
    uid: d.uid,
    name: d.name,
    url: d.url,
    state: d.state as VercelDeployment['state'],
    createdAt: d.createdAt,
    target: d.target,
  }))
})
