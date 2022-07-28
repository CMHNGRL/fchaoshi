<template>
  <div class="h-100">
    <LoadingIcon v-if="loading"></LoadingIcon>
    <Question :question="currentQuestion" @answer-submitted="onAnswerSubmit" v-else></Question>
  </div>
</template>

<script>
import ShuffleMixin from '@/assets/js/shuffleMixin'
import Question from '@/components/exam/Question'
import LoadingIcon from '@/components/exam/LoadingIcon'
import {getQuestion} from '@/request/exam'
export default {
  name: 'ExamController',
  mixins: [ShuffleMixin],//打扰题目顺序
  props: {
    number: {
      default: '10',
      type: String,
      required: true
    },
    category: String,
    difficulty: String,
    type: String
  },
  components: {
    Question,
    LoadingIcon
  },
  data() {
    return {
      // 问题数组
      questions: [],
      currentQuestion: {},
      //是否处于加载状态
      loading: true
    }
  },
  created() {
    this.fetchQuestions()
  },
  methods: {
    fetchQuestions() {
      let type=''
      if(this.type=="multiple")
      {
        type = 0
      }else if(this.type=="boolean"){
        type=1
      }
      let difficulty=''
      if(this.difficulty=="简单")
      {
        difficulty = 0
      }else if(this.difficulty=="一般"){
        difficulty = 1
      }else if(this.difficulty=="困难"){
        difficulty = 2
      }
      getQuestion({number:this.number,category:this.category,type,difficulty}).then(res=>{
       console.log(res)
       this.setQuestions(res)
        
      })
    },
    //答案打乱
    setQuestions(resp) {
      resp.message.forEach(qst => {
        const answers = this.shuffleArray([qst.correct_answer, ...qst.incorrect_answers])
        const question = {
          questionData: qst,
          answers: answers,
          userAnswer: null,
          correct: null,
        }
        this.questions.push(question)
      })
      this.$root.$data.state = this.questions
      this.currentQuestion = this.questions[0]
      this.loading = false
    },
    //提交答案
    onAnswerSubmit(answer) {
      if (this.currentQuestion.questionData.correct_answer === answer) {
        this.currentQuestion.correct = true
      } else {
        this.currentQuestion.correct = false
      }
      this.currentQuestion.userAnswer = answer
      this.nextQuestion()
    },
    //下一题
    nextQuestion() {
      const unansweredQuestions = this.questions.filter(q => !q.userAnswer)
      if (unansweredQuestions.length > 0) {
        this.currentQuestion = unansweredQuestions[0]
      } else {
        this.$router.replace({ name: 'result' })
      }
    }
  }
}
</script>

<style  scoped src='@/assets/css/bootstrap.css'></style>
<style  scoped src='@/assets/css/bootstrap-vue.css'></style>
<style scoped src='@/assets/css/exam.css'></style>