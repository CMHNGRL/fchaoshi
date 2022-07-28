import Vue from 'vue'
import SvgIcon from './HIcon.vue'

Vue.component('HIcon', SvgIcon)

const content = require.context('./svg', false, /\.svg$/)
content.keys().map(content)
export default content.keys()