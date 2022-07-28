import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
//初始化样式
import BootstrapVue from 'bootstrap-vue'
import 'normalize.css'
import "@/elementUi"
import 'element-ui/lib/theme-chalk/display.css';
//自定义的组件
import util from '@/assets/js'
//方便使用flex布局
import 'flex.css/dist/data-flex.css'
//动画样式
import "animate.css";
import '@/icons/icon'
//阿里图标
import "@/assets/icon/iconfont.css";
//配置页面的title、content、meta等信息
import MetaInfo from 'vue-meta-info'
import '@/assets/js/filter'

Vue.config.productionTip = false
Vue.use(MetaInfo)
Vue.use(util)
Vue.use(BootstrapVue)

//储存考试问题
const state = { questions: [] }
new Vue({
    data: state,
    router,
    store,
    render: h => h(App),
}).$mount('#app')