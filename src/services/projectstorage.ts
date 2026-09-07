import type { Project } from '../types/Project'

const API_URL = 'http://localhost:8001/api/projects'

export async function loadProjects(): Promise<Project[]> {
    try {
        const response = await fetch(API_URL)
        if (!response.ok) throw new Error(`Request failed: ${response.status}`)

        const data: unknown = await response.json()
        return Array.isArray(data) ? data as Project[] : []
    } catch {
        alert('Failed to load projects from database');
        return []
    }
}

export async function postProject(project: Project): Promise<void> {
    try {
        const response = await fetch(API_URL, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(project)
        })

        if (!response.ok) {
            throw new Error(`Request failed: ${response.status}`)
        }
    } catch {
        alert('Failed to save project to database')
    }
}

export async function deleteProject(projectId: string): Promise<void> {
  try {
    const response = await fetch(`${API_URL}/${projectId}`, {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json'
      }
    })

    if (!response.ok) {
      throw new Error(`Request failed: ${response.status}`)
    }
  } catch {
    alert(projectId + ' Failed to delete project from database')
  }
}