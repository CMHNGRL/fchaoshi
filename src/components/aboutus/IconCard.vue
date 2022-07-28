<!-- 我的课程卡片 -->
<template>
  <el-card shadow="hover" class="a-c" data-flex="cross:center main:center">
    <img v-if="value.pic" :src="ht+value.pic" alt="photo" />
    <hpc-icon name="default" size="120" v-else></hpc-icon>
    <p class="m-t-10 f-18">{{ value.name || "无值" }}</p>
    <p class="m-t-20">{{ (value.decoration || "暂无介绍") | ellipsis(100) }}</p>
  </el-card>
</template>

<script>
export default{
  props:{
    value:{
      type: Object, 
      default: () => ({})
    }
  },
  data() {
    return {
      ht:"http://localhost:3001/"
    }
  },
}
</script>
<style scoped lang='scss' src="../../assets/css/base.scss">
</style>
<style lang="scss" scoped>
  img {
    width: 100%;
    height: 200px;
    object-fit: contain;
  }
  p{
    color: rgba(0,0,0,0.6);
  }
</style>
