import type { Project, ProjectStatus } from '../types/Project'

const API_URL = 'http://localhost:8001/api/projects'

function normalizeMongoId(value: unknown): string {
    if (typeof value === 'string') {
        const trimmed = value.trim()
        const match = trimmed.match(/ObjectId\(['"]?([a-fA-F0-9]+)['"]?\)/)
        return match?.[1] ?? trimmed
    }

    if (value && typeof value === 'object') {
        const obj = value as Record<string, unknown>

        if (typeof obj.$oid === 'string') return obj.$oid
        if (typeof obj.value === 'string') return obj.value

        const text = String(value).trim()
        const match = text.match(/ObjectId\(['"]?([a-fA-F0-9]+)['"]?\)/)
        return match?.[1] ?? text
    }

    return crypto.randomUUID()
}

function isProjectStatus(value: unknown): value is ProjectStatus {
    return value === 'planned' || value === 'active' || value === 'done'
}

function mapMongoProject(item: Record<string, unknown>): Project {
    const id = normalizeMongoId(item._id ?? item.id)
    const title = typeof item.title === 'string' ? item.title : ''
    const description = typeof item.description === 'string' ? item.description : ''
    const status = isProjectStatus(item.status) ? item.status : 'planned'

    return {
        id,
        title,
        description,
        status,
    }
}

export async function loadProjectsFromDatabase(): Promise<Project[]> {
    try {
        const response = await fetch(API_URL)
        if (!response.ok) throw new Error(`Request failed: ${response.status}`)

        const data: unknown = await response.json()

        if (!Array.isArray(data)) return []

        return data
            .filter((item): item is Record<string, unknown> => !!item && typeof item === 'object')
            .map(mapMongoProject)
    } catch {
        alert('Failed to load projects from database')
        return []
    }
}

export async function postProjectDatabase(project: Project): Promise<Project | null> {
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

        const data: unknown = await response.json()

        if (data && typeof data === 'object') {
            return mapMongoProject(data as Record<string, unknown>)
        }

        return project
    } catch {
        alert('Failed to save project to database')
        return null
    }
}

export async function deleteProjectDatabase(projectId: string): Promise<void> {
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

export async function updateProjectDatabase(project: Project, status: ProjectStatus): Promise<Project | null> {
    try {
        const updatedProject = {
            ...project,
            status,
        }

        const response = await fetch(`${API_URL}/${project.id}/status/${status}`, {
            method: 'PATCH',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(updatedProject)
        })

        if (!response.ok) {
            throw new Error(`Request failed: ${response.status}`)
        }

        return updatedProject
    } catch {
        alert('Failed to update project in database')
        return null
    }
}