<script setup>
defineProps({
  subject: {
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
  <div class="subject-card" :class="{ active: isActive }" @click="$emit('select', subject.id)">
    <div class="subject-icon">{{ subject.icon }}</div>
    <h3>{{ subject.name }}</h3>
  </div>
</template>

<style scoped>
.subject-card {
  background-color: #fff;
  border-radius: 12px;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.05);
  padding: 1.5rem;
  text-align: center;
  cursor: pointer;
  transition: all 0.3s ease;
  border: 2px solid transparent;
}

.subject-card:hover {
  transform: translateY(-5px);
  box-shadow: 0 6px 16px rgba(0, 0, 0, 0.1);
}

.subject-card.active {
  border-color: #3498db;
  background-color: #f7fbff;
}

.subject-icon {
  font-size: 2.5rem;
  margin-bottom: 1rem;
}

.subject-card h3 {
  font-size: 1.2rem;
  color: #2c3e50;
}
</style>
