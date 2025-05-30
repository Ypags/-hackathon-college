<script setup>
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import MathFormula from '../components/ui/MathFormula.vue'

const router = useRouter()

// Функция для генерации случайного целого числа в заданном диапазоне, исключая 0
function getRandomInt(min, max) {
  min = Math.ceil(min)
  max = Math.floor(max)
  let num
  do {
    num = Math.floor(Math.random() * (max - min + 1)) + min
  } while (num === 0)
  return num
}

// Генерируем случайные коэффициенты для формул
const a = getRandomInt(-50, 50)
const b = getRandomInt(-50, 50)
const c = getRandomInt(-50, 50)
const d = getRandomInt(-50, 50)
const g = getRandomInt(-50, 50)
const h = getRandomInt(-50, 50)

// Примеры пределов
const examples = ref([
  {
    id: 1,
    expression: `\\lim\\limits_{x\\to\\infty} \\frac{${a}x^5+${b}x^3+${c}}{${d}x^5+${g}x^2+${h}x}`,
    solution: `В разработке`,
    explanation:
      'При x→∞ имеют значение только члены с наибольшей степенью x в числителе и знаменателе. Поскольку \\frac{ax^5}{dx^5} = \\frac{a}{d}, то предел равен a/d.',
  },
  {
    id: 2,
    expression: `\\lim\\limits_{x\\to\\infty} \\frac{${a}x^4+${b}x^7+${c}x}{${d}x^9+${g}x+${h}x^2}`,
    solution: `В разработке`,
    explanation:
      'Наибольшая степень в числителе - x^7, а в знаменателе - x^9. Так как \\frac{x^7}{x^9} = \\frac{1}{x^2} \\to 0 при x→∞, то предел равен 0.',
  },
  {
    id: 3,
    expression: `\\lim\\limits_{x\\to\\infty} \\frac{${a}x+${b}x^2+${c}x^3}{${d}+${g}x^6+${h}x^4}`,
    solution: `В разработке`,
    explanation:
      'Наибольшая степень в числителе - x^3, а в знаменателе - x^6. Так как \\frac{x^3}{x^6} = \\frac{1}{x^3} \\to 0 при x→∞, то предел равен 0.',
  },
])

const goBack = () => {
  router.push('/')
}
</script>

<template>
  <div class="limits-container">
    <div class="header-with-back">
      <button class="back-btn" @click="goBack">
        <span class="back-icon">←</span>
        <span class="back-text">Назад</span>
      </button>
      <h1>Пределы</h1>
    </div>

    <section class="theory">
      <h2>Теория</h2>
      <p>
        Предел функции — одно из основных понятий математического анализа. Предел функции f(x) при
        x, стремящемся к a, — это число L, к которому значения функции f(x) становятся сколь угодно
        близкими при достаточном приближении x к a.
      </p>
    </section>

    <section class="examples">
      <h2>Примеры</h2>
      <div class="example-cards">
        <div v-for="example in examples" :key="example.id" class="example-card">
          <div class="math-expression">
            <div class="formula-container">
              <div class="formula-numbered">
                <span class="example-number">{{ example.id }}. </span>
                <MathFormula :formula="example.expression" :displayMode="true" />
              </div>
              <div v-if="example.solution !== ''" class="formula-solution">
                = <MathFormula :formula="example.solution" />
              </div>
            </div>
          </div>
          <div class="explanation">{{ example.explanation }}</div>
        </div>
      </div>
    </section>
  </div>
</template>

<style scoped>
.limits-container {
  max-width: 1200px;
  margin: 0 auto;
  padding: 2rem;
  font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
  background-color: #fff;
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

section {
  margin-bottom: 2.5rem;
}

h2 {
  font-size: 1.5rem;
  color: #34495e;
  margin-bottom: 1.5rem;
}

.theory p {
  line-height: 1.6;
  color: #333;
}

.example-cards {
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
  background-color: #f9fafb;
  padding: 1.5rem;
  border-radius: 12px;
  box-shadow: inset 0 2px 8px rgba(0, 0, 0, 0.05);
}

.example-card {
  padding: 1.5rem;
  border-radius: 10px;
  background-color: #fff;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.08);
}

.math-expression {
  margin-bottom: 1rem;
}

.formula-container {
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  margin-bottom: 1rem;
}

.formula-numbered {
  display: flex;
  align-items: center;
  margin-bottom: 0.5rem;
}

.example-number {
  font-weight: 600;
  color: #2c3e50;
  font-size: 1.1rem;
  margin-right: 0.5rem;
}

.formula-solution {
  margin-left: 2.25rem;
  display: flex;
  align-items: center;
}

.explanation {
  color: #555;
  line-height: 1.5;
  margin-left: 2.25rem;
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
