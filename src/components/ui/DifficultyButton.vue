<script setup>
defineProps({
  difficulty: {
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
    class="difficulty-btn"
    :class="{ active: isActive }"
    :style="{ '--difficulty-color': difficulty.color }"
    @click="$emit('select', difficulty.id)"
  >
    {{ difficulty.name }}
  </button>
</template>

<style scoped>
.difficulty-btn {
  padding: 0.75rem 1.5rem;
  border-radius: 8px;
  border: 2px solid var(--difficulty-color);
  background-color: white;
  color: var(--difficulty-color);
  font-weight: bold;
  cursor: pointer;
  transition: all 0.2s ease;
}

.difficulty-btn:hover {
  background-color: var(--difficulty-color);
  color: white;
}

.difficulty-btn.active {
  background-color: var(--difficulty-color);
  color: white;
}

@media (max-width: 480px) {
  .difficulty-btn {
    width: 100%;
  }
}
</style>
