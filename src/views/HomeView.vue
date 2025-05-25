<script setup>
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import SubjectCard from '../components/ui/SubjectCard.vue'
import DifficultyButton from '../components/ui/DifficultyButton.vue'

const router = useRouter()
const activeSubject = ref('math')
const activeDifficulty = ref('easy')

const subjects = [
  { id: 'math', name: 'Математика', icon: '✏️', active: true },
  { id: 'physics', name: 'Физика', icon: '🔭', active: false },
  { id: 'chemistry', name: 'Химия', icon: '🧪', active: false },
  { id: 'biology', name: 'Биология', icon: '🧬', active: false },
]

const difficulties = [
  { id: 'easy', name: 'Легкий', color: '#2ecc71' },
  { id: 'medium', name: 'Средний', color: '#f39c12' },
  { id: 'hard', name: 'Сложный', color: '#e74c3c' },
]

const selectSubject = (subjectId) => {
  activeSubject.value = subjectId
}

const selectDifficulty = (difficultyId) => {
  activeDifficulty.value = difficultyId
}

const startLearning = () => {
  if (activeSubject.value === 'math') {
    router.push('/equations')
  } else {
    alert('Эта дисциплина пока находится в разработке!')
  }
}
</script>

<template>
  <div class="home-container">
    <header>
      <h1>Учись с удовольствием</h1>
      <p>Выбери дисциплину и уровень сложности, чтобы начать</p>
    </header>

    <section class="subject-selection">
      <h2>Выберите дисциплину</h2>
      <div class="subject-cards">
        <SubjectCard
          v-for="subject in subjects"
          :key="subject.id"
          :subject="subject"
          :isActive="activeSubject === subject.id"
          @select="selectSubject"
        />
      </div>
    </section>

    <section class="difficulty-selection">
      <h2>Выберите уровень сложности</h2>
      <div class="difficulty-buttons">
        <DifficultyButton
          v-for="difficulty in difficulties"
          :key="difficulty.id"
          :difficulty="difficulty"
          :isActive="activeDifficulty === difficulty.id"
          @select="selectDifficulty"
        />
      </div>
    </section>

    <button class="start-btn" @click="startLearning">Начать обучение</button>
  </div>
</template>

<style scoped>
.home-container {
  max-width: 1200px;
  margin: 0 auto;
  padding: 2rem;
  font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
}

header {
  text-align: center;
  margin-bottom: 3rem;
}

h1 {
  font-size: 2.5rem;
  color: #2c3e50;
  margin-bottom: 0.5rem;
}

header p {
  font-size: 1.2rem;
  color: #7f8c8d;
}

section {
  margin-bottom: 2.5rem;
}

h2 {
  font-size: 1.5rem;
  color: #34495e;
  margin-bottom: 1.5rem;
  text-align: center;
}

.subject-cards {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
  gap: 1.5rem;
}

.difficulty-buttons {
  display: flex;
  justify-content: center;
  gap: 1rem;
  flex-wrap: wrap;
}

.start-btn {
  display: block;
  margin: 0 auto;
  padding: 1rem 2.5rem;
  font-size: 1.2rem;
  font-weight: bold;
  background-color: #3498db;
  color: white;
  border: none;
  border-radius: 10px;
  cursor: pointer;
  transition: all 0.3s ease;
  box-shadow: 0 4px 12px rgba(52, 152, 219, 0.3);
}

.start-btn:hover {
  background-color: #2980b9;
  transform: translateY(-3px);
  box-shadow: 0 6px 16px rgba(52, 152, 219, 0.4);
}

.start-btn:active {
  transform: translateY(0);
}

@media (max-width: 768px) {
  .subject-cards {
    grid-template-columns: repeat(2, 1fr);
  }
}

@media (max-width: 480px) {
  .subject-cards {
    grid-template-columns: 1fr;
  }

  .difficulty-buttons {
    flex-direction: column;
  }
}
</style>
