<script setup>
import { computed } from 'vue';
import { useTaskStore } from '@/stores/taskStore';

const taskStore = useTaskStore()

const totalCount = computed(() => taskStore.totalCount)
const doneCount = computed(() => taskStore.doneCount)
const pendingCount = computed(() => taskStore.pendingCount)

</script>

<template>
    <div class="stats-view">
        <nav class="page-nav">
          <!-- TODO 3: Add a RouterLink to /about -->
           <RouterLink to="/home">Home</RouterLink>
          <RouterLink to="/stats">Stats</RouterLink>
          <RouterLink to="/about">About</RouterLink>
        </nav>
        <div class="app">
            <div class="title">
                <h1>📊 Task Stats</h1>
            </div>
            <div class="stats-content">
                <div>
                    <span>Total</span>
                    <strong>{{ totalCount }}</strong>
                </div>
                <div>
                    <span>Done</span>
                    <strong>{{ doneCount }}</strong>
                </div>
                <div>
                    <span>Pending</span>
                    <strong>{{ pendingCount }}</strong>
                </div>
            </div>
        </div>
    </div>
</template>

<style scoped>

.stats-view {
    width: 100%;
    height: 100vh;
}

.stats-view nav {
    display: flex;
    justify-content: center;
    align-items: center;
    background: rgb(235, 235, 235);
    max-width: fit-content;
    margin: 0 auto;
    padding: 10px;
    border-radius: 10px;
    gap: 10px;
}

.page-nav a {
    padding: 10px;
    border-radius: 10px;
    font-weight: bold;
    min-width: 100px;
    text-align: center;
}

.router-link-active {
    background: hsla(160, 100%, 37%, 1);
    padding: 10px;
    color: white;
}

.app {
  max-width: 480px;
  width: 100%;
  font-family: Arial, sans-serif;
  padding: 32px;
  margin: 50px auto;
  background: #f9fafb;
  border-radius: 12px;
  box-shadow: 0 4px 12px rgba(0,0,0,0.2);
}

.title {
    display: flex;
    justify-content: center;
    align-items: center;
    margin-bottom: 10px;
}

.title h1 {
    font-weight: bold;
}

.stats-content {
  font-size: 20px;
  color: #666;
  margin-bottom: 16px;
  padding: 8px 12px;
  background: #e9f7f0;
  border-radius: 6px;
  text-align: center;
  display: flex;
  justify-content: space-around;
  text-align: center;
}

.stats-content div {
  display: flex;
  flex-direction: column;
}

.stats-content div span {
  font-weight: bold;
}

.stats-content strong {
  font-weight: 700;
  font-size: 30px;
  color: #42B883;
}

</style>