<template>
  <div class="space-y-8">
    <h1 class="text-2xl font-bold text-white">Deployments</h1>

    <div v-if="status === 'pending'" class="space-y-3">
      <div v-for="i in 4" :key="i" class="card h-20 animate-pulse bg-slate-800" />
    </div>

    <div v-else-if="data && data.length" class="space-y-3">
      <div
        v-for="deployment in data"
        :key="deployment.uid"
        class="card flex items-center justify-between"
      >
        <div class="min-w-0 flex-1">
          <div class="flex items-center gap-3 mb-1">
            <span class="font-medium text-white">{{ deployment.name }}</span>
            <DeploymentBadge :state="deployment.state" />
          </div>
          <a
            :href="`https://${deployment.url}`"
            target="_blank"
            class="text-blue-400 hover:text-blue-300 text-sm truncate block"
          >
            {{ deployment.url }}
          </a>
          <p class="text-slate-500 text-xs mt-1">
            {{ deployment.target === 'production' ? 'Production' : 'Preview' }} ·
            {{ formatDate(deployment.createdAt) }}
          </p>
        </div>
        <a
          :href="`https://vercel.com/dashboard`"
          target="_blank"
          class="ml-4 shrink-0 text-slate-500 hover:text-white transition-colors"
          title="View in Vercel"
        >
          →
        </a>
      </div>
    </div>

    <div v-else class="card text-center py-12">
      <p class="text-slate-400">No deployments found</p>
      <p class="text-slate-600 text-sm mt-1">Add a VERCEL_TOKEN to see your deployments</p>
    </div>
  </div>
</template>

<script setup lang="ts">
import { useVercelDeployments } from '~/composables/useVercel'

const { data, status } = await useVercelDeployments()

function formatDate(ts: number): string {
  return new Date(ts).toLocaleDateString('en-MY', {
    year: 'numeric',
    month: 'short',
    day: 'numeric',
    hour: '2-digit',
    minute: '2-digit',
  })
}

useHead({ title: 'Deployments — Dev Dashboard' })
</script>
