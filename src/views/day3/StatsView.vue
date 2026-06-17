<script setup>
import { computed } from 'vue';
import { useTaskStore } from '@/stores/taskStore';

const taskStore = useTaskStore()

const totalCount = computed(() => taskStore.totalCount)
const doneCount = computed(() => taskStore.doneCount)
const pendingCount = computed(() => taskStore.pendingCount)

</script>

<template>
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
</template>

<style scoped>

.app {
  max-width: 480px;
  width: 100%;
  font-family: Arial, sans-serif;
  padding: 32px;
  margin: 40px auto;
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
  font-size: 18px;
  color: #42B883;
}

</style>