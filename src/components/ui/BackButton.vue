<script setup>
import { useRouter } from 'vue-router'

const router = useRouter()

const goBack = () => {
  router.push('/')
}
</script>

<template>
  <button class="back-btn" @click="goBack">
    <span class="back-icon">←</span>
    <span class="back-text">Назад</span>
  </button>
</template>

<style scoped>
.back-btn {
  position: absolute;
  left: 0;
  display: flex;
  align-items: center;
  gap: 8px;
  padding: 0.6rem 1.2rem;
  background-color: #f8f9fa;
  color: #6c757d;
  font-weight: 500;
  cursor: pointer;
  border: 1px solid #e9ecef;
  border-radius: 8px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.05);
  transition: all 0.3s ease;
}

.back-btn:hover {
  background-color: #f1f3f5;
  color: #495057;
  transform: translateY(-1px);
  box-shadow: 0 3px 6px rgba(0, 0, 0, 0.08);
}

.back-btn:active {
  transform: translateY(0);
  box-shadow: 0 1px 2px rgba(0, 0, 0, 0.05);
}
</style>
