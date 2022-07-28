<template>
<div>
  <b-card-header class="custom-info text-white font-weight-bold">新试卷</b-card-header>
  <b-card-body class="h-150">
   <ExamForm @form-submitted="handleFormSubmitted"></ExamForm>
  </b-card-body>
</div>
</template>

<script>
import ExamForm from '../../components/exam/ExamForm'

export default {
  name: 'MainMenu',
  components: {
     ExamForm
  },
  methods: {
    //子传父
    handleFormSubmitted(formData) {
      const query = formData
      this.$router.push({ name: 'quiz', query: query })
    }
  }
}
</script>


<style  scoped src='@/assets/css/bootstrap.css'></style>
<style  scoped src='@/assets/css/bootstrap-vue.css'></style>
<style scoped src='@/assets/css/exam.css'></style>
