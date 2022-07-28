<template>
  <div class="h-100">
      <b-card-header class="custom-info text-white font-weight-bold">成绩: {{ score }} / {{ maxScore }}</b-card-header>
    <Answer v-for="(question, index) of questions" :key="index" :question="question"></Answer>
  </div>
</template>

<script>
import Answer from '../../components/exam/Answer'

export default {
  name: 'ExamOver',
  components: {
    Answer
  },
  data() {
    return {
      questions: [],
      score: 0,
      maxScore: 0
    }
  },
  methods: {
    
    setQuestions() {
      this.questions = this.$root.$data.state || []
      console.log(this.questions)
      this.$root.$data.state = []
      this.setScore()
    },
    
    setScore() {
      this.maxScore = this.questions.length * 10
      this.score = this.questions.filter(q => q.correct).length * 10
    }
  },
  created() {
    this.setQuestions();
  }
}
</script>

<style  scoped src='@/assets/css/bootstrap.css'></style>
<style  scoped src='@/assets/css/bootstrap-vue.css'></style>
<style scoped src='@/assets/css/exam.css'></style>