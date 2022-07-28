<template>
  <div class="home-page">
  <Header/>
  <LayoutHeader></LayoutHeader>
    <!--介绍功能  -->
    <div class="m-t-50" data-flex="dir:top cross:center">
      <div class="f-24 f-b p-v-20">选择培优课程超市</div>
      <div class="w-100 m-h-100 p-h-100 bx-b" data-flex="main:justify box:mean">
        <div
          v-hover
          data-observer="hover-animate"
          class="m-h-60 p-20"
          data-flex="dir:top cross:center"
        >
          <div class="p-30"><i class="el-icon-s-platform f-50"></i></div>
          <div class="f-18 m-b-10">覆盖面积广</div>
          <div>
            培优课程超市作为线上课程，各个地区只要有网络，即可使用，覆盖面积广
          </div>
        </div>
        <div
          v-hover
          data-observer="hover-animate"
          class="m-h-60 p-20"
          data-flex="dir:top cross:center"
        >
          <div class="p-30"><i class="el-icon-s-promotion f-50"></i></div>
          <div class="f-18 m-b-10">涵盖范围大</div>
          <div>
            培优课程超市主要服务于少儿编程教育，但并不局限于此，各行各业都可以上传自己想上传的视频供大家讨论学习。
          </div>
        </div>
        <div
          v-hover
          data-observer="hover-animate"
          class="m-h-60 p-20"
          data-flex="dir:top cross:center"
        >
          <div class="p-30"><i class="el-icon-share f-50"></i></div>
          <div class="f-18 m-b-10">时间局限性小</div>
          <div>
            培优课程超市是作为全天候上线的网站，任何时间任何地点，只要有网络就可以学习，只要有问题就可以评论。
          </div>
        </div>
      </div>
    </div>

    <!--  介绍  -->
    <div class="m-t-50 bg_lg">
      <div class="f-24 f-b p-v-50 a-c c-white o-9">
        <p>一切不以为了解决学生问题为目标的视频都是耍流氓！</p>
        <p>一站学习，一套课程，一份收获</p>
      </div>
    </div>

    <!--  内容介绍  -->
    <div class="m-t-50" data-flex="dir:top cross:center">
      <div class="f-24 f-b p-v-20">我能学到什么？</div>
      <template>
        <el-row
          v-for="(typeArr, key) in courseType"
          :gutter="80"
          class="w-100 p-h-100"
          :key="key"
        >
          <el-col
            v-for="type in typeArr"
            :md="8"
            :sm="12"
            class="m-t-20"
            :key="type.id"
          >
            <icon-card :value="type"></icon-card>
          </el-col>
        </el-row>
      </template>
    </div>
    <Footer/>
  </div>
</template>

<script>
 import {getCourseAllType} from "@/request/course";
import IconCard from '../components/aboutus/IconCard'
import Footer from '../components/index/Footer.vue'
import Header from '../components/index/Header.vue'
import LayoutHeader from '../components/aboutus/LayoutHeader.vue'
export default {
  name: "AboutUs",
  components:{
    IconCard,
    LayoutHeader,
    Header,
    Footer
  },
  data() {
    return {
      courseType: [],
    };
  },
  methods: {
    //展示课程分类
    getAllType() {
      getCourseAllType().then((res)=>{
        var b = JSON.parse(JSON.stringify(res.message))
        this.courseType = this.$utils.toTwoArray(b, 3)
      })
    },
  },
  beforeMount(){
    this.getAllType();
  },
};
</script>
<style scoped src="../assets/css/base.scss" lang="scss"></style>
<style lang="scss" scoped>
@import "../assets/css/vars.scss";
.home-page {
  .bg_lg {
    background: linear-gradient(135deg, #51cadd, $color-primary);
  }

  .bg_deep {
    background: #efeff4;
  }
}
</style>
