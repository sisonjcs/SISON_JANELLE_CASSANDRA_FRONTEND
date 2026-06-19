<script setup>
import { useFetch } from '@/composables/useFetch';
import { ref, computed } from 'vue';
import { VueSpinnerGrid } from 'vue3-spinners';

const { data: users, loading, error, fetchData } = useFetch("https://jsonplaceholder.typicode.com/users")

function handleRetry() {
    fetchData()
}

</script>

<template>
<div class="user-view">
    <h1>
        User List
    </h1>
    <p class="subtitle">Loaded from JSONPlaceholder API</p>

    <!-- TODO 3: Show a loading message/spinner while loading is true -->
    <div v-if="loading" class="loading">
      <VueSpinnerGrid size="30" color="green" />
      <p>Fetching users, sit tight!</p>
    </div>
    <!-- TODO 4: Show an error message if error has a value -->
    <div v-if="error" class="error-box">
      <p>
        {{ error }}
      </p>
      <span @click="handleRetry">
        Click here to refresh
      </span>
    </div>

    <ul v-if="!loading && !error" class="user-list">
        <li v-for="user in users" :key="user.id">
            {{ user.name }}
        </li>
    </ul>

    <p v-if="!loading && !error" class="count">
        Showing {{ users.length || 0 }} users
    </p>
</div>
</template>

<style scoped>
.user-view {
  max-width: 560px;
  margin: 40px auto;
  padding: 24px;
  font-family: Arial, sans-serif;
}
h1 {
  color: #1b2a4a;
  margin-bottom: 4px;
}
.subtitle {
  color: #9ca3af;
  font-size: 13px;
  margin-bottom: 20px;
}
.loading {
  text-align: center;
  padding: 48px;
  color: #42b883;
  font-size: 16px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  gap: 10px;
}
.error-box {
  background: #fef2f2;
  border: 1px solid #fca5a5;
  border-radius: 8px;
  padding: 16px;
  color: #dc2626;
}

.error-box span {
    cursor: pointer;
    font-weight: bold;
}

.error-box span:hover {
    text-decoration: underline;
}

.user-list {
  list-style: none;
  padding: 0;
  margin: 0;
}
.user-list li {
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 10px;
  padding: 10px 12px;
  background: white;
  border-radius: 6px;
  margin-bottom: 6px;
  border: 1px solid #d7d7d7;
  font-size: 14px;
  cursor: pointer;
}

.user-list li:hover {
  background: rgb(232, 230, 230);
}

.count {
  font-size: 13px;
  color: #9ca3af;
  margin-top: 12px;
  text-align: right;
}
</style>