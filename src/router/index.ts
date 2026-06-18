import { createRouter, createWebHistory } from "vue-router";
import TaskCounter from "@/views/day1/TaskCounter.vue";
import TaskListView from "@/views/day4/TaskListView.vue";
import HomeView from "@/views/day3/HomeView.vue";
import TaskDetailView from "@/views/day3/TaskDetailView.vue";
import AboutView from "@/views/day3/AboutView.vue";
import StatsView from "@/views/day3/StatsView.vue";
import { useTaskStore } from "@/stores/taskStore";

// EXTENSION
// ---------
//  - Add a /stats route that shows total/done/pending counts
//  - Add router-link-active styling to the nav links
//  - Add a page transition animation using Vue's <Transition> component

const routes = [
    { path: '/', redirect: '/home' },
    { path: '/home', component: HomeView },
    { path: '/about', component: AboutView }, 
    { path: '/stats', component: StatsView },
    { path: '/task-counter', component: TaskCounter },
    { path: '/task-list', component: TaskListView },
    { path: '/task/:id', component: TaskDetailView, meta: { requiresTask: true } },
]

const router = createRouter({
    history: createWebHistory(),
    routes
})

// TODO 8: Add a beforeEach navigation guard
// - Check if to.meta.requiresTask is true
// - If so, get the task store and check if a task with to.params.id exists
// - If NOT found: next({ path: '/home', query: { error: 'notfound' } })
// - If found (or not a protected route): next()
router.beforeEach((to, from, next) => {
    const taskStore = useTaskStore()
    // your guard logic here
    if (to.meta.requiresTask) {
        if (taskStore.tasks.find(task => task.id == Number(to.params.id))) {
            next()
        } else {
            next({ path: '/home', query: { error: 'notfound' } })
        }
    }
    next() // don't remove this — it must always be called
})

export default router;