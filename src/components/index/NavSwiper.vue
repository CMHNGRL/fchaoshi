<template>
  <div class="carousel">
    <el-carousel
    trigger="click"
    height="400px"
    :interval="3000"
    arrow="always"
    style="width: 100%"
  >
    <el-carousel-item v-for="item in imgList" :key="item.index">
      <img :src="item.src" style="height: 100%; width: 100%" alt="图片丢失了" />
      <span>培优课程超市</span>
    </el-carousel-item>
  </el-carousel>
  </div>
</template>

<script>
export default {
  data() {
    return {
      //轮播图
      imgList: [
        {
          name: "index.png",
          src: "/image/index/index.png",
        },
      ],
    };
  },
};
</script>

<style scoped lang='scss'>
.carousel{
position: relative;
  .el-carousel__item{
    img{
      position: absolute;
      z-index: 0;
    }
    span {
      color: #8dd6f8;
      font-size: 60px;
      font-weight: 900;
      opacity: 0.75;
      line-height: 300px;
      position: absolute;
      left: 50%;
      top: 30%;
      transform: translate(-50%,-50%);
    }
  }
}
  
</style>
