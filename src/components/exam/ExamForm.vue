<template>
  <div>
    <LoadingIcon v-if="loading"></LoadingIcon>
    <div v-else>
      <b-form @submit="onSubmit">
        <b-form-group 
          id="input-group-number-of-questions"
          label="请输入答题数"
          label-for="input-number-of-questions"
          class="text-left"
          
        >
          <b-form-input
            style="margin-top:10px"
            id="input-number-of-questions"
            v-model="form.number"
            type="number"
            :min="minQuestions"
            :max="maxQuestions"
            required 
            :placeholder="` ${minQuestions} 到 ${maxQuestions}题之间`"
          ></b-form-input>
        </b-form-group>

        <b-form-group id="input-group-category">
          <b-form-select
            id="input-category"
            v-model="form.category"
            :options="categories"
          ></b-form-select>
        </b-form-group>

        <b-form-group id="input-group-difficulty">
          <b-form-select
            id="input-difficulty"
            v-model="form.difficulty"
            :options="difficulties"
          ></b-form-select>
        </b-form-group>

        <b-form-group id="input-group-type">
          <b-form-select
            id="input-type"
            v-model="form.type"
            :options="types"
          ></b-form-select>
        </b-form-group>

        <b-button type="submit" class="custom-success">Submit</b-button>
      </b-form>
    </div>
  </div>
</template>

<script>
import LoadingIcon from './LoadingIcon'
import {getCourseAllType} from '@/request/course'

export default {
  components: {
    LoadingIcon
  },
  data() {
    return {
      form: {
        number: '',
        category: '',
        difficulty: '',
        type: ''
      },
      categories: [{ text: '分类', value: '' }],
      difficulties: [{ text: '难度', value: '' }, '简单', '一般', '困难'],
      types: [
        { text: '类型', value: '' }, 
        { text: '选择题', value: 'multiple' }, 
        { text: '判断题', value: 'boolean'}
      ],
      minQuestions: 10,
      maxQuestions: 20,
      loading: true
    }
  },
  created() {
    this.fetchCategories()
  },
  methods: {
    //获取科目类型
    fetchCategories() {
      getCourseAllType().then(res=>{
        console.log(res.message[0].name)
        res.message.forEach(category=>{
          this.categories.push({text:category.name,value:category.name})
        })
        this.loading = false;
      })
    },
    onSubmit(evt) {
      evt.preventDefault()
      this.$emit('form-submitted', this.form)
    }
  }
}
</script>

<style  scoped src='../../assets/css/bootstrap.css'></style>
<style  scoped src='../../assets/css/bootstrap-vue.css'></style>
<style scoped src='../../assets/css/exam.css'></style>