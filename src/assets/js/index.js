import { observerHover } from './observer'
import { utils } from './utils'

export default {
    install(Vue) {
        Vue.prototype.$utils = utils
        Vue.directive('hover', {
            bind(el, binding) {
                el.classList.add('hidden')
                observerHover.setListener({ el: el, val: binding.value })
            }
        })

        /**
         * 超出隐藏
         * */
        Vue.filter('ellipsis', function(value, len) {
            if (!value) return ''
            if (value.length > len) {
                return value.slice(0, len) + '...'
            }
            return value
        })

    }
}