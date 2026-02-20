<template>
  <span :class="['inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-xs font-medium', classes]">
    <span :class="['w-1.5 h-1.5 rounded-full', dotClass]" />
    {{ state }}
  </span>
</template>

<script setup lang="ts">
import type { VercelDeployment } from '~/types'

const props = defineProps<{
  state: VercelDeployment['state']
}>()

const classes = computed(() => {
  switch (props.state) {
    case 'READY': return 'bg-emerald-950 text-emerald-400 border border-emerald-800'
    case 'ERROR': return 'bg-red-950 text-red-400 border border-red-800'
    case 'BUILDING': return 'bg-amber-950 text-amber-400 border border-amber-800'
    case 'CANCELED': return 'bg-slate-700 text-slate-400 border border-slate-600'
    default: return 'bg-slate-700 text-slate-400 border border-slate-600'
  }
})

const dotClass = computed(() => {
  switch (props.state) {
    case 'READY': return 'bg-emerald-400'
    case 'ERROR': return 'bg-red-400'
    case 'BUILDING': return 'bg-amber-400 animate-pulse'
    default: return 'bg-slate-400'
  }
})
</script>
