import { defineStore } from 'pinia'
import { computed, ref } from 'vue'

export const useTaskStore = defineStore('tasks', () => {
    const tasks = ref([
        {id: 1, name: 'Learn', done: true, dueDate: '2026-06-18', priority: 'low'},
        {id: 2, name: 'Study', done: false, dueDate: '2026-06-18', priority: 'medium'},
        {id: 3, name: 'Eat', done: false, dueDate: '2026-06-18', priority: 'high'},
        {id: 4, name: 'Sleep', done: false, dueDate: '2026-06-18', priority: 'low'},
    ])

    const totalCount = computed(() => tasks.value.length)
    const doneCount = computed(() => tasks.value.filter(t => t.done).length)
    const pendingCount = computed(() => tasks.value.filter(t => !t.done).length)

    return ({ tasks, totalCount, doneCount, pendingCount })
})