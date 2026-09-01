<template>
  <div class="project-summary">
    <div>Total: {{ total }}</div>
    <div>Planerade: {{ planned }}</div>
    <div>Pågående: {{ active }}</div>
    <div>Klara: {{ done }}</div>
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import type { Project } from '../types/Project'

const props = defineProps<{ projects: Project[] }>()

const total = computed(() => props.projects.length)
const planned = computed(() => props.projects.filter(p => p.status === 'planned').length)
const active = computed(() => props.projects.filter(p => p.status === 'active').length)
const done = computed(() => props.projects.filter(p => p.status === 'done').length)
</script>

<style scoped>
.project-summary { display: grid; grid-template-columns: repeat(2, minmax(0,1fr)); gap: 8px }
</style>
