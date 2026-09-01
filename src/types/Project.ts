export type ProjectStatus = 'planned' | 'active' | 'done'
export interface Project {
id: string
title: string
description: string
status: ProjectStatus
createdAt: string
}