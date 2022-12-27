<script setup>
import XIcon from './x-icon.vue';
import { ref, watch } from 'vue';

const name = ref(null);

const props = defineProps({
  open: Boolean,
  onClose: Function,
  defaultName: String,
  onSave: Function,
});

watch(
  () => props.defaultName,
  (value) => {
    if (value && value !== name.value) {
      name.value = value;
    }
  }
);
</script>
<template>
  <div v-if="open" class="mask">
    <div class="modal">
      <form class="form">
        <button type="button" @click="$emit('onClose')" class="btn-close">
          <XIcon />
        </button>
        <div class="input-group">
          <label htmlFor="name" class="label">Task's name</label>
          <input
            id="name"
            :value="name"
            @input="(event) => (name = event.target.value)"
            class="input"
          />
        </div>
        <button
          type="button"
          @click="
            () => {
              $emit('onSave', name);
              $emit('onClose');
              name = null;
            }
          "
          class="btn-save"
        >
          Save
        </button>
      </form>
    </div>
  </div>
</template>
