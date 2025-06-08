<script setup>
import { ref, computed } from 'vue'
import { useRouter } from 'vue-router'
import SubjectCard from '../components/SubjectCard.vue'
import TopicButton from '../components/ui/TopicButton.vue'

const router = useRouter()
const activeSubject = ref(null)
const activeTopic = ref(null)

const subjects = ref([
  {
    id: 'math',
    name: 'Математика',
    icon: '✏️',
    topics: [
      { id: 'limits', name: 'Пределы' },
      { id: 'graphics', name: 'Графики функций' },
      { id: 'probability', name: 'Теория вероятностей' },
      { id: 'derivatives', name: 'Производные' },
      { id: 'integrals', name: 'Интегралы' },
      { id: 'matrices', name: 'Матрицы' },
    ],
  },
  { id: 'physics', name: 'Физика', icon: '🔭', topics: [] },
  { id: 'chemistry', name: 'Химия', icon: '🧪', topics: [] },
  { id: 'biology', name: 'Биология', icon: '🧬', topics: [] },
])

const activeTopics = computed(() => {
  if (!activeSubject.value) return []
  const subject = subjects.value.find((s) => s.id === activeSubject.value)
  return subject ? subject.topics : []
})

const selectSubject = (subjectId) => {
  activeSubject.value = subjectId
  const subject = subjects.value.find((s) => s.id === subjectId)
  if (subject && subject.topics.length > 0) {
    activeTopic.value = subject.topics[0].id
  } else {
    activeTopic.value = null
  }
}

const selectTopic = (topicId) => {
  activeTopic.value = topicId
}

const startLearning = () => {
  if (activeSubject.value === 'math') {
    if (activeTopic.value === 'limits') {
      router.push('/limits')
    } else if (activeTopic.value === 'graphics') {
      router.push('/graphics')
    } else if (activeTopic.value === 'probability') {
      router.push('/probability')
    } else {
      alert('Эта тема пока находится в разработке!')
    }
  } else {
    alert('Эта дисциплина пока находится в разработке!')
  }
}
</script>

<template>
  <div class="container">
    <header>
      <h1>Учись с удовольствием</h1>
      <p>Выбери дисциплину и тему, чтобы начать</p>
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

    <section v-if="activeSubject" class="topic-selection">
      <h2>Выберите тему</h2>
      <div class="topic-buttons">
        <TopicButton
          v-for="topic in activeTopics"
          :key="topic.id"
          :topic="topic"
          :isActive="activeTopic === topic.id"
          @select="selectTopic"
        />
      </div>
    </section>

    <button class="start-btn" :disabled="!activeTopic" @click="startLearning">
      Начать обучение
    </button>
  </div>
</template>

<style scoped>
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

.topic-buttons {
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

.start-btn:disabled {
  background-color: #bdc3c7;
  cursor: not-allowed;
  transform: none;
  box-shadow: none;
}

.start-btn:hover:not(:disabled) {
  background-color: #1d78b5;
  transform: translateY(-3px);
  box-shadow: 0 6px 16px rgba(52, 152, 219, 0.4);
}

.start-btn:active:not(:disabled) {
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

  .topic-buttons {
    flex-direction: column;
  }
}
</style>
