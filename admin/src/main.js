import Vue from 'vue'
import App from './App.vue'
import './plugins/element.js'
import router from './router/index'

import './style.css'

import http from './http'

Vue.config.productionTip = false
Vue.prototype.$http = http

// 混合，在Vue的实例上哪里都能访问
Vue.mixin({
  computed: {
    uploadUrl () {
      return this.$http.defaults.baseURL + '/upload'
    }
  },
  methods: {
    getAuthHeaders () {
      return {
        Authorization: `Bearer ${localStorage.token}||''`
      }
    }
  }
})

new Vue({
  router,
  render: h => h(App)
}).$mount('#app')
