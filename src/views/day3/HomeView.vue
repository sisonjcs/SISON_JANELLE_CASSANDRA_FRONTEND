<!--
=============================================================
  DAY 3 ASSIGNMENT — HomeView.vue
  Shows the task list with router-link navigation to each task
=============================================================
-->
<script setup>
import { computed } from 'vue'
import { useRoute } from 'vue-router'
import { useTaskStore } from '@/stores/taskStore'

const taskStore = useTaskStore()
const route     = useRoute()

// TODO 1: Read route.query.error — if it equals 'notfound', show a warning banner
const showErrorBanner = computed(() => route.query.error === 'notfound')
</script>

<template>
  <div class="home-view">
    
    <div class="home-content">
      <h1>📝 My Tasks</h1>
  
      <!-- TODO 2: Show a warning banner if showErrorBanner is true -->
      <div class="error-banner" v-if="showErrorBanner">
        ⚠️ Task not found. Redirected back to home.
      </div>
  
      <!-- TODO 4: Render each task as a RouterLink to /task/:id -->
      <!-- Use <RouterLink :to="`/task/${task.id}`"> as the wrapper -->
      <ul class="task-list">
        <RouterLink  v-for="task in taskStore.tasks" :key="task.id" :to="`/task/${task.id}`">
          <li>
            <span :class="{ done: task.done }">{{ task.name }}</span>
          </li>
        </RouterLink>
      </ul>
    </div>
  </div>
</template>

<style scoped>
.home-view { max-width: 520px; margin: 40px auto; font-family: Arial, sans-serif; }
.home-content { margin-top: 50px;}
h1 { color: #1B2A4A; margin-bottom: 16px; font-weight: bold; text-align: center;}
.error-banner { background: #fef3c7; border: 1px solid #f59e0b; border-radius: 6px; padding: 10px 14px; margin-bottom: 16px; color: #92400e; font-size: 14px; }
.page-nav { margin-bottom: 20px; }
.page-nav a { color: #42B883; text-decoration: none; font-weight: 600; }
.task-list { list-style: none; padding: 0; margin: 0; }
.task-list li { padding: 12px; background: white; border-radius: 8px; border: 1px solid #eee; cursor: pointer; box-shadow: 0 1px 5px rgba(0,0,0,0.1); transition: all 0.2s ease;}
.task-list li:hover { border-color: #42B883; transform: translateY(-5px); box-shadow: 0 2px 5px rgba(0,0,0,0.2); }
.done { text-decoration: line-through; color: #9ca3af; }
</style>
           