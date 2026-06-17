import { createRouter, createWebHistory } from "vue-router";
import TaskCounter from "@/views/day1/TaskCounter.vue";
import TaskListView from "@/views/day2/TaskListView.vue";
import HomeView from "@/views/day3/HomeView.vue";
import TaskDetailView from "@/views/day3/TaskDetailView.vue";
import AboutView from "@/views/day3/AboutView.vue";
import { useTaskStore } from "@/stores/taskStore";

const routes = [
    { path: '/', redirect: '/home' },
    { path: '/home', component: HomeView },
    { path: '/about', component: AboutView }, 
    { path: '/task-counter', component: TaskCounter },
    { path: '/task-list', component: TaskListView },
    { path: '/task/:id', component: TaskDetailView, meta: { requiresTask: true } },
]

// const taskStore = useTaskStore()

const router = createRouter({
    history: createWebHistory(),
    routes
})

const tasks = [
  {id: 1, name: 'Learn', done: false, dueDate: '2026-06-17', priority: 'low'},
  {id: 2, name: 'Study', done: true, dueDate: '2026-06-17', priority: 'medium'},
  {id: 3, name: 'Eat', done: true, dueDate: '2026-06-17', priority: 'high'},
  {id: 4, name: 'Sleep', done: false, dueDate: '2026-06-17', priority: 'low'},
]

// TODO 8: Add a beforeEach navigation guard
// - Check if to.meta.requiresTask is true
// - If so, get the task store and check if a task with to.params.id exists
// - If NOT found: next({ path: '/home', query: { error: 'notfound' } })
// - If found (or not a protected route): next()
router.beforeEach((to, from, next) => {
    // your guard logic here
    if (to.meta.requiresTask) {
        if (tasks.find(task => task.id == Number(to.params.id))) {
            next()
        } else {
            next({ path: '/home', query: { error: 'notfound' } })
        }
    }
    next() // don't remove this — it must always be called
})

export default router;