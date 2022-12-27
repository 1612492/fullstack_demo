<script setup>
import { ref, onBeforeMount } from 'vue';
import Task from './components/task.vue';
import Modal from './components/modal.vue';
import * as api from './api/rest';

const open = ref(false);
const tasks = ref([]);
const selectedTask = ref(null);

onBeforeMount(() => {
  api.findAllTaks().then((data) => (tasks.value = data));
});

async function onCreate(name) {
  const task = await api.createTask({ name });
  tasks.value = [...tasks.value, { id: task.id, name: task.name }];
}

async function onUpdate(name) {
  await api.updateTaskById(selectedTask.value.id, { name });
  tasks.value = tasks.value.map((task) =>
    task.id === selectedTask.value.id ? { ...task, name } : task
  );
  selectedTask.value = null;
}

async function onDelete(id) {
  await api.deleteTaskById(id);
  tasks.value = tasks.value.filter((task) => task.id !== id);
}

function onSave(name) {
  if (selectedTask.value) {
    onUpdate(name);
  } else {
    onCreate(name);
  }
}
</script>

<template>
  <div class="card">
    <div class="header">
      <div class="logo">TODO</div>
      <div class="count">{{ tasks.length }} tasks</div>
    </div>
    <div class="body">
      <Task
        v-for="task in tasks"
        :name="task.name"
        @on-update="
          () => {
            selectedTask = task;
            open = true;
          }
        "
        @on-delete="() => onDelete(task.id)"
      />
    </div>
    <button @click="open = true" class="btn-add">Add task</button>
  </div>
  <Modal
    :open="open"
    :default-name="selectedTask?.name"
    @on-close="open = false"
    @on-save="onSave"
  />
</template>
