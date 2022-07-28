<!-- 顶部导航 -->
<template>
  <nav :class="['f-16', 'p-h-20', 'o-8', { 'mint-bgc': bgc }]" data-flex="main:justify">
    <ul class="cp c-white" data-flex="main:left">
      <li v-for="(record, key) in $c.NavTitle" @click="toNavView(record)" class="t-hover" :key="key">{{ record.title }}</li>
    </ul>
  </nav>
</template>

<script>
export default{
  props:{
    bgc:{
      type: Boolean, default: false
    }
  },
  methods: {
    toNavView (record) {
    this.$router.push(record.hash)
  }
  },
}
</script>
<style scoped src="../../assets/css/base.scss" lang="scss"></style>
<style lang="scss" scoped>
  li {
    padding: 1.6rem 2.2rem;
  }
  .mint-bgc {
    background-color: rgba(0, 0, 0, 1);
  }
</style>
