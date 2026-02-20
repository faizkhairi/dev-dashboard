<template>
  <div>
    <client-only>
      <apexchart
        v-if="hasData"
        type="line"
        :options="chartOptions"
        :series="series"
        height="200"
      />
      <div v-else class="h-48 flex items-center justify-center text-slate-500 text-sm">
        No download data available
      </div>
      <template #fallback>
        <div class="h-48 animate-pulse bg-slate-800 rounded-lg" />
      </template>
    </client-only>
  </div>
</template>

<script setup lang="ts">
import type { NpmStats } from '~/types'

const props = defineProps<{
  stats: NpmStats
}>()

const hasData = computed(() => props.stats.weekly.length > 0)

const series = computed(() => [{
  name: props.stats.package,
  data: props.stats.weekly.map((d) => ({
    x: d.day,
    y: d.downloads,
  })),
}])

const chartOptions = computed(() => ({
  chart: {
    type: 'line',
    toolbar: { show: false },
    background: 'transparent',
    sparkline: { enabled: false },
  },
  stroke: { curve: 'smooth', width: 2 },
  colors: ['#3b82f6'],
  xaxis: {
    type: 'datetime',
    labels: { style: { colors: '#64748b', fontSize: '10px' } },
    axisBorder: { show: false },
    axisTicks: { show: false },
  },
  yaxis: {
    labels: {
      style: { colors: '#64748b', fontSize: '10px' },
      formatter: (val: number) => val.toLocaleString(),
    },
    min: 0,
  },
  grid: { borderColor: '#1e293b' },
  tooltip: { theme: 'dark', x: { format: 'dd MMM' } },
  dataLabels: { enabled: false },
  theme: { mode: 'dark' },
}))
</script>
