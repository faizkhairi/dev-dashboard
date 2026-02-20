<template>
  <div class="space-y-8">
    <h1 class="text-2xl font-bold text-white">GitHub Activity</h1>

    <!-- Contribution Heatmap -->
    <div class="card">
      <div class="flex items-center justify-between mb-4">
        <h2 class="text-lg font-semibold text-white">Contributions</h2>
        <span v-if="contributions" class="text-slate-400 text-sm">
          {{ contributions.totalContributions.toLocaleString() }} contributions in the last year
        </span>
      </div>
      <ContributionHeatmap v-if="contributions" :data="contributions" />
      <div v-else class="h-40 animate-pulse bg-slate-700 rounded-lg" />
    </div>

    <!-- Recent Events -->
    <div>
      <h2 class="text-lg font-semibold text-white mb-4">Recent Activity</h2>
      <div class="card space-y-3">
        <div v-if="eventsStatus === 'pending'" class="space-y-3">
          <div v-for="i in 5" :key="i" class="h-12 bg-slate-700 rounded animate-pulse" />
        </div>
        <template v-else-if="events && events.length">
          <div
            v-for="event in events"
            :key="event.id"
            class="flex items-start gap-3 py-2 border-b border-slate-700 last:border-0"
          >
            <span class="text-slate-400 text-xs mt-1 shrink-0">{{ eventIcon(event.type) }}</span>
            <div class="min-w-0">
              <p class="text-slate-200 text-sm">
                <span class="font-medium">{{ eventLabel(event) }}</span>
                <span class="text-slate-500 text-xs ml-2">{{ formatRelative(event.created_at) }}</span>
              </p>
              <a
                :href="`https://github.com/${event.repo.name}`"
                target="_blank"
                class="text-blue-400 hover:text-blue-300 text-xs"
              >
                {{ event.repo.name }}
              </a>
            </div>
          </div>
        </template>
        <p v-else class="text-slate-500 text-sm">No recent activity</p>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { useGitHubEvents, useGitHubContributions } from '~/composables/useGitHub'
import type { GitHubEvent } from '~/types'

const { data: events, status: eventsStatus } = await useGitHubEvents()
const { data: contributions } = await useGitHubContributions()

function eventIcon(type: string): string {
  switch (type) {
    case 'PushEvent': return '📦'
    case 'PullRequestEvent': return '🔀'
    case 'CreateEvent': return '✨'
    case 'ReleaseEvent': return '🚀'
    case 'IssuesEvent': return '🐛'
    default: return '🔔'
  }
}

function eventLabel(event: GitHubEvent): string {
  switch (event.type) {
    case 'PushEvent': {
      const payload = event.payload as { commits?: unknown[] }
      const count = payload.commits?.length ?? 1
      return `Pushed ${count} commit${count !== 1 ? 's' : ''}`
    }
    case 'PullRequestEvent': {
      const payload = event.payload as { action?: string }
      return `PR ${payload.action ?? 'event'}`
    }
    case 'CreateEvent': {
      const payload = event.payload as { ref_type?: string; ref?: string }
      return `Created ${payload.ref_type ?? 'ref'} ${payload.ref ?? ''}`
    }
    case 'ReleaseEvent': return 'Published release'
    case 'IssuesEvent': {
      const payload = event.payload as { action?: string }
      return `Issue ${payload.action ?? 'event'}`
    }
    default: return event.type.replace('Event', '')
  }
}

function formatRelative(iso: string): string {
  const diff = Date.now() - new Date(iso).getTime()
  const hours = Math.floor(diff / 3600000)
  if (hours < 1) return 'just now'
  if (hours < 24) return `${hours}h ago`
  const days = Math.floor(hours / 24)
  return `${days}d ago`
}

useHead({ title: 'GitHub Activity — Dev Dashboard' })
</script>
