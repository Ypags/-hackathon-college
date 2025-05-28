<script setup>
import { ref } from 'vue'
import { useRouter } from 'vue-router'

const router = useRouter()
const title = ref('Уравнения по математике')

const goBack = () => {
  router.push('/')
}
</script>

<template>
  <div class="equations-container">
    <div class="header-with-back">
      <button class="back-btn" @click="goBack">
        <span class="back-icon">←</span>
        <span class="back-text">Назад</span>
      </button>
      <h1>{{ title }}</h1>
    </div>
    <div class="equations-list">
      <div class="equation-card">
        <h3>Решите уравнение</h3>
        <p class="equation">2x + 5 = 15</p>
        <div class="equation-actions">
          <button class="btn primary">Посмотреть решение</button>
          <button class="btn secondary">Следующее</button>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
.equations-container {
  max-width: 1200px;
  margin: 0 auto;
  padding: 2rem;
}

.header-with-back {
  display: flex;
  align-items: center;
  margin-bottom: 2rem;
  position: relative;
}

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

.back-icon {
  font-size: 1.1rem;
  font-weight: normal;
  opacity: 0.8;
}

.back-text {
  font-size: 0.95rem;
}

h1 {
  color: #2c3e50;
  text-align: center;
  width: 100%;
}

.equations-list {
  display: flex;
  justify-content: center;
}

.equation-card {
  background-color: #fff;
  border-radius: 12px;
  box-shadow: 0 6px 18px rgba(0, 0, 0, 0.1);
  padding: 2rem;
  width: 100%;
  max-width: 600px;
}

.equation-card h3 {
  color: #2c3e50;
  margin-bottom: 1rem;
}

.equation {
  font-size: 1.8rem;
  text-align: center;
  margin: 2rem 0;
  font-weight: 500;
}

.equation-actions {
  display: flex;
  justify-content: space-between;
  margin-top: 2rem;
  gap: 1rem;
}

.btn {
  padding: 0.75rem 1.5rem;
  border-radius: 8px;
  border: none;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.2s ease;
}

.btn.primary {
  background-color: #3498db;
  color: white;
}

.btn.primary:hover {
  background-color: #2980b9;
}

.btn.secondary {
  background-color: #ecf0f1;
  color: #34495e;
}

.btn.secondary:hover {
  background-color: #bdc3c7;
}

@media (max-width: 450px) {
  .btn {
    padding: 0.6rem 0.9rem;
  }
}

@media (max-width: 768px) {
  .header-with-back {
    flex-direction: column;
    gap: 1rem;
  }

  .back-btn {
    position: static;
    align-self: flex-start;
  }
}
</style>
