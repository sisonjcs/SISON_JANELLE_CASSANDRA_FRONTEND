<!--
=============================================================
  DAY 5 ASSIGNMENT — TodoListView.vue
  Uses useFetch() to load and display todos from JSONPlaceholder
=============================================================
-->
<script setup>
import { ref, computed } from "vue";
import { useFetch } from "@/composables/useFetch";
import { VueSpinnerGrid } from "vue3-spinners";

const filter = ref("done"); // 'all' | 'done' | 'pending'

// TODO 1: Call useFetch with the JSONPlaceholder todos endpoint
// Rename 'data' to 'todos' using destructuring alias syntax
const {
  data: todos,
  loading,
  error,
  fetchData
} = useFetch("https://jsonplaceholder.typicode.com/todos");

const searchTask = ref('')

// TODO 2: Create a filteredTodos computed() that:
//  - Returns [] if todos.value is null (still loading)
//  - Filters by filter.value ('all' shows first 20, 'done' shows completed, 'pending' shows incomplete)
// const filteredTodos = computed(() => { ... })
const filteredTodos = computed(() => {
  if (!todos.value) return []; // still loading

  const searchedTasks = computed(() => todos.value.filter((todo) => todo.title.includes(searchTask.value)))

  if (filter.value === "all") return searchedTasks.value.slice(0, 20);
  if (filter.value === "done")
    return searchedTasks.value.filter((todo) => todo.completed);
  if (filter.value === "pending")
    return searchedTasks.value.filter((todo) => !todo.completed);
  return [];
});

function handleRetry() {
    fetchData()
}

</script>

<template>
  <div class="todo-view">
    <h1>📋 Todo List</h1>
    <p class="subtitle">Loaded from JSONPlaceholder API</p>

    <!-- TODO 3: Show a loading message/spinner while loading is true -->
    <div v-if="loading" class="loading">
      <VueSpinnerGrid size="30" color="green" />
      <p>Fetching todos, sit tight!</p>
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

    <!-- TODO 5: Show the content block when NOT loading and NO error -->
    <div v-if="!loading && !error">
      <div class="search">
        <input type="text" v-model="searchTask" placeholder="Search for a task" />
      </div>
      <!-- Filter buttons -->
      <div class="filters">
        <!-- TODO 6: Three buttons — All, Done, Pending -->
        <!-- Each sets filter.value and gets :class="{ active: filter === '...' }" -->
        <button @click="filter = 'all'" :class="{ active: filter === 'all' }">
          All
        </button>
        <button @click="filter = 'done'" :class="{ active: filter === 'done' }">
          Done
        </button>
        <button
          @click="filter = 'pending'"
          :class="{ active: filter === 'pending' }"
        >
          Pending
        </button>
      </div>

      <p v-if="filteredTodos.length === 0 && searchTask.trim()">
        No results found. Modify your search
      </p>

      <!-- TODO 7: Render filteredTodos using v-for -->
      <ul class="todo-list">
        <!-- li with checkbox (disabled, reflects todo.completed) and title -->
        <li
          v-for="todo in filteredTodos"
          v-memo="[todo.id]"
          :key="todo.id"
          :class="{ 'done-item': todo.completed }"
        >
          <input
            type="checkbox"
            :checked="todo.completed"
            @click="todo.completed = !todo.completed"
          />
          <span :class="{ 'completed-text': todo.completed }">
            {{ todo.title }}
          </span>
        </li>
      </ul>

      <!-- TODO 8: Show count of visible items -->
      <p class="count">
        Showing {{ filteredTodos.length }} out of {{ todos.length || 0 }}
      </p>
    </div>
  </div>
</template>

<style scoped>
.todo-view {
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
.search {
  max-width: 480px;
  margin: 24px auto 0;
  padding: 16px 20px;

  background: #42B883;
  color: white;

  border-radius: 12px;
  box-shadow: 0 4px 12px rgba(66, 184, 131, 0.25);

  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 12px;
  margin-bottom: 20px;
}

.search input {
  flex: 1;
  padding: 8px 12px;
  border: none;
  border-radius: 6px;
  outline: none;
}

.filters {
  display: flex;
  gap: 8px;
  margin-bottom: 16px;
}
.filters button {
  padding: 6px 16px;
  border: 1px solid #ddd;
  border-radius: 20px;
  background: white;
  cursor: pointer;
  font-size: 13px;
}
.filters button.active {
  background: #42b883;
  color: white;
  border-color: #42b883;
}
.todo-list {
  list-style: none;
  padding: 0;
  margin: 0;
}
.todo-list li {
  display: flex;
  align-items: center;
  gap: 10px;
  padding: 10px 12px;
  background: white;
  border-radius: 6px;
  margin-bottom: 6px;
  border: 1px solid #eee;
  font-size: 14px;
}
.todo-list li.done-item {
  opacity: 0.6;
}
.todo-list li span {
  flex: 1;
}
.completed-text {
  text-decoration: line-through;
  color: #9ca3af;
}
.count {
  font-size: 13px;
  color: #9ca3af;
  margin-top: 12px;
  text-align: right;
}
</style>
