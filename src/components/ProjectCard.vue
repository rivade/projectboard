<script setup lang="ts">
import { computed } from 'vue'
import type { Project, ProjectStatus } from '../types/Project'

const props = defineProps<{ project: Project }>()
const emit = defineEmits<{
  remove: [id: string]
  changeStatus: [id: string, status: ProjectStatus]
}>()

const statusClass = computed(() => {
  switch (props.project.status) {
    case 'planned':
      return 'bg-sky-500/10 text-sky-200 border border-sky-500/40'
    case 'active':
      return 'bg-amber-500/10 text-amber-200 border border-amber-500/40'
    case 'done':
      return 'bg-emerald-500/10 text-emerald-200 border border-emerald-500/40'
    default:
      return 'bg-slate-700 text-slate-200'
  }
})

const statusLabel = computed(() => {
  switch (props.project.status) {
    case 'planned':
      return 'Planerad'
    case 'active':
      return 'Pågående'
    case 'done':
      return 'Klar'
    default:
      return props.project.status
  }
})
</script>

<template>
  <article class="rounded-2xl border border-slate-700 bg-slate-900/80 p-4 shadow-lg shadow-slate-950/20">
    <div class="mb-3 flex flex-col gap-2 sm:flex-row sm:items-start sm:justify-between">
      <h3 class="text-lg font-semibold text-white">{{ props.project.title }}</h3>
      <span
        class="inline-flex w-fit items-center rounded-full px-2.5 py-1 text-xs font-semibold uppercase tracking-wide"
        :class="statusClass">
        {{ statusLabel }}
      </span>
    </div>

    <p class="mb-3 text-sm leading-6 text-slate-300">{{ props.project.description || 'Ingen beskrivning.' }}</p>

    <div class="flex flex-wrap gap-2">
      <button v-if="props.project.status !== 'active'" @click="emit('changeStatus', props.project.id, 'active')"
        class="rounded-lg border border-amber-500/40 bg-amber-500/10 px-3 py-2 text-xs font-medium text-amber-200 transition hover:bg-amber-500/20">
        Markera som pågående
      </button>
      <button v-if="props.project.status !== 'done'" @click="emit('changeStatus', props.project.id, 'done')"
        class="rounded-lg border border-emerald-500/40 bg-emerald-500/10 px-3 py-2 text-xs font-medium text-emerald-200 transition hover:bg-emerald-500/20">
        Markera som klar
      </button>
      <button @click="emit('remove', props.project.id)"
        class="rounded-lg border border-rose-500/40 bg-rose-500/10 px-3 py-2 text-xs font-medium text-rose-200 transition hover:bg-rose-500/20">
        Ta bort
      </button>
    </div>
  </article>
</template>