<template>
  <div class="project-card">
    <h3>{{ props.project.title }}</h3>
    <p>{{ props.project.description }}</p>
    <p><strong>Status:</strong> {{ props.project.status }}</p>
    <div class="actions">
      <button @click="emit('changeStatus', props.project.id, 'active')">Markera som pågående</button>
      <button @click="emit('changeStatus', props.project.id, 'done')">Markera som klar</button>
      <button @click="emit('remove', props.project.id)">Ta bort</button>
    </div>
  </div>
</template>

<script setup lang="ts">
import type { Project, ProjectStatus } from '../types/Project'

const props = defineProps<{ project: Project }>()
const emit = defineEmits<{
  remove: [id: string]
  changeStatus: [id: string, status: ProjectStatus]
}>()
</script>

<style scoped>
.project-card { border: 1px solid #e5e7eb; padding: 12px; border-radius: 6px; }
.actions { margin-top: 8px; display: flex; gap: 8px; }
button { padding: 6px 10px; border-radius: 4px; border: 1px solid #ccc; background: #fff; cursor: pointer }
</style>
