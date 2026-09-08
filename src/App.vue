<script setup lang="ts">
import { computed, onMounted, ref, watch } from 'vue'
import type { Project, ProjectStatus } from './types/Project'
import { loadProjectsFromDatabase, postProjectDatabase, deleteProjectDatabase, updateProjectDatabase } from './services/projectstorage'
import ProjectForm from './components/ProjectForm.vue'
import ProjectFilter from './components/ProjectFilter.vue'
import ProjectSummary from './components/ProjectSummary.vue'
import ProjectCard from './components/ProjectCard.vue'

const projects = ref<Project[]>([])

onMounted(async () => {
  projects.value = await loadProjectsFromDatabase()
})

const selectedStatus = ref<ProjectStatus | 'all'>('all')
const filteredProjects = computed(() => {
  if (selectedStatus.value === 'all') return projects.value
  return projects.value.filter(p => p.status === selectedStatus.value)
})

async function addProject(project: Project): Promise<void> {
  const savedProject = await postProjectDatabase(project)

  if (savedProject) {
    projects.value = [...projects.value, savedProject]
  }
}

async function removeProject(id: string): Promise<void> {
  projects.value = projects.value.filter(p => p.id !== id)
  await deleteProjectDatabase(id)
}

async function updateProjectStatus(id: string, status: ProjectStatus): Promise<void> {
  const project = projects.value.find(p => p.id === id)
  if (!project) return

  const serverProject = await updateProjectDatabase(project, status)

  if (serverProject) {
    project.status = serverProject.status
  }
}
</script>

<template>
  <main class="bg-blue-950 text-white min-h-screen m-0 p-0 flex flex-col">
    <header class="bg-black text-white p-4 rounded-b-lg font-bold text-center">
      <h1>Project Board</h1>
    </header>

    <div class="flex flex-1 flex-col gap-4 p-4 sm:flex-row sm:items-stretch sm:justify-between">
      <ProjectForm @add-project="addProject" class="sm:w-1/3" />

      <div class="flex flex-col gap-4 sm:w-2/3">
        <section class="flex w-full gap-4 sm:items-stretch">
          <ProjectSummary :projects="projects" class="w-2/3" />
          <ProjectFilter v-model="selectedStatus" class="w-1/3" />
        </section>

        <section class="projects">
          <div class="flex items-center justify-between">
            <h2 class="text-lg font-semibold">Projekt</h2>
          </div>
          <div v-if="filteredProjects.length === 0">Inga projekt hittades.</div>
          <ul>
            <li v-for="project in filteredProjects" :key="project.id">
              <ProjectCard :project="project" @remove="removeProject" @change-status="updateProjectStatus" />
            </li>
          </ul>
        </section>
      </div>
    </div>
  </main>
</template>

<style scoped>
.projects ul {
  list-style: none;
  padding: 0;
  display: grid;
  gap: 12px
}
</style>