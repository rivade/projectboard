import type { Project } from '../types/Project'
const STORAGE_KEY = 'projectboard-projects'
export function loadProjects(): Project[] {
    const data = localStorage.getItem(STORAGE_KEY)
    if (!data) return []
    try {
        return JSON.parse(data) as Project[]
    } catch {
        return []
    }
}
export function saveProjects(projects: Project[]): void {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(projects))
}