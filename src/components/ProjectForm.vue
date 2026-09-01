<script setup lang="ts">
import { ref } from 'vue'
import type { Project, ProjectStatus } from '../types/Project'
const emit = defineEmits<{ addProject: [project: Project] }>()
const title = ref('')
const description = ref('')
const status = ref<ProjectStatus>('planned')
const errorMessage = ref('')
function submitProject(): void {
    if (title.value.trim().length < 3) {
        errorMessage.value = 'Titeln måste innehålla minst tre tecken.'
        return
    }
    emit('addProject', {
        id: crypto.randomUUID(),
        title: title.value.trim(),
        description: description.value.trim(),
        status: status.value,
        createdAt: new Date().toISOString()
    })
    title.value = ''
    description.value = ''
    status.value = 'planned'
    errorMessage.value = ''
}
</script>
<template>
    <form @submit.prevent="submitProject"
        class="rounded-2xl border border-slate-700 bg-slate-900/80 p-4 shadow-lg shadow-slate-950/20 backdrop-blur-sm">
        <div class="mb-4 flex items-center justify-between gap-3">
            <h2 class="text-xl font-semibold text-white">Nytt projekt</h2>
        </div>

        <div class="grid gap-4 md:grid-cols-2">
            <label class="flex flex-col gap-2 text-sm font-medium text-slate-200">
                <span>Titel</span>
                <input id="title" v-model="title" type="text" class="inputfield" placeholder="Ex: Ny webbplats" />
            </label>

            <label class="flex flex-col gap-2 text-sm font-medium text-slate-200">
                <span>Status</span>
                <select id="status" v-model="status" class="inputfield min-h-[2.75rem] bg-slate-800 text-slate-100">
                    <option value="planned">Planerad</option>
                    <option value="active">Pågående</option>
                    <option value="done">Klar</option>
                </select>
            </label>

            <label class="flex flex-col gap-2 text-sm font-medium text-slate-200 md:col-span-2">
                <span>Beskrivning</span>
                <textarea id="description" v-model="description" rows="4" class="inputfield resize-none"
                    placeholder="Beskriv projektet..." />
            </label>
        </div>

        <div class="mt-4 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
            <p v-if="errorMessage" role="alert" class="text-sm font-medium text-rose-300">
                {{ errorMessage }}
            </p>
            <button type="submit"
                class="ml-auto rounded-xl bg-sky-500 px-4 py-2.5 text-sm font-semibold text-white transition hover:bg-sky-400 focus:outline-none focus:ring-2 focus:ring-sky-300 focus:ring-offset-2 focus:ring-offset-slate-900">
                Lägg till projekt
            </button>
        </div>
    </form>
</template>

<style scoped>
.inputfield {
    width: 100%;
    min-height: 2.75rem;
    border: 1px solid rgba(148, 163, 184, 0.35);
    background: rgba(15, 23, 42, 0.8);
    border-radius: 0.75rem;
    padding: 0.7rem 0.9rem;
    color: #e2e8f0;
    outline: none;
    transition: all 0.2s ease;
}

.inputfield::placeholder {
    color: #94a3b8;
}

.inputfield:hover,
.inputfield:focus {
    border-color: rgba(56, 189, 248, 0.9);
    box-shadow: 0 0 0 4px rgba(14, 165, 233, 0.18);
    background: rgba(15, 23, 42, 0.95);
}
</style>