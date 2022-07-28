<!-- 顶部头部分 -->
<template>
  <div class="header" :style="{ height: '600px'}">
    <div
      class="header_bg"
      :style="{ height: '600px' }"
    >
      <div
        class="c-white f-34 o-9 h-100"
        data-flex="main:center cross:center"
        :style="{ height: '400px' }"
      >
        <slot>培优精品课程超市平台</slot>
      </div>
    </div>
  </div>
</template>

<script>
export default {
};
</script>
<style scoped src="../../assets/css/base.scss" lang="scss"></style>
<style lang="scss" scoped>
.header {
  background: url("../../assets/image/aboutus/banner.png") 0% 0% / cover no-repeat
    fixed;
}
.header_bg {
  background: rgba(0, 0, 0, 0.7);
}
</style>
