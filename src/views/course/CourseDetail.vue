<!-- 课程详情页面 -->
<template>
  <div>
    <Header></Header>
    <course-detail-card
      :data="cardInfo"
      :courseId="id"
    ></course-detail-card>

    <!-- 课程目录 -->
    <div class="course-detail-catalog m-t-20">
      <course-detail-catalog
        :id="id"
        :courseDetail="cardInfo"
        @firstData="getFirstCatalog"
      ></course-detail-catalog>
    </div>

    <!-- 底部 -->
    <Footer></Footer>
  </div>
</template>

<script>
import Header from '@/components/index/Header'
import Footer from '@/components/index/Footer'
import CourseDetailCard from '@/components/course/CourseDetailCard'
import CourseDetailCatalog from '@/components/course/CourseDetailCatalog'

import {getCouresDetailInfo} from '../../request/course'
export default{
  components:{
    Header,
    Footer,
    CourseDetailCard,
    CourseDetailCatalog
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
    getCouresDetailInfo({id}).then(res=>{
      this.cardInfo = res.message
    })
  },
   getFirstCatalog (val) {
    if (val.length > 0) {
      this.firstDetail = val[0]
    }
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
