<template>
  <div>
    <b-card-header :class="variant" class="d-flex justify-content-between border-bottom-0">
      <div>{{ questionData.cname }}</div>
      <div class="text-capitalize">{{ }}</div>
    </b-card-header>
    <b-card-body>
      <b-card-text class="font-weight-bold" v-html="questionData.question"></b-card-text>
    </b-card-body>
  </div>
</template>

<script>
export default {
  name: 'QuestionBody',
  props: {
    questionData: {
      required: true,
      type: Object
    },
  },
  data() {
    return {
      variants: { easy: 'custom-success', medium: 'custom-warning', hard: 'custom-danger', default: 'custom-info' },
      variant: 'custom-info',
      type:''
    }
  },
  
  methods: {
    setVariant() {
      switch (this.questionData.difficulty) {
        case 0:
          this.variant = this.variants.easy
          break
        case 1:
          this.variant = this.variants.medium
          break
        case 2:
          this.variant = this.variants.hard
          break
        default:
          this.variant = this.variants.default
          break
      }
    }
  },
  mounted() {
    this.setVariant()
  }
}
</script>

<style scoped src='../../assets/css/bootstrap.css'></style>
<style scoped src='../../assets/css/bootstrap-vue.css'></style>
<style scoped src='../../assets/css/exam.css'></style>