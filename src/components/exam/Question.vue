<template>
  <div>
    <QuestionBody :questionData="question.questionData"></QuestionBody>

    <b-card-body class="pt-0">
      <hr>
      <b-form @submit="onSubmit">
        <b-form-group
          label="请选择"
          class="text-left"
        >
          <b-form-radio 
            v-for="(ans, index) of question.answers" 
            :key="index" 
            v-model="answer" 
            :value="ans"
          >
            <div v-html="ans"></div>
          </b-form-radio>
        </b-form-group>

        <b-button type="submit" class="custom-success">Submit</b-button>
      </b-form>
    </b-card-body>
  </div>
</template>

<script>
import QuestionBody from './QuestionBody'

export default {
  name: 'QuestionCC',
  props: {
    question: {
      required: true,
      type: Object
    }
  },
  components: {
    QuestionBody
  },
  data() {
    return {
      answer: null
    }
  },
  methods: {
    onSubmit(evt) {
      evt.preventDefault()
      if (this.answer) {
        this.$emit('answer-submitted', this.answer)
        this.answer = null
      }
    } 
  }
}
</script>

<style  scoped src='../../assets/css/bootstrap.css'></style>
<style  scoped src='../../assets/css/bootstrap-vue.css'></style>
<style scoped src='../../assets/css/exam.css'></style>