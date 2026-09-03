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

export async function saveProjects(projects: Project[]): Promise<void> {
    try {
        // To implement: Send a POST request to the API with the projects data
    } catch {
        alert('Failed to save projects to database');
    }
}