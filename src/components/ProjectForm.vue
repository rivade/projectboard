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
    <form @submit.prevent="submitProject" class="flex flex-row gap-2">
        <label for="title">Titel</label>
        <input id="title" v-model="title" type="text" class="inputfield"/>
        <label for="description">Beskrivning</label>
        <textarea id="description" v-model="description" class="inputfield"/>
        <label for="status">Status</label>
        <select id="status" v-model="status">
            <option value="planned">Planerad</option>
            <option value="active">Pågående</option>
            <option value="done">Klar</option>
        </select>
        <p v-if="errorMessage" role="alert">{{ errorMessage }}</p>
        <button type="submit">Lägg till projekt</button>
    </form>
</template>

<style scoped>
.inputfield {
  border: 2px solid transparent;
  width: 15em;
  height: 2.5em;
  padding-left: 0.8em;
  outline: none;
  overflow: hidden;
  background-color: #F3F3F3;
  border-radius: 10px;
  transition: all 0.5s;
}

.inputfield:hover,
.inputfield:focus {
  border: 2px solid #4A9DEC;
  box-shadow: 0px 0px 0px 7px rgb(74, 157, 236, 20%);
  background-color: white;
}
</style>