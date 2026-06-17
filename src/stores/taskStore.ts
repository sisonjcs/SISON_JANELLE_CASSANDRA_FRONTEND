import { defineStore } from 'pinia'
import { ref } from 'vue'

export const useTaskStore = defineStore('tasks', () => {
    const tasks = ref([
        {id: 1, name: 'Learn', done: false, dueDate: '2026-06-18', priority: 'low'},
        {id: 2, name: 'Study', done: false, dueDate: '2026-06-18', priority: 'medium'},
        {id: 3, name: 'Eat', done: false, dueDate: '2026-06-18', priority: 'high'},
        {id: 4, name: 'Sleep', done: false, dueDate: '2026-06-18', priority: 'low'},
    ])

    return ({ tasks })
})