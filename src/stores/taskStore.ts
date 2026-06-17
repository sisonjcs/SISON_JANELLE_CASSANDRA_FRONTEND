import { defineStore } from 'pinia'
import { ref } from 'vue'

export const useTaskStore = defineStore('tasks', () => {
    const tasks = ref([
        {id: 1, name: 'Learn', done: false, dueDate: '2026-06-17', priority: 'low'},
        {id: 2, name: 'Study', done: true, dueDate: '2026-06-17', priority: 'medium'},
        {id: 3, name: 'Eat', done: true, dueDate: '2026-06-17', priority: 'high'},
        {id: 4, name: 'Sleep', done: false, dueDate: '2026-06-17', priority: 'low'},
    ])

    
})