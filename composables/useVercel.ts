import type { VercelDeployment } from '~/types'

export function useVercelDeployments() {
  return useFetch<VercelDeployment[]>('/api/vercel/deployments', {
    key: 'vercel-deployments',
  })
}
