<template>
  <div class="course">
     <Header></Header>
      <live-main></live-main>
      <Footer></Footer>
  </div>
</template>

<script>
import Header from '@/components/index/Header'
import LiveMain from "@/components/livecenter/Livemain";
import Footer from "@/components/index/Footer";
export default {
  name: "LiveCenter",
  components:{
    Header,
    LiveMain,
    Footer
  }
}
</script>

