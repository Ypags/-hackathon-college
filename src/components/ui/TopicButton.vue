<script setup>
defineProps({
  topic: {
    type: Object,
    required: true,
  },
  isActive: {
    type: Boolean,
    default: false,
  },
})

defineEmits(['select'])
</script>

<template>
  <button class="topic-btn" :class="{ active: isActive }" @click="$emit('select', topic.id)">
    {{ topic.name }}
  </button>
</template>

<style scoped>
.topic-btn {
  width: 9rem;
  padding: 0.75rem 1.5rem;
  border-radius: 8px;
  border: 2px solid #cfcfcf;
  background-color: white;
  color: #555;
  font-weight: bold;
  cursor: pointer;
  transition: all 0.2s ease;
  position: relative;
}

.topic-btn:hover {
  background-color: #f5f5f5;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.15);
}

.topic-btn.active {
  border-color: #3498db;
  background-color: #f7fbff;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.15);
}

@media (max-width: 480px) {
  .topic-btn {
    width: 100%;
  }
}
</style>
