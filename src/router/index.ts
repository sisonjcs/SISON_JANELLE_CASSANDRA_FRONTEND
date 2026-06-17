import { createRouter, createWebHistory } from "vue-router";
import TaskCounter from "../views/day1/TaskCounter.vue";
import TaskListView from "../views/day2/TaskListView.vue";

const routes = [
    { path: '/', component: TaskCounter },
    { path: '/task-list', component: TaskListView }
]

export default createRouter({
    history: createWebHistory(),
    routes
})