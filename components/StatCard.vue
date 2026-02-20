<template>
  <div class="card flex flex-col gap-1">
    <span class="text-slate-400 text-sm">{{ label }}</span>
    <span class="text-3xl font-bold text-white">{{ formattedValue }}</span>
    <span v-if="trend !== undefined" :class="['text-xs', trend >= 0 ? 'text-emerald-400' : 'text-red-400']">
      {{ trend >= 0 ? '+' : '' }}{{ trend }}% vs last month
    </span>
  </div>
</template>

<script setup lang="ts">
const props = defineProps<{
  label: string
  value: number | string
  trend?: number
}>()

const formattedValue = computed(() => {
  if (typeof props.value === 'number') {
    return props.value.toLocaleString()
  }
  return props.value
})
</script>
