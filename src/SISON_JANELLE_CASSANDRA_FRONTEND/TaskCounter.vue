<!--
=============================================================
  DAY 1 ASSIGNMENT — Reactive Task Counter App
  Topic: Vue 3 Composition API (ref, computed, v-model, v-for)
  Time: 60 minutes
=============================================================

OBJECTIVE
---------
Build a reactive task management app that demonstrates Vue 3's
reactivity system. You will use ref(), computed(), v-model, v-for,
and event handling — the core building blocks of every Vue app.

WHAT TO BUILD
-------------
A single-file Vue component (this file) that:

  1. Has a text input + "Add Task" button to create new tasks.
  2. Displays the task list, each item with:
       - A checkbox to mark it as done
       - The task name (strike-through when done)
       - A "Remove" button
  3. Shows a live stats bar:
       Total Tasks | Done: X | Pending: X
  4. Shows an empty state message when there are no tasks.

REQUIREMENTS (Acceptance Criteria)
------------------------------------
  [x] Use ref() for the text input value
  [x] Use ref() for the tasks array
  [x] Use computed() for total, done, and pending counts
  [x] Use v-model on the text input
  [x] Use v-for with :key to render the task list
  [x] Use @keyup.enter on the input to also trigger addTask
  [x] Prevent adding empty/whitespace-only tasks
  [x] Clear the input after adding a task

EXTENSION (if you finish early)
---------------------------------
  - Add a filter bar: All | Done | Pending — filters the visible list
  - Add a "Clear All Done" button that removes all completed tasks
  - Add a task priority: Low / Medium / High (use a <select> dropdown)

HINTS (read only if stuck)
---------------------------
  Hint 1: import { ref, computed } from 'vue'
  Hint 2: tasks.value.push({ id: Date.now(), name: '...', done: false })
  Hint 3: computed(() => tasks.value.filter(t => t.done).length)
  Hint 4: For :class strikethrough — :class="{ done: task.done }"
  Hint 5: v-model on a checkbox binds to a boolean — v-model="task.done"
  Hint 6: To prevent empty tasks — if (!newTaskName.value.trim()) return

FILE STRUCTURE (this is a single-file component)
-------------------------------------------------
  <script setup>  — all your reactive logic goes here
  <template>      — your HTML markup
  <style scoped>  — your CSS (scoped = only applies to this component)
=============================================================
-->

<script setup>
import { ref, computed } from 'vue'
// import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'
// import { byPrefixAndName } from '@awesome.me/kit-KIT_CODE/icons'

// TODO 1: Create a ref for the text input value (initial value: '')
const newTaskName = ref("")

// TODO 2: Create a ref for the tasks array (initial value: [])
const tasks = ref([])

/* obj
 id
 taskName
 status
 priority
*/

// TODO 3: Create computed() values for total, done, and pending counts
const totalCount  = computed(() => tasks.value.length)
const doneCount   = computed(() => tasks.value.filter(t => t.done).length)
const pendingCount = computed(() => tasks.value.filter(t => !t.done).length)

const selectedPriority = ref('low')

// All || Done || Pending
const options = ["All", "Done", "Pending"]
const selectedTab = ref("All")
const filteredTasks = computed(() => {
  if (selectedTab.value === "Done") {
    return tasks.value.filter(t => t.done)
  } else if (selectedTab.value === "Pending") {
    return tasks.value.filter(t => !t.done)
  } else {
    return tasks.value
  }
})

// TODO 4: Write the addTask() function
// - Prevent empty tasks
// - Push a new task object to tasks.value: { id, name, done }
// - Clear the input
function addTask() {
  // your code 
  if (newTaskName.value.trim()) {
    const newTask = {
      id: crypto.randomUUID(),
      name: newTaskName.value.trim(),
      priority: selectedPriority.value,
      done: false
    }
    tasks.value.push(newTask)
    newTaskName.value = '';
    selectedPriority.value = "low"
  } 
}

// TODO 5: Write toggleTask(id) — flip task.done for the matching task
function toggleTask(id) {
  // your code here
  const foundTask = tasks.value.find(task => task.id === id)
  if (foundTask) {
    foundTask.done = !foundTask.done
  }
}

// TODO 6: Write removeTask(id) — filter out the task with this id
function removeTask(id) {
  // your code here
  tasks.value = tasks.value.filter(task => task.id !== id)
}

function clearDoneTasks() {
  tasks.value = tasks.value.filter(t => !t.done)
}

</script>

<template>
  <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/4.7.0/css/font-awesome.min.css">
  <div class="app">
    <div class="title">
      <h1>Task Counter</h1>
    </div>

    <!-- TODO 7: Add an input with v-model, @keyup.enter, and placeholder -->
    <!-- TODO 8: Add an "Add Task" button with @click="addTask" -->
    <div class="input-row">
      <!-- your input and button here -->
      <input 
       @keyup.enter = "addTask"
       v-model="newTaskName"
       placeholder="Enter a new task.."
      />
       <div class="priorities-dropdown">
        <label for="priorities">Priority</label>
        <select v-model="selectedPriority">
          <option value="low">Low</option>
          <option value="medium">Medium</option>
          <option value="high">High</option>
        </select>
       </div>
       <button 
        @click="addTask"
        :disabled="!newTaskName.trim()"
        >
        Add Task
       </button>
    </div>

    <!-- TODO 9: Display the stats bar using your computed values -->
    <!-- Format: Total: X | Done: X | Pending: X -->
    <div class="stats">
      <!-- your stats here -->
      <div><span>Total</span>
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

    <div class="misc">
      <div class="filters">
        <button
          v-for="option in options"
          :key="option"
          :class="{ filtered: selectedTab === option, unfiltered: selectedTab !== option }"
          @click="selectedTab = option"
        >
          {{ option }}
        </button>
      </div>
      <span>
        <button 
          class="clear-btn" 
          @click="clearDoneTasks" 
          :disabled="doneCount === 0"
        >
          <!-- <FontAwesomeIcon :icon="byPrefixAndName.fas['broom']" /> -->
          Clear All Done
        </button>
      </span>
      
    </div>

    <!-- TODO 10: Show this message only when the task list is empty -->
    <!-- <p class="empty">No tasks yet. Add one above!</p> -->
    <p class="empty" v-show="filteredTasks.length === 0">
      {{ selectedTab === "Done" 
      ? "No finished tasks yet." 
      : selectedTab === "Pending"
        ? "No pending tasks yet."
        : "No tasks yet. Add one above!"}}
    </p>

    <!-- TODO 11: Render the task list using v-for -->
    <!-- Each item needs: checkbox (v-model), task name (:class done), remove button -->
    <ul class="task-list">
      <!-- your v-for loop here -->
       <li v-for="task in filteredTasks" :key="task.id">
        <input 
          name="task-checkbox" 
          type="checkbox" 
          @change="toggleTask(task.id)"
        />
        <p class="task-priority" :class='{ low: task.priority === "low", medium: task.priority === "medium", high: task.priority === "high"}'>
          {{ task.priority }}
        </p>
        <span :class="{ done: task.done, }">
          {{ task.name }}
        </span>
        <button @click="removeTask(task.id)">
          <i class="fa fa-trash fa-lg"></i>
        </button>
       </li>
    </ul>
  </div>
</template>

<style scoped>
.app {
  max-width: 480px;
  width: 100%;
  font-family: Arial, sans-serif;
  padding: 32px;
  background: #f9fafb;
  border-radius: 12px;
  box-shadow: 0 4px 12px rgba(0,0,0,0.2);
}

.title {
  background: linear-gradient(
    135deg,
    #42B883,
    #2c9f75
  );
  color: white;
  padding: 24px;
  margin: -24px -24px 24px -24px;
  border-radius: 12px;
}

.title h1 {
  margin: 0;
  font-weight: bold;
}

.input-row {
  display: flex;
  gap: 8px;
  margin-bottom: 16px;
}

.error {
  border: 1px solid red;
  color: red;
}

.errorMsg {
  color: red;
  font-size: 10px;
  margin: -15px 0 10px 0;
}

.input-row input {
  flex: 1;
  padding: 8px 12px;
  border: 1px solid #ddd;
  border-radius: 6px;
  font-size: 14px;
}

.input-row button {
  padding: 8px 16px;
  background: #42B883;
  color: white;
  border: none;
  border-radius: 6px;
  cursor: pointer;
  font-weight: bold;
}

.input-row div {
  display: flex;
  flex-direction: column;
}

.input-row div label {
  font-size: 9px;
  text-transform: uppercase;
  color: #666;
  font-weight: bold;
}

.input-row div select {
  border: 1px solid #ddd;
  border-radius: 6px;
  padding: 2px;
  cursor: pointer;
}

.input-row button:hover {
  background: #399D70; 
}

.input-row button:disabled {
  background: #619d829c;
  cursor: not-allowed;
}

.stats {
  font-size: 13px;
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

.stats div {
  display: flex;
  flex-direction: column;
}

.stats div span {
  font-weight: bold;
}

.stats strong {
  font-size: 18px;
  color: #42B883;
}

.misc {
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  gap: 10px;
  padding: 0 0 10px 0;
}

.filters {
  display: flex;
  gap: 10px;
}

.filtered {
  padding: 8px 16px;
  background: #42B883;
  color: white;
  border: none;
  border-radius: 20px;
  cursor: pointer;
  font-weight: bold;
}

.unfiltered {
  padding: 8px 16px;
  color: #42B883;
  background: white;
  border: 1px solid #42B883;
  border-radius: 20px;
  cursor: pointer;
}

.unfiltered:hover {
  background: #D5F0E4;
}

.clear-btn {
  padding: 8px 16px;
  background: #B84248;
  color: white;
  border: none;
  border-radius: 100px;
  cursor: pointer;
  font-weight: bold;
}

.clear-btn:hover {
  background: #7F2F33;
}

.clear-btn:disabled {
  background: #8443469c;
  cursor: not-allowed;
}

.empty {
  text-align: center;
  color: #aaa;
  font-style: italic;
  margin: 32px 0;
}

.task-list {
  list-style: none;
  padding: 0;
  margin: 0;
}

.task-list li {
  display: flex;
  align-items: center;
  gap: 10px;
  padding: 14px 16px;
  background: white;
  border-radius: 6px;
  margin-bottom: 8px;
  border: 1px solid #eee;
  transition: all 0.2s ease;
}

.task-list li:hover {
  transform: translateY(-2px);
  box-shadow: 0 6px 14px rgba(0,0,0,.08);
}

input[type="checkbox"] {
  width: 18px;
  height: 18px;
  accent-color: #42B883;
  cursor: pointer;
}

.task-list li span {
  flex: 1;
  width: 300px;
  font-size: 14px;
  white-space: normal;
  word-wrap: break-word;
  overflow-wrap: break-word;
  transition: all .25s ease;
}

.task-list li p {
  text-transform: uppercase;
  font-size: 10px;
  font-weight: bold;
  border-radius: 5px;
  padding: 5px 8px;
}

.low {
  background: #FAFCCF;
  color: #9FA70C;
}

.medium {
  background: #FCE7CF;
  color: #A74F0C;
}

.high {
  background: #FCCFCF;
  color: #A70C0C;
}

/* TODO: Apply this class to task names when task.done is true */
.done {
  text-decoration: line-through;
  color: #aaa;
  opacity: .7;
}

.task-list li button {
  padding: 8px;
  background: #fee2e2;
  color: #dc2626;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  font-size: 12px;
}

.task-list li button:hover {
  background: #FDC9C9;
}
</style>
