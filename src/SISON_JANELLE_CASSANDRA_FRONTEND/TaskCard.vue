<!--
=============================================================
  DAY 2 ASSIGNMENT — Reusable TaskCard Component
  Topic: Props, Emits, Slots, Component Lifecycle
  Files: TaskCard.vue (child)  +  TaskListView.vue (parent)
  Time: 60 minutes
=============================================================

OBJECTIVE
---------
Build a reusable TaskCard child component that accepts data as props
and communicates back to the parent via custom events (emits). The
parent renders a list of TaskCards and handles all state changes.

WHAT TO BUILD — TaskCard.vue (this file)
-----------------------------------------
  1. Accept a "task" prop: { id, name, done, dueDate }
  2. Display the task name and dueDate (via a named slot "meta")
  3. Emit "complete" event (payload: task.id) when Complete/Undo clicked
  4. Emit "delete" event (payload: task.id) when Delete clicked
  5. Show "Complete" when task.done is false, "Undo" when true
  6. Apply a visual style change when task.done is true

WHAT TO BUILD — TaskListView.vue (see that file)
-------------------------------------------------
  1. Hold a tasks ref array with at least 3 sample tasks
  2. Render a TaskCard for each task using v-for
  3. Handle @complete → toggle that task's done property
  4. Handle @delete → remove that task from the array
  5. Fill the "meta" named slot with the due date

REQUIREMENTS (Acceptance Criteria)
------------------------------------
  [x] TaskCard uses defineProps({ task: Object })
  [x] TaskCard uses defineEmits(['complete', 'delete'])
  [x] TaskCard has <slot name="meta" /> for optional metadata
  [x] Parent passes :task="task" and listens @complete @delete
  [x] Parent fills the slot with <template #meta>...</template>
  [x] Data flows DOWN (props) and events flow UP (emits)
  [x] Parent owns the state — TaskCard never mutates props directly

EXTENSION (if you finish early)
---------------------------------
  - Add a priority badge prop (low/medium/high) with colour coding
  - Add an edit mode: clicking the task name turns it into an input
  - Emit an "update" event when the edited name is saved

HINTS (read only if stuck)
---------------------------
  Hint 1: const props = defineProps({ task: { type: Object, required: true } })
  Hint 2: const emit = defineEmits(['complete', 'delete'])
  Hint 3: @click="emit('complete', props.task.id)"
  Hint 4: In the parent — @complete="handleComplete"
           function handleComplete(id) { find task by id, toggle done }
  Hint 5: Named slot in child  → <slot name="meta" />
           Fill in parent      → <template #meta>Due: {{ task.dueDate }}</template>
  Hint 6: NEVER do this inside TaskCard: props.task.done = !props.task.done
           That mutates a prop directly — Vue will warn you. Emit instead.
=============================================================
-->

<!-- ─── TaskCard.vue ─── -->
<script setup>
import { ref } from 'vue'
// TODO 1: import defineProps and defineEmits (they are compiler macros — no import needed
//          but you DO need to call them)

// TODO 2: Define the task prop with type Object, required: true
const props = defineProps({
  task: Object,
  required: true
})

// TODO 3: Define emits for 'complete' and 'delete'
const emit = defineEmits(['complete', 'delete', 'update'])

const isEditing = ref(false)
const newTaskName = ref('')

function toggleEditing() {
  isEditing.value = !isEditing.value
}

</script>

<template>
  <!-- TODO 4: Wrap everything in a div with class "task-card"
               Add :class="{ completed: task.done }" to the wrapper div -->
  <div class="task-card" :class="{ completed: task.done }">
    <div class="priority-badge" :class="props.task.priority">
      <div :class="`${props.task.priority}-circle`"/>
      {{ props.task.priority }}
    </div>

    <div class="task-header">
      <!-- TODO 5: Display the task name -->
      <span
        v-if="!isEditing"
        @click="toggleEditing"
      >
        {{ task.name }}
      </span>

      <input
        v-if="isEditing"
        type="text"
        :placeholder="props.task.name"
        v-model="props.task.name"
        @keyup.enter="toggleEditing"
      />
      <!-- TODO 6: Add the named slot for metadata -->
      <slot name="meta" />
    </div>

    <div class="task-actions">
      <!-- TODO 7: Add Complete/Undo button — text changes based on task.done -->
      <!--         @click should emit 'complete' with task.id as payload -->
      <button
        class="btn-complete"
        @click="emit('complete', props.task.id)"
      >
        {{ task.done ? "Undo" : "Complete" }}
      </button>
      <!-- TODO 8: Add Delete button — emits 'delete' with task.id -->
      <button
        class="btn-delete"
        @click="emit('delete', props.task.id)"
      >
        Delete
      </button>
    </div>
  </div>
</template>

<style scoped>
.task-card {
  background: white;
  border: 1px solid #e2e2e2;
  border-radius: 10px;
  padding: 14px 16px;
  margin-bottom: 12px;
  min-width: 400px;
  transition: all 0.2s;
  box-shadow: 0 1px 5px rgba(0,0,0,0.1);
}

.task-card:hover {
  transform: translateY(-5px);
  box-shadow: 0 2px 5px rgba(0,0,0,0.2);
}

.task-card.completed {
  background: #f0fdf4;
  border-color: #86efac;
  opacity: 0.8;
}

.priority-badge {
  display: flex;
  justify-content: center;
  align-items: center;
  font-weight: bold;
  text-transform: uppercase;
  font-size: 9px;
  border-radius: 8px;
  max-width: fit-content;
  padding: 5px 8px;
  margin-bottom: 5px;
  gap: 5px;
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

.low-circle {
  background: #9FA70C;
  width: 8px;
  height: 8px;
  border-radius: 50%;
}

.medium-circle {
  background: #A74F0C;
  width: 8px;
  height: 8px;
  border-radius: 50%;
}

.high-circle {
  background: #A70C0C;
  width: 8px;
  height: 8px;
  border-radius: 50%;
}

.task-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 10px;
}

.task-header span {
  white-space: normal;
  word-wrap: break-word;
  overflow-wrap: break-word;
  font-weight: 600;
  font-size: 15px;
  color: #1B2A4A;
  cursor: pointer;
}

.task-header input {
  border-radius: 5px;
  padding: 5px;
}

.task-header .meta {
  font-size: 12px;
  color: #9ca3af;
}
.task-actions {
  display: flex;
  gap: 8px;
}
.btn-complete {
  padding: 5px 14px;
  background: #42B883;
  color: white;
  border: none;
  border-radius: 6px;
  cursor: pointer;
  font-size: 13px;
}
.btn-delete {
  padding: 5px 14px;
  background: #fee2e2;
  color: #dc2626;
  border: none;
  border-radius: 6px;
  cursor: pointer;
  font-size: 13px;
}
</style>
