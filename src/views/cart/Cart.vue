<template>
  <div>
    <Header></Header>
    <Layout></Layout>
    <Footer></Footer>
  </div>
</template>

<script>
import Layout from "@/components/cart/Layout";
import Header from '@/components/index/Header'
import Footer from "@/components/index/Footer";
export default {
  name:'CartC',
  components:{
    Header,
    Footer,
    Layout
  },
  metaInfo: {
    title: '购物车',
  }
}
</script>
