<template>
  <div class="space-y-8">
    <h1 class="text-2xl font-bold text-white">npm Packages</h1>

    <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
      <div v-for="pkg in NPM_PACKAGES" :key="pkg" class="card space-y-4">
        <!-- Header -->
        <div>
          <h2 class="font-semibold text-white">{{ pkg }}</h2>
          <a
            :href="`https://www.npmjs.com/package/${pkg}`"
            target="_blank"
            class="text-blue-400 hover:text-blue-300 text-xs"
          >
            npmjs.com →
          </a>
        </div>

        <!-- Stats loading / loaded -->
        <NpmPackageStats :package-name="pkg" />
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { NPM_PACKAGES } from '~/composables/useNpmStats'

useHead({ title: 'Packages — Dev Dashboard' })
</script>
