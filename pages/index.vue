<template>
  <div class="space-y-8">
    <!-- Hero -->
    <div v-if="data" class="flex items-center gap-5">
      <img :src="data.profile.avatar_url" :alt="data.profile.login" class="w-16 h-16 rounded-full ring-2 ring-slate-600" />
      <div>
        <h1 class="text-2xl font-bold text-white">{{ data.profile.name }}</h1>
        <p class="text-slate-400">{{ data.profile.bio }}</p>
        <a :href="data.profile.html_url" target="_blank" class="text-blue-400 hover:text-blue-300 text-sm">
          @{{ data.profile.login }} on GitHub →
        </a>
      </div>
    </div>
    <div v-else-if="status === 'pending'" class="flex items-center gap-5 animate-pulse">
      <div class="w-16 h-16 rounded-full bg-slate-700" />
      <div class="space-y-2">
        <div class="h-6 w-40 bg-slate-700 rounded" />
        <div class="h-4 w-60 bg-slate-700 rounded" />
      </div>
    </div>

    <!-- Stat grid -->
    <div class="grid grid-cols-2 md:grid-cols-4 gap-4">
      <StatCard label="Public Repos" :value="data?.profile.public_repos ?? 0" />
      <StatCard label="Total Stars" :value="data?.totalStars ?? 0" />
      <StatCard label="Total Forks" :value="data?.totalForks ?? 0" />
      <StatCard label="Followers" :value="data?.profile.followers ?? 0" />
    </div>

    <!-- Top Repos -->
    <div v-if="data">
      <h2 class="text-lg font-semibold text-white mb-4">Top Repositories</h2>
      <div class="card">
        <RepoTable :repos="data.topRepos" />
      </div>
    </div>

    <!-- Languages -->
    <div v-if="data && Object.keys(data.languages).length">
      <h2 class="text-lg font-semibold text-white mb-4">Languages</h2>
      <div class="card flex flex-wrap gap-2">
        <span
          v-for="[lang, count] in sortedLanguages"
          :key="lang"
          class="px-3 py-1 bg-slate-700 rounded-full text-sm text-slate-200"
        >
          {{ lang }}
          <span class="text-slate-500 text-xs ml-1">{{ count }}</span>
        </span>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { useGitHubOverview } from '~/composables/useGitHub'

const { data, status } = await useGitHubOverview()

const sortedLanguages = computed(() => {
  if (!data.value?.languages) return []
  return Object.entries(data.value.languages).sort(([, a], [, b]) => b - a)
})

useHead({ title: 'Overview — Dev Dashboard' })
</script>
