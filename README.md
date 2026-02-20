# Dev Dashboard

Personal developer command center — GitHub activity, npm package analytics, and Vercel deployment status, all in one dark-mode web app.

[![CI](https://github.com/faizkhairi/dev-dashboard/actions/workflows/ci.yml/badge.svg)](https://github.com/faizkhairi/dev-dashboard/actions/workflows/ci.yml)

---

## Features

| Section | What it shows |
|---------|--------------|
| **Overview** | Profile hero, total stars/forks, top repos table, language breakdown |
| **GitHub** | Contribution heatmap (calendar) + recent push/PR/release events |
| **Packages** | npm download trends for published packages (last 30 days) |
| **Deployments** | Latest Vercel deploy state per project (READY / ERROR / BUILDING) |

All external API calls are proxied through Nuxt server routes — no tokens ever reach the client.

---

## Stack

- **Nuxt 3** + Vue 3 + TypeScript
- **NuxtJS Tailwind CSS** — utility-first styles
- **Pinia** — cross-page data caching
- **ApexCharts** (`vue3-apexcharts`) — contribution heatmap + download line chart
- **Nitro** with `vercel` preset — deployed to Vercel Edge Functions

---

## Quick Start

```bash
git clone https://github.com/faizkhairi/dev-dashboard
cd dev-dashboard
npm install
cp .env.example .env   # add your tokens
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

### Environment Variables

```env
NUXT_GITHUB_TOKEN=github_pat_...      # read:user, public_repo, read:org scopes
NUXT_VERCEL_TOKEN=...                  # Vercel API token
NUXT_PUBLIC_GITHUB_USERNAME=faizkhairi
```

The dashboard works without tokens — it just shows empty states for token-gated sections (contribution calendar, Vercel deployments).

---

## Architecture

```
server/api/
├── github/
│   ├── overview.get.ts       # Profile + aggregated repo stats
│   ├── events.get.ts         # Recent public events (filtered)
│   └── contributions.get.ts  # GitHub GraphQL contribution calendar
├── npm/
│   └── [package].get.ts      # npm Downloads API (scoped packages URL-encoded)
└── vercel/
    └── deployments.get.ts    # Latest deploy per project

composables/
├── useGitHub.ts     # useFetch wrappers for /api/github/*
├── useNpmStats.ts   # useFetch wrappers for /api/npm/*
└── useVercel.ts     # useFetch wrapper for /api/vercel/deployments

components/
├── StatCard.vue             # Metric number + label + trend
├── ContributionHeatmap.vue  # ApexCharts heatmap (client-only)
├── DownloadChart.vue        # ApexCharts line chart (client-only)
├── DeploymentBadge.vue      # Colored state pill
├── NpmPackageStats.vue      # Total + chart for a single package
└── RepoTable.vue            # Sortable repos table
```

---

## Testing

```bash
npm test              # 14 unit tests (Vitest)
npm run lint          # TypeScript check (nuxt typecheck)
npm run build         # Vercel preset build
```

---

## Deploy

```bash
vercel --prod
```

Set `NUXT_GITHUB_TOKEN` and `NUXT_VERCEL_TOKEN` in your Vercel project settings.

---

## License

MIT © [Faiz Khairi](https://faizkhairi.github.io)
