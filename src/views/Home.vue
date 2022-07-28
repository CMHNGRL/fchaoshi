<template>
  <div class="home">
     <Header></Header>
     <NavSwiper></NavSwiper>
    <NewGood></NewGood>
    <NewLive></NewLive>
    <Footer></Footer> 
  </div>
</template>

<script>
  import Header from '@/components/index/Header'
  import NavSwiper from '@/components/index/NavSwiper'
  import NewGood from "@/components/index/NewGood";
  import NewLive from "@/components/index/NewLive";
  import Footer from "@/components/index/Footer";
  export default {
    name:"HomePy",
    metaInfo: {
      title: '培优课程超市', // set a title
      meta: [{                 // set meta
        name: '关键字,少儿编程教育，编程',
        content: '描述信息'
      }]
    },
    components:{
      Header,
      NewGood,
      NewLive,
      Footer,
      NavSwiper
    }

  }
</script>
