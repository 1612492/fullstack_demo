<script setup>
import EditIcon from './edit-icon.vue';
import TrashIcon from './trash-icon.vue';

defineProps({
  name: String,
  onUpdate: Function,
  onDelete: Promise,
});
</script>

<template>
  <article class="task">
    <div class="name">{{ name }}</div>
    <div class="actions">
      <button @click="$emit('onUpdate')" class="btn-edit">
        <EditIcon />
      </button>
      <button @click="$emit('onDelete')" class="btn-delete">
        <TrashIcon />
      </button>
    </div>
  </article>
</template>
