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
    <nav>
      <a href="/todo-list">Go to Todo List</a>
    </nav>
    <h1>
      👤 User List
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

    <!-- <ul v-if="!loading && !error" class="user-list">
        <li v-for="user in users" :key="user.id">
            {{ user.name }}
        </li>
    </ul> -->
    <div class="user-grid">
      <div v-for="user in users" :key="user.id" class="user-card">
        <h3>
          {{ user.name }}
        </h3>
        <p>
          <strong>Username: </strong> {{ user.username }}
        </p>
        <p>
          <strong>Email: </strong> {{ user.email }}
        </p>
        <p>
          <strong>Phone: </strong> {{ user.phone }}
        </p>
      </div>

    </div>

    <p v-if="!loading && !error" class="count">
        Showing {{ users.length || 0 }} users
    </p>
</div>
</template>

<style scoped>
.user-view {
  max-width: 1000px;
  margin: 40px auto;
  padding: 24px;
  font-family: Arial, sans-serif;
}
nav:hover {
  text-decoration: underline;
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

.user-grid {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 10px;
}

.user-card {
  grid-column: span 1;
  background: #eee;
  border: 1px solid gray;
  border-radius: 10px;
  padding: 10px;
  cursor: pointer;
  transition: all 0.2s ease;
}

.user-card:hover {
  background: #dadada;
  transform: translateY(-3px);
}

.user-card h3 {
  font-weight: bold;
}

.user-card strong {
  font-weight: 600;
}

.count {
  font-size: 13px;
  color: #9ca3af;
  margin-top: 12px;
  text-align: right;
}
</style>