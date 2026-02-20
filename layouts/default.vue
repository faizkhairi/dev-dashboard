<template>
  <div class="min-h-screen bg-slate-900">
    <!-- Top Nav -->
    <nav class="border-b border-slate-700 bg-slate-800/80 backdrop-blur sticky top-0 z-10">
      <div class="max-w-6xl mx-auto px-4 py-3 flex items-center gap-6">
        <NuxtLink to="/" class="font-bold text-white text-lg">
          @faizkhairi
        </NuxtLink>
        <div class="flex gap-1">
          <NuxtLink
            v-for="link in navLinks"
            :key="link.to"
            :to="link.to"
            class="px-3 py-1.5 rounded-lg text-sm text-slate-400 hover:text-white hover:bg-slate-700 transition-colors"
            active-class="text-white bg-slate-700"
          >
            {{ link.label }}
          </NuxtLink>
        </div>
      </div>
    </nav>

    <!-- Main -->
    <main class="max-w-6xl mx-auto px-4 py-8">
      <slot />
    </main>
  </div>
</template>

<script setup lang="ts">
const navLinks = [
  { to: '/', label: 'Overview' },
  { to: '/github', label: 'GitHub' },
  { to: '/packages', label: 'Packages' },
  { to: '/deployments', label: 'Deployments' },
]
</script>
