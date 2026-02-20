<template>
  <div>
    <client-only>
      <apexchart
        v-if="hasData"
        type="heatmap"
        :options="chartOptions"
        :series="series"
        height="160"
      />
      <div v-else class="h-40 flex items-center justify-center text-slate-500 text-sm">
        Contribution data requires a GitHub token
      </div>
      <template #fallback>
        <div class="h-40 animate-pulse bg-slate-800 rounded-lg" />
      </template>
    </client-only>
  </div>
</template>

<script setup lang="ts">
import type { ContributionData } from '~/types'

const props = defineProps<{
  data: ContributionData
}>()

const hasData = computed(() => props.data.weeks.length > 0)

const DAYS = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat']

const series = computed(() => {
  if (!hasData.value) return []
  // Build series by day-of-week (rows), weeks are columns
  return DAYS.map((day, dayIndex) => ({
    name: day,
    data: props.data.weeks.map((week) => ({
      x: week.days[0]?.date.slice(0, 7) ?? '',
      y: week.days[dayIndex]?.count ?? 0,
    })),
  }))
})

const chartOptions = computed(() => ({
  chart: {
    type: 'heatmap',
    toolbar: { show: false },
    background: 'transparent',
    animations: { enabled: false },
  },
  dataLabels: { enabled: false },
  colors: ['#3b82f6'],
  xaxis: { labels: { show: false }, axisBorder: { show: false }, axisTicks: { show: false } },
  yaxis: { labels: { style: { colors: '#64748b', fontSize: '10px' } } },
  tooltip: {
    y: {
      formatter: (val: number) => `${val} contribution${val !== 1 ? 's' : ''}`,
    },
  },
  plotOptions: {
    heatmap: {
      shadeIntensity: 0.5,
      radius: 2,
      colorScale: {
        ranges: [
          { from: 0, to: 0, color: '#1e293b', name: 'none' },
          { from: 1, to: 3, color: '#1d4ed8', name: 'low' },
          { from: 4, to: 8, color: '#2563eb', name: 'medium' },
          { from: 9, to: 100, color: '#3b82f6', name: 'high' },
        ],
      },
    },
  },
  legend: { show: false },
  theme: { mode: 'dark' },
}))
</script>
