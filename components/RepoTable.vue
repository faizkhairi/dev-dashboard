<template>
  <div class="overflow-x-auto">
    <table class="w-full text-sm">
      <thead>
        <tr class="border-b border-slate-700 text-left text-slate-400">
          <th class="pb-3 font-medium">Repository</th>
          <th class="pb-3 font-medium">Language</th>
          <th class="pb-3 font-medium cursor-pointer hover:text-white" @click="sort('stargazers_count')">
            Stars {{ sortKey === 'stargazers_count' ? (sortDesc ? '↓' : '↑') : '' }}
          </th>
          <th class="pb-3 font-medium cursor-pointer hover:text-white" @click="sort('forks_count')">
            Forks {{ sortKey === 'forks_count' ? (sortDesc ? '↓' : '↑') : '' }}
          </th>
          <th class="pb-3 font-medium cursor-pointer hover:text-white" @click="sort('updated_at')">
            Updated {{ sortKey === 'updated_at' ? (sortDesc ? '↓' : '↑') : '' }}
          </th>
        </tr>
      </thead>
      <tbody class="divide-y divide-slate-800">
        <tr v-for="repo in sorted" :key="repo.id" class="hover:bg-slate-800/50 transition-colors">
          <td class="py-3 pr-4">
            <a :href="repo.html_url" target="_blank" class="text-blue-400 hover:text-blue-300 font-medium">
              {{ repo.name }}
            </a>
            <p v-if="repo.description" class="text-slate-500 text-xs mt-0.5 line-clamp-1">{{ repo.description }}</p>
          </td>
          <td class="py-3 pr-4">
            <span v-if="repo.language" class="text-slate-300">{{ repo.language }}</span>
            <span v-else class="text-slate-600">—</span>
          </td>
          <td class="py-3 pr-4 text-slate-300">⭐ {{ repo.stargazers_count }}</td>
          <td class="py-3 pr-4 text-slate-300">🍴 {{ repo.forks_count }}</td>
          <td class="py-3 text-slate-500">{{ formatDate(repo.updated_at) }}</td>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<script setup lang="ts">
import type { GitHubRepo } from '~/types'

const props = defineProps<{
  repos: GitHubRepo[]
}>()

type SortKey = 'stargazers_count' | 'forks_count' | 'updated_at'
const sortKey = ref<SortKey>('stargazers_count')
const sortDesc = ref(true)

function sort(key: SortKey) {
  if (sortKey.value === key) {
    sortDesc.value = !sortDesc.value
  } else {
    sortKey.value = key
    sortDesc.value = true
  }
}

const sorted = computed(() => {
  return [...props.repos].sort((a, b) => {
    const aVal = a[sortKey.value]
    const bVal = b[sortKey.value]
    const cmp = typeof aVal === 'number' ? (aVal as number) - (bVal as number) : (aVal as string).localeCompare(bVal as string)
    return sortDesc.value ? -cmp : cmp
  })
})

function formatDate(iso: string) {
  return new Date(iso).toLocaleDateString('en-MY', { year: 'numeric', month: 'short', day: 'numeric' })
}
</script>
