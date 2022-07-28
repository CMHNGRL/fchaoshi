<template>
  <div class="info">
    <CoursePlayMain />
    <Footer />
  </div>
</template>

<script>
import CoursePlayMain from '@/components/course/CoursePlayMain.vue'
import Footer from '@/components/index/Footer.vue'
export default ({
  name:'CoursePlay',
  data (){
    return {}
  },
  components:{
    CoursePlayMain,
    Footer
  }
})
</script>
