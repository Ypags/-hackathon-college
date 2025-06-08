<script setup>
import BackButton from '../../components/ui/BackButton.vue'
import Button from '../../components/ui/Button.vue'
import { ref, onMounted } from 'vue'
import axios from 'axios'

const probability = ref(null)
const showSolution = ref(false)

const p = ref('p')
const n = ref('n')
const k = ref('k')

const lessThanK = ref(null) // а) менее k раз
const moreThanK = ref(null) // б) более k раз
const notLessThanK = ref(null) // в) не менее k раз
const notMoreThanK = ref(null) // г) не более k раз

const getProbability = async () => {
  try {
    const response = await axios.get(`https://hakaton-backend-tfz7.onrender.com/probability`)
    probability.value = response.data

    const { parameters, results } = probability.value

    p.value = parameters.p
    n.value = parameters.n
    k.value = parameters.k

    lessThanK.value = results.lessThanK
    moreThanK.value = results.moreThanK
    notLessThanK.value = results.notLessThanK
    notMoreThanK.value = results.notMoreThanK

    console.log('Получены данные для вероятности:', probability.value)
  } catch (error) {
    console.error('Ошибка при получении данных:', error)
  }
}

// Функция для переключения отображения решения
const toggleSolution = () => {
  showSolution.value = !showSolution.value
}

onMounted(() => {
  getProbability()
})
</script>

<template>
  <div class="container">
    <div class="header-with-back">
      <BackButton />
      <h1>Вероятность</h1>
    </div>
    <section class="theory">
      <h2>Теория</h2>
      <p>
        Теория вероятностей — это раздел математики, который изучает случайные события и помогает
        понять, насколько вероятно то или иное событие. Проще говоря, теория вероятностей отвечает
        на вопрос: «С какой вероятностью это случится?» Например, если подбросить монету, то
        возможны два случайных исхода: орёл или решка. Вероятность каждого из них — 50%, если монета
        честная. Теория вероятностей используется во многих областях: от прогнозов погоды и
        страхования до игр и анализа данных.
      </p>
    </section>

    <section class="task-section">
      <h2>Задание</h2>
      <div class="task-card">
        <h3>Задача о стрелке</h3>
        <div class="task-description">
          <p>
            Для некоторого стрелка вероятность попадания в мишень при каждом выстреле равна p =
            {{ p }}. Найдите вероятность того, что сделав n = {{ n }} выстрелов, стрелок попадет в
            мишень:
          </p>
          <ul class="subtasks">
            <li>а) менее {{ k }} раз</li>
            <li>б) более {{ k }} раз</li>
            <li>в) не менее {{ k }} раз</li>
            <li>г) не более {{ k }} раз</li>
          </ul>

          <div class="controls">
            <Button
              :text="showSolution ? 'Скрыть решение' : 'Показать решение'"
              @click="toggleSolution"
              :type="showSolution ? 'secondary' : 'primary'"
              size="medium"
            />
          </div>
        </div>

        <div v-if="showSolution" class="formula">
          <h4>Решение</h4>
          <p>
            Так как каждый выстрел независим от других, мы имеем дело с испытаниями по схеме
            Бернулли. Вероятность ровно m попаданий из n выстрелов вычисляется по формуле:
          </p>
          <div class="math-formula">
            P(m) = C<sub>n</sub><sup>m</sup> · p<sup>m</sup> · (1-p)<sup>n-m</sup>
          </div>
          <p>где C<sub>n</sub><sup>m</sup> — число сочетаний из n по m.</p>

          <h4>Ответы:</h4>
          <ol class="answer-list">
            <li>
              <strong>а) Вероятность попадания менее {{ k }} раз:</strong>
              <div class="math-formula">P(X < {{ k }}) = P(0) + P(1) + ... + P({{ k - 1 }})</div>
              <div v-if="lessThanK !== null" class="answer-result">
                <span class="answer-label">Ответ:</span>
                <span class="answer-value">{{ lessThanK }}</span>
              </div>
            </li>
            <li>
              <strong>б) Вероятность попадания более {{ k }} раз:</strong>
              <div class="math-formula">
                P(X > {{ k }}) = P({{ k + 1 }}) + P({{ k + 2 }}) + ... + P({{ n }})
              </div>
              <div v-if="moreThanK !== null" class="answer-result">
                <span class="answer-label">Ответ:</span>
                <span class="answer-value">{{ moreThanK }}</span>
              </div>
            </li>
            <li>
              <strong>в) Вероятность попадания не менее {{ k }} раз:</strong>
              <div class="math-formula">
                P(X ≥ {{ k }}) = P({{ k }}) + P({{ k + 1 }}) + ... + P({{ n }})
              </div>
              <div v-if="notLessThanK !== null" class="answer-result">
                <span class="answer-label">Ответ:</span>
                <span class="answer-value">{{ notLessThanK }}</span>
              </div>
            </li>
            <li>
              <strong>г) Вероятность попадания не более {{ k }} раз:</strong>
              <div class="math-formula">P(X ≤ {{ k }}) = P(0) + P(1) + ... + P({{ k }})</div>
              <div v-if="notMoreThanK !== null" class="answer-result">
                <span class="answer-label">Ответ:</span>
                <span class="answer-value">{{ notMoreThanK }}</span>
              </div>
            </li>
          </ol>
        </div>
      </div>
    </section>
  </div>
</template>

<style scoped>
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

.task-card {
  background-color: #f8f9fa;
  border-radius: 10px;
  padding: 2rem;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.08);
}

.task-card h3 {
  color: #2c3e50;
  margin-bottom: 1.2rem;
  font-size: 1.3rem;
}

.task-description {
  margin-bottom: 1.5rem;
  line-height: 1.6;
}

.subtasks {
  margin: 1rem 0;
  padding-left: 1.5rem;
}

.subtasks li {
  margin-bottom: 0.5rem;
  color: #333;
}

.formula {
  margin-top: 2rem;
  padding-top: 2rem;
  border-top: 1px solid #e9ecef;
}

.math-formula {
  background-color: #f1f8ff;
  padding: 1rem;
  margin: 1rem 0;
  border-radius: 5px;
  font-family: 'Times New Roman', serif;
  font-size: 1.1rem;
  text-align: center;
}

.answer-list {
  padding-left: 1.5rem;
}

.answer-list li {
  margin-bottom: 1.5rem;
}

.answer-result {
  margin-top: 0.5rem;
  padding: 0.75rem 1rem;
  background-color: #e9f7ef;
  border-left: 4px solid #27ae60;
  border-radius: 5px;
  font-size: 1rem;
  display: flex;
  align-items: center;
}

.answer-label {
  font-weight: bold;
  color: #2c3e50;
}

.answer-value {
  margin-left: 0.5rem;
  font-family: 'Courier New', monospace;
  background-color: #f1f1f1;
  padding: 2px 6px;
  border-radius: 3px;
  color: #e74c3c;
  font-weight: bold;
}

.controls {
  margin-top: 1.5rem;
  display: flex;
  justify-content: center;
}
</style>
