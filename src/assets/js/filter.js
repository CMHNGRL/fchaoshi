import Vue from 'vue'
import { formatDate } from 'element-ui/src/utils/date-util'
Vue.filter('dateFormat', value => formatDate(value, 'yyyy-MM-dd'))
Vue.filter('fullDateFormat', value => formatDate(value, 'yyyy-MM-dd HH:mm'))
Vue.filter('urlFormat', value => 'http://localhost:3001' + value)
Vue.filter('livePushFormat', value => 'rtmp://localhost' + value)