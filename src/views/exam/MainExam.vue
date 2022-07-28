<template>

<div class="bg-light app">
    <Header></Header>
    <div class="d-flex justify-content-center">
      <b-card no-body id="main-card" class="col-sm-12 col-lg-8 px-0">
        <router-view></router-view>
      </b-card>
    </div>
  </div>
  
</template>

<script>
import Header from '@/components/index/Header.vue'

export default {
  name: 'MainExam',
  components: {
    Header
  }
 
}
</script>


<style  scoped src='@/assets/css/bootstrap.css'></style>
<style  scoped src='@/assets/css/bootstrap-vue.css'></style>
<style scoped src='@/assets/css/exam.css'></style>
