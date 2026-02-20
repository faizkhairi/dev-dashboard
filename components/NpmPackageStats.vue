<template>
  <div>
    <div v-if="status === 'pending'" class="space-y-3">
      <div class="h-8 w-24 bg-slate-700 rounded animate-pulse" />
      <div class="h-48 bg-slate-700 rounded animate-pulse" />
    </div>
    <template v-else-if="data">
      <p class="text-2xl font-bold text-white">
        {{ data.total.toLocaleString() }}
        <span class="text-slate-400 text-sm font-normal">downloads / 30d</span>
      </p>
      <DownloadChart :stats="data" />
    </template>
    <p v-else class="text-slate-500 text-sm">No data available</p>
  </div>
</template>

<script setup lang="ts">
import { useNpmStats } from '~/composables/useNpmStats'

const props = defineProps<{ packageName: string }>()
const { data, status } = await useNpmStats(props.packageName)
</script>
