<script setup>
import { ref, onMounted, computed } from 'vue'
import { useRouter } from 'vue-router'
import MathFormula from '../components/ui/MathFormula.vue'
import Button from '../components/ui/Button.vue'
import axios from 'axios'
import html2pdf from 'html2pdf.js'

const router = useRouter()

const limits = ref(null)
const loading = ref(false)
const activeExampleId = ref(1)
const pdfLoading = ref(false)

const a = ref('a')
const b = ref('b')
const c = ref('c')
const d = ref('d')
const g = ref('g')
const h = ref('h')
const limit = ref('limit')

const showAnswer = ref(false)

const showAnswerFunction = (exampleId) => {
  showAnswer.value = true
}

const toggleAnswer = () => {
  showAnswer.value = !showAnswer.value
}

// Функция для получения данных с сервера
const getLimit = async (exampleId) => {
  loading.value = true
  activeExampleId.value = exampleId
  try {
    const response = await axios.get(`http://127.0.0.1:8000/exercise/${exampleId}`)
    limits.value = response.data

    // Обновляем значения переменных из полученных данных
    a.value = limits.value.a
    b.value = limits.value.b
    c.value = limits.value.c
    d.value = limits.value.d
    g.value = limits.value.g
    h.value = limits.value.h
    limit.value = limits.value.limit

    console.log('Получены данные для лимита №', exampleId, ':', limits.value)
  } catch (err) {
    console.error('Ошибка при получении данных:', err)
  } finally {
    loading.value = false
  }
}

// Функция для скачивания текущего примера в PDF
const downloadPDF = async () => {
  pdfLoading.value = true
  try {
    // Ждем, пока MathJax обработает формулы
    await new Promise((resolve) => setTimeout(resolve, 500))

    // Находим элемент, который нужно сконвертировать в PDF
    const element = document.getElementById('pdf-content')

    // Настройки для PDF
    const opt = {
      margin: 15,
      filename: `Пример_${activeExampleId.value}.pdf`,
      image: { type: 'jpeg', quality: 0.98 },
      html2canvas: { scale: 2, useCORS: true },
      jsPDF: { unit: 'mm', format: 'a4', orientation: 'portrait' },
    }

    // Создаем PDF
    await html2pdf().set(opt).from(element).save()
  } catch (error) {
    console.error('Ошибка при создании PDF:', error)
  } finally {
    pdfLoading.value = false
  }
}

// Вычисляемые свойства для примеров пределов
const examples = computed(() => [
  {
    id: 1,
    expression: `\\lim\\limits_{x\\to\\infty} \\frac{${a.value}x^5+${b.value}x^3+${c.value}}{${d.value}x^5+${g.value}x^2+${h.value}x}`,
  },
  {
    id: 2,
    expression: `\\lim\\limits_{x\\to\\infty} \\frac{${a.value}x^4+${b.value}x^7+${c.value}x}{${d.value}x^9+${g.value}x+${h.value}x^2}`,
  },
  {
    id: 3,
    expression: `\\lim\\limits_{x\\to\\infty} \\frac{${a.value}x+${b.value}x^2+${c.value}x^3}{${d.value}+${g.value}x^6+${h.value}x^4}`,
  },
])

const goBack = () => {
  router.push('/')
}

onMounted(() => {
  getLimit(1)
})
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

    <section class="examples" v-if="limits">
      <h2>Примеры</h2>

      <div class="example-tabs">
        <Button
          v-for="example in examples"
          :key="example.id"
          :text="`Пример ${example.id}`"
          :type="activeExampleId === example.id ? 'primary' : 'secondary'"
          @click="getLimit(example.id)"
          size="small"
          :disabled="loading"
        />
      </div>

      <div class="example-cards">
        <div id="pdf-content" class="pdf-container">
          <div class="pdf-header">
            <h3>Пример решения предела</h3>
            <p>Пример №{{ activeExampleId }}</p>
          </div>
          <div class="example-card">
            <div class="math-expression">
              <div class="formula-container">
                <div class="formula-numbered">
                  <span class="example-number">{{ activeExampleId }}. </span>
                  <MathFormula
                    :formula="examples[activeExampleId - 1].expression"
                    :displayMode="true"
                  />
                </div>
              </div>
              <div class="pdf-answer" v-if="showAnswer && limits.limit">
                <p>Решение:</p>
                <p>Ответ: {{ limit }}</p>
              </div>
            </div>
          </div>
        </div>
        <div class="controls">
          <Button
            text="Обновить пример"
            :loading="loading"
            @click="getLimit(activeExampleId)"
            size="medium"
            type="primary"
          />
          <Button
            :text="showAnswer ? 'Скрыть ответ' : 'Показать ответ'"
            @click="toggleAnswer"
            size="medium"
            :type="showAnswer ? 'secondary' : 'primary'"
            :disabled="loading"
          />
          <Button
            text="Скачать PDF"
            :loading="pdfLoading"
            @click="downloadPDF"
            size="medium"
            type="secondary"
            :disabled="loading"
          />
        </div>
      </div>
    </section>

    <div v-if="loading" class="loading">Загрузка данных...</div>
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

.controls {
  margin-top: 1.5rem;
  display: flex;
  gap: 1rem;
  flex-wrap: wrap;
  justify-content: center;
}

.refresh-btn {
  padding: 0.8rem 1.5rem;
  background-color: #4a6cf7;
  color: white;
  font-weight: 500;
  border: none;
  border-radius: 8px;
  cursor: pointer;
  transition: all 0.3s ease;
  align-self: flex-start;
}

.refresh-btn:hover {
  background-color: #3a5bd9;
  transform: translateY(-1px);
}

.refresh-btn:disabled {
  background-color: #a8b1d5;
  cursor: not-allowed;
}

.loading {
  text-align: center;
  padding: 2rem;
  color: #6c757d;
  font-style: italic;
}

.random-button-container {
  display: flex;
  justify-content: center;
  margin-bottom: 2rem;
}

.example-tabs {
  display: flex;
  gap: 0.5rem;
  margin-bottom: 1.5rem;
  flex-wrap: wrap;
}

.main-answer {
  font-size: 1.2rem;
  padding: 1rem;
  background-color: #e9f7ef;
  border-radius: 8px;
  margin-bottom: 1.5rem;
  font-weight: 500;
  text-align: center;
}

.pdf-container {
  padding: 2rem;
  background-color: #fff;
  border: 1px solid #e9ecef;
  border-radius: 8px;
}

.pdf-header {
  text-align: center;
  margin-bottom: 2rem;
  border-bottom: 1px solid #e9ecef;
  padding-bottom: 1rem;
}

.pdf-header h3 {
  margin-bottom: 0.5rem;
  color: #2c3e50;
  font-size: 1.3rem;
}

.pdf-answer {
  margin-top: 2rem;
  padding: 1rem;
  background-color: #f8f9fa;
  border-left: 4px solid #4a6cf7;
}

.pdf-answer p {
  margin: 0.5rem 0;
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
