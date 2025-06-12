<script setup>
import { ref, onMounted } from 'vue'
import { useRouter } from 'vue-router'
import BackButton from '../../components/ui/BackButton.vue'

const router = useRouter()

// Данные для теста
const graphs = [
  { image: '/graphics/func1.jpg', correctAnswer: 'y = x²ⁿ' },
  { image: '/graphics/func2.jpg', correctAnswer: 'y = x²ⁿ⁻¹' },
  { image: '/graphics/func3.jpg', correctAnswer: 'y = x⁻²ⁿ' },
  { image: '/graphics/func4.jpg', correctAnswer: 'y = x⁻⁽²ⁿ⁻¹⁾' },
  { image: '/graphics/func5.jpg', correctAnswer: 'y = xᵖ' },
  { image: '/graphics/func6.jpg', correctAnswer: 'y = xᵖ' },
  { image: '/graphics/func7.jpg', correctAnswer: 'y = xᵖ' },
]

const answers = [
  'y = x²',
  'y = sin(x)',
  'y = cos(x)',
  'y = tan(x)',
  'y = 1/x',
  'y = |x|',
  'y = ln(x)',
  'y = e^x',
  'y = √x',
  'y = ∛x',
  'y = x³',
  'y = 2^x',
]

// Состояние
const currentIndex = ref(0)
const isAnswerSelected = ref(false)
const correctCount = ref(0)
const currentImage = ref('')
const options = ref([])
const isNextDisabled = ref(true)
const isTestComplete = ref(false)
const buttonText = ref('Перейти к следующему графику')
const progress = ref('Вопрос 1 из 7')

// Перемешивание массива
const shuffle = (array) => [...array].sort(() => Math.random() - 0.5)

// Подготовка текущего вопроса
function prepareQuestion() {
  const current = graphs[currentIndex.value]
  progress.value = `Вопрос ${currentIndex.value + 1} из ${graphs.length}`
  currentImage.value = current.image

  // Формирование вариантов ответов
  const wrongOptions = shuffle(answers.filter((a) => a !== current.correctAnswer)).slice(0, 4)
  options.value = shuffle([...wrongOptions, current.correctAnswer]).map((text) => ({
    text,
    isCorrect: text === current.correctAnswer,
    selected: false,
    showCorrect: false,
  }))

  isAnswerSelected.value = false
  isNextDisabled.value = true
}

// Выбор ответа
function selectAnswer(index) {
  if (isAnswerSelected.value) return

  isAnswerSelected.value = true
  const selected = options.value[index]
  selected.selected = true

  if (selected.isCorrect) {
    correctCount.value++
  } else {
    // Показать правильный ответ
    options.value.find((o) => o.isCorrect).showCorrect = true
  }

  isNextDisabled.value = false

  if (currentIndex.value === graphs.length - 1) {
    buttonText.value = 'Завершить тест'
  }
}

// Переход к следующему вопросу
function next() {
  if (currentIndex.value < graphs.length - 1) {
    currentIndex.value++
    prepareQuestion()
  } else {
    isTestComplete.value = true
  }
}

// Возврат на главную
const goBack = () => router.push('/')

// Инициализация
onMounted(prepareQuestion)
</script>

<template>
  <div class="container">
    <div class="header-with-back">
      <BackButton />
      <h1>Определите график функции</h1>
    </div>

    <section class="theory">
      <h2>Теория</h2>
      <p>
        Функция — одно из базовых понятий математики. Функция — это правило, по которому каждому
        значению переменной x ставится в соответствие единственное значение f(x). Говоря проще,
        функция показывает, как одно число зависит от другого. Например, если функция задаёт правило
        "к числу прибавить 2", то при x = 3 получаем f(3) = 5. Функции часто используются, чтобы
        описывать законы природы, рост чисел, изменения и многое другое.
      </p>
    </section>

    <div v-if="!isTestComplete">
      <div class="progress">{{ progress }}</div>

      <div class="content-wrapper">
        <div class="graph-container">
          <img class="graph-image" :src="currentImage" alt="График функции" />
        </div>

        <div class="answers-container">
          <h3>Варианты ответов:</h3>
          <div
            v-for="(option, index) in options"
            :key="index"
            class="answer-option"
            :class="{
              correct: (option.selected && option.isCorrect) || option.showCorrect,
              incorrect: option.selected && !option.isCorrect,
            }"
            @click="selectAnswer(index)"
          >
            {{ option.text }}
          </div>
        </div>
      </div>

      <button class="next-button" :disabled="isNextDisabled" @click="next">
        {{ buttonText }}
      </button>
    </div>

    <div v-else class="result-container">
      <h2>Тест завершён!</h2>
      <p>Вы ответили правильно на {{ correctCount }} из {{ graphs.length }} вопросов</p>
      <button class="restart-button" @click="goBack">Выйти в главное меню</button>
    </div>
  </div>
</template>

<style scoped>
.content-wrapper {
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  gap: 20px;
  margin-bottom: 30px;
}

.graph-container {
  flex: 1;
  min-width: 300px;
  max-width: 600px;
  padding: 20px;
  border: 1px solid #ddd;
  border-radius: 8px;
  background-color: #f9f9f9;
  display: flex;
  justify-content: center;
  align-items: center;
}

.graph-image {
  max-width: 100%;
  max-height: 300px;
  object-fit: contain;
}

.answers-container {
  min-width: 300px;
  max-width: 400px;
  padding: 20px;
  border: 1px solid #ddd;
  border-radius: 8px;
  background-color: #f9f9f9;
}

.answer-option {
  padding: 10px 15px;
  margin-bottom: 10px;
  background-color: #e6f2ff;
  border: 1px solid #b3d7ff;
  border-radius: 4px;
  cursor: pointer;
  transition: all 0.3s;
}

.answer-option:hover {
  background-color: #cce5ff;
}

.correct {
  background-color: #d4edda;
  border-color: #c3e6cb;
  color: #155724;
}

.incorrect {
  background-color: #f8d7da;
  border-color: #f5c6cb;
  color: #721c24;
}

h1 {
  color: #2c3e50;
  text-align: center;
  width: 100%;
}

h2 {
  font-size: 1.5rem;
  color: #34495e;
  margin-bottom: 1.5rem;
}

.progress {
  margin-bottom: 20px;
  font-weight: bold;
  text-align: center;
}

.next-button {
  display: block;
  margin: 20px auto 0;
  padding: 12px 25px;
  background-color: #4caf50;
  color: white;
  border: none;
  border-radius: 4px;
  font-size: 16px;
  cursor: pointer;
  transition: background-color 0.3s;
}

.next-button:hover {
  background-color: #45a049;
}

.next-button:disabled {
  background-color: #cccccc;
  cursor: not-allowed;
}

.result-container {
  text-align: center;
  padding: 30px;
  border: 1px solid #ddd;
  border-radius: 8px;
  background-color: #f9f9f9;
  max-width: 500px;
  margin: 0 auto;
}

.restart-button {
  padding: 12px 25px;
  background-color: #2196f3;
  color: white;
  border: none;
  border-radius: 4px;
  font-size: 16px;
  cursor: pointer;
  transition: background-color 0.3s;
  margin-top: 20px;
}

.restart-button:hover {
  background-color: #0b7dda;
}
</style>
