<template>
  <div id="app">
    <keep-alive include="CourseCenter,LiveCenter,HeaderPy">
      <router-view></router-view>
    </keep-alive>
  </div>
</template>

<script>
export default {
  name: "App",
  components: {},
};
</script>

<style>
  #app {
    min-width: 1440px;
  }
  html,
  body {
    min-width: 1440px;
    height: 100%;
  }
  *{
    list-style: none;
    text-decoration: none;
  }
</style>
