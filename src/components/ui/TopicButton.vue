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
  <button
    class="topic-btn"
    :class="{ active: isActive }"
    :style="{ '--topic-color': topic.color }"
    @click="$emit('select', topic.id)"
  >
    {{ topic.name }}
  </button>
</template>

<style scoped>
.topic-btn {
  width: 9rem;
  padding: 0.75rem 1.5rem;
  border-radius: 8px;
  border: 2px solid var(--topic-color);
  background-color: white;
  color: var(--topic-color);
  font-weight: bold;
  cursor: pointer;
  transition: all 0.2s ease;
}

.topic-btn:hover {
  background-color: var(--topic-color);
  color: white;
}

.topic-btn.active {
  background-color: var(--topic-color);
  color: white;
}

@media (max-width: 480px) {
  .topic-btn {
    width: 100%;
  }
}
</style>
