<template>
  <div class="project-filter">
    <label for="status">Filter:</label>
    <select id="status" :value="props.modelValue" @change="onChange($event)">
      <option value="all">Alla</option>
      <option value="planned">Planerade</option>
      <option value="active">Pågående</option>
      <option value="done">Klara</option>
    </select>
  </div>
</template>

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

<style scoped>
select { margin-left: 8px; padding: 4px 6px }
</style>
