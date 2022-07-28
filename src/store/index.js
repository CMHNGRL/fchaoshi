import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

const store = new Vuex.Store({
    state: {
        //用户信息
        userinfo: ""
    },
    getters: {},
    actions: {
        //保存用户信息
        saveUserInfo({ commit }, payload) {
            commit('SAVE_USER_INFO', payload)
        },
    },
    mutations: {
        //保存用户信息
        SAVE_USER_INFO(state, payload) {
            state.userinfo = payload
        }
    }
})

export default store