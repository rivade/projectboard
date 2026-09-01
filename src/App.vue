<script setup lang="ts">
import { computed, ref, watch } from 'vue'
import type { Project, ProjectStatus } from './types/Project'
import { loadProjects, saveProjects } from './services/projectstorage'
import ProjectForm from './components/ProjectForm.vue'
import ProjectFilter from './components/ProjectFilter.vue'
import ProjectSummary from './components/ProjectSummary.vue'
import ProjectCard from './components/ProjectCard.vue'

const projects = ref<Project[]>(loadProjects())
watch(projects, newProjects => saveProjects(newProjects), { deep: true })

const selectedStatus = ref<ProjectStatus | 'all'>('all')
const filteredProjects = computed(() => {
  if (selectedStatus.value === 'all') return projects.value
  return projects.value.filter(p => p.status === selectedStatus.value)
})

function addProject(project: Project): void {
  projects.value.push(project)
}
function removeProject(id: string): void {
  projects.value = projects.value.filter(p => p.id !== id)
}
function updateProjectStatus(id: string, status: ProjectStatus): void {
  const project = projects.value.find(p => p.id === id)
  if (project) project.status = status
}
</script>

<template>
  <main>
    <header>
      <h1>Project Board</h1>
    </header>

    <section class="controls">
      <ProjectForm @add-project="addProject" />

      <div class="filter-summary">
        <ProjectFilter v-model="selectedStatus" />
        <ProjectSummary :projects="projects" />
      </div>
    </section>

    <section class="projects">
      <h2>Projekt</h2>
      <div v-if="filteredProjects.length === 0">Inga projekt hittades.</div>
      <ul>
        <li v-for="project in filteredProjects" :key="project.id">
          <ProjectCard :project="project" @remove="removeProject" @change-status="updateProjectStatus" />
        </li>
      </ul>
    </section>
  </main>
</template>

<style scoped>
.controls { display: flex; gap: 16px; align-items: flex-start; margin-bottom: 16px }
.filter-summary { display: flex; gap: 16px; align-items: center }
.projects ul { list-style: none; padding: 0; display: grid; gap: 12px }
</style>