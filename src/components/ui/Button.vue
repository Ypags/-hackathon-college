<script setup>
import { defineProps, defineEmits } from 'vue'

const props = defineProps({
  text: {
    type: String,
    default: 'Кнопка',
  },
  type: {
    type: String,
    default: 'primary', // primary, secondary, danger
    validator: (value) => ['primary', 'secondary', 'danger'].includes(value),
  },
  loading: {
    type: Boolean,
    default: false,
  },
  disabled: {
    type: Boolean,
    default: false,
  },
  size: {
    type: String,
    default: 'medium', // small, medium, large
    validator: (value) => ['small', 'medium', 'large'].includes(value),
  },
})

const emit = defineEmits(['click'])

const handleClick = () => {
  if (!props.disabled && !props.loading) {
    emit('click')
  }
}
</script>

<template>
  <button
    class="custom-button"
    :class="[
      `button-${type}`,
      `button-${size}`,
      { 'button-loading': loading, 'button-disabled': disabled },
    ]"
    @click="handleClick"
    :disabled="disabled || loading"
  >
    <div v-if="loading" class="loading-spinner"></div>
    <span :class="{ 'text-hidden': loading }">{{ text }}</span>
  </button>
</template>

<style scoped>
.custom-button {
  display: flex;
  align-items: center;
  justify-content: center;
  font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
  font-weight: 500;
  border: none;
  border-radius: 8px;
  cursor: pointer;
  transition: all 0.3s ease;
  position: relative;
  overflow: hidden;
}

/* Размеры */
.button-small {
  padding: 0.4rem 0.8rem;
  font-size: 0.85rem;
}

.button-medium {
  padding: 0.7rem 1.4rem;
  font-size: 1rem;
}

.button-large {
  padding: 0.9rem 1.8rem;
  font-size: 1.1rem;
}

/* Типы */
.button-primary {
  background-color: #4a6cf7;
  color: white;
  box-shadow: 0 2px 5px rgba(74, 108, 247, 0.3);
}

.button-primary:hover:not(.button-disabled) {
  background-color: #3a5bd9;
  transform: translateY(-2px);
  box-shadow: 0 4px 8px rgba(74, 108, 247, 0.4);
}

.button-primary:active:not(.button-disabled) {
  transform: translateY(0);
  box-shadow: 0 1px 3px rgba(74, 108, 247, 0.3);
}

.button-secondary {
  background-color: #f8f9fa;
  color: #495057;
  box-shadow: 0 2px 5px rgba(0, 0, 0, 0.05);
  border: 1px solid #e9ecef;
}

.button-secondary:hover:not(.button-disabled) {
  background-color: #e9ecef;
  transform: translateY(-2px);
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.07);
}

.button-secondary:active:not(.button-disabled) {
  transform: translateY(0);
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.05);
}

.button-danger {
  background-color: #dc3545;
  color: white;
  box-shadow: 0 2px 5px rgba(220, 53, 69, 0.3);
}

.button-danger:hover:not(.button-disabled) {
  background-color: #c82333;
  transform: translateY(-2px);
  box-shadow: 0 4px 8px rgba(220, 53, 69, 0.4);
}

.button-danger:active:not(.button-disabled) {
  transform: translateY(0);
  box-shadow: 0 1px 3px rgba(220, 53, 69, 0.3);
}

/* Состояния */
.button-disabled {
  opacity: 0.6;
  cursor: not-allowed;
  transform: none !important;
  box-shadow: none !important;
}

.button-loading {
  cursor: wait;
}

.text-hidden {
  visibility: hidden;
}

/* Анимация загрузки */
.loading-spinner {
  position: absolute;
  width: 20px;
  height: 20px;
  border: 2px solid rgba(255, 255, 255, 0.3);
  border-radius: 50%;
  border-top-color: #fff;
  animation: spin 0.8s linear infinite;
}

@keyframes spin {
  to {
    transform: rotate(360deg);
  }
}
</style>
