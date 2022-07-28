<!-- 课程详情页面 -->
<template>
  <div>
    <Header></Header>
    <live-detail-card
      :data="cardInfo"
      :courseId="id"
    ></live-detail-card>
    <!-- 底部 -->
    <Footer></Footer>
  </div>
</template>

<script>
import Header from '@/components/index/Header'
import Footer from '@/components/index/Footer'
import LiveDetailCard from '@/components/live/LiveDetailCard'

import {getLiveDetailInfo} from '../../request/live'
export default{
  name:"LiveDetail",
  components:{
    Header,
    Footer,
    LiveDetailCard,
  },
  data(){
    return{
      // 课程卡片内容
      cardInfo : {} ,
      firstDetail : {},
    }
  },
  methods: {
    //根据传递来的id查找
  getCardInfo () {
    const id = this.$route.params.id
    getLiveDetailInfo({id}).then(res=>{
      this.cardInfo = res.message
    })
  },
  },
  computed: {
    id () {
      return this.$route.params.id
  }},
  created() {
    this.getCardInfo()
  }
}

</script>
<style scoped src="../../assets/css/base.scss" lang="scss"></style>
<style lang="scss" scoped>
@media only screen {
  .course-detail-card {
    margin: 2% 15%;
  }
  .course-detail-catalog {
    margin: 3% 15%;
  }
}
</style>
