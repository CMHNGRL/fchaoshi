<template>
  <div>
    <b-card no-body class="answer-card rounded-0">
      <QuestionBody :questionData="question.questionData"></QuestionBody>
      <b-card-body class="pt-0 text-left">
        <hr class="mt-0">
        <b-card-text 
          class="px-2" 
          v-html="'正确答案： '+question.questionData.correct_answer"
        >
        </b-card-text>
        <b-card-text 
          class="px-2" 
          :class="{ 'custom-success': question.correct, 'custom-danger': !question.correct }"
          v-html="'你选的是： '+question.userAnswer"
        >
        </b-card-text>
        <b-card-text v-if="question.questionData.jiexi"
          class="px-2" 
          style="color:#d28853;"
          v-html="'解析： '+question.questionData.jiexi"
        >
        </b-card-text>
      </b-card-body>
    </b-card>
  </div>
</template>

<script>
import QuestionBody from './QuestionBody'

export default {
  name: 'AnswerCC',
  props: {
    question: {
      required: true,
      type: Object
    }
  },
  components: {
    QuestionBody
  }
}
</script>

<style scoped>
.answer-card >>> .card-header {
  border-radius: 0;
}
</style>

<style  scoped src='../../assets/css/bootstrap.css'></style>
<style  scoped src='../../assets/css/bootstrap-vue.css'></style>
<style scoped src='../../assets/css/exam.css'></style>