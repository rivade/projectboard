<script setup lang="ts">
import { computed } from 'vue'
import type { Project } from '../types/Project'

const props = defineProps<{ projects: Project[] }>()

const total = computed(() => props.projects.length)
const planned = computed(() => props.projects.filter(p => p.status === 'planned').length)
const active = computed(() => props.projects.filter(p => p.status === 'active').length)
const done = computed(() => props.projects.filter(p => p.status === 'done').length)
</script>

<template>
  <div class="rounded-2xl border border-slate-700 bg-slate-900/80 px-4 py-3 shadow-md shadow-slate-950/20">
    <div class="mb-2 text-xs font-semibold uppercase tracking-[0.12em] text-slate-400">Översikt</div>
    <div class="grid grid-cols-2 gap-3 text-sm">
      <div class="rounded-xl bg-slate-800/80 p-2 text-slate-300">
        <div class="text-xs uppercase tracking-wide text-slate-400">Total</div>
        <div class="mt-1 text-lg font-semibold text-white">{{ total }}</div>
      </div>
      <div class="rounded-xl bg-sky-500/10 p-2 text-sky-200">
        <div class="text-xs uppercase tracking-wide text-sky-300">Planerade</div>
        <div class="mt-1 text-lg font-semibold">{{ planned }}</div>
      </div>
      <div class="rounded-xl bg-amber-500/10 p-2 text-amber-200">
        <div class="text-xs uppercase tracking-wide text-amber-300">Pågående</div>
        <div class="mt-1 text-lg font-semibold">{{ active }}</div>
      </div>
      <div class="rounded-xl bg-emerald-500/10 p-2 text-emerald-200">
        <div class="text-xs uppercase tracking-wide text-emerald-300">Klara</div>
        <div class="mt-1 text-lg font-semibold">{{ done }}</div>
      </div>
    </div>
  </div>
</template>