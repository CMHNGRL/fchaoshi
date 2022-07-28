<template>
  <svg :class="svgClass" :style="styleObj" aria-hidden="true" @click="$emit('click')" v-if="!name.startsWith('el-icon')">
    <use :xlink:href="iconName"></use>
  </svg>
  <i :class="name" @click="$emit('click')" v-else></i>
</template>

<script>
export default{
  props:{
    name:{
      required: true, type: String
    },
    className:{
      type: String 
    },
    rotate:{
      type: Number, default: 0
    },
    size:{ type: [String, Number], default: 24 }
  },
  computed: {
    styleObj () {
    return {
      transform: `rotate(${this.rotate}deg)`,
      fontSize: `${this.size}px`
    }
  },
  svgClass () {
    return ('svg-icon ' + (this.className || '')).trim()
  },
  iconName () {
    return `#icon-${this.name}`
  },
  },
}
</script>

<style lang="scss" scoped>
  .svg-icon {
    width: 1em;
    height: 1em;
    vertical-align: -0.15em;
    fill: currentColor;
    overflow: hidden;
  }
</style>
