<script setup lang="ts">
import type { ProjectStatus } from '../types/Project'

type FilterStatus = ProjectStatus | 'all'
const props = defineProps<{ modelValue: FilterStatus }>()
const emit = defineEmits<{
  'update:modelValue': [status: FilterStatus]
}>()

function onChange(e: Event) {
  const val = (e.target as HTMLSelectElement).value as FilterStatus
  emit('update:modelValue', val)
}
</script>

<template>
  <div
    class="inline-flex items-center gap-3 rounded-2xl border border-slate-700 bg-slate-900/80 px-4 py-3 shadow-md shadow-slate-950/20">
    <label for="status" class="text-sm font-medium text-slate-200">Filter:</label>
    <select id="status" :value="props.modelValue" @change="onChange($event)"
      class="rounded-xl border border-slate-600 bg-slate-800 px-3 py-2 text-sm text-slate-100 outline-none transition focus:border-sky-400 focus:ring-2 focus:ring-sky-500/30">
      <option value="all">Alla</option>
      <option value="planned">Planerade</option>
      <option value="active">Pågående</option>
      <option value="done">Klara</option>
    </select>
  </div>
</template>