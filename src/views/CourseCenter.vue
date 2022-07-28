<template>
  <div class="course">
     <Header></Header>
      <course-main></course-main>
      <Footer></Footer>
  </div>
</template>

<script>
import Header from '@/components/index/Header'
import CourseMain from "@/components/coursecenter/Coursemain";
import Footer from "@/components/index/Footer";
export default {
  name: "CourseCenter",
  components:{
    Header,
    CourseMain,
    Footer
  }
}
</script>

