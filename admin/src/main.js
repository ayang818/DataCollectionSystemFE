import Vue from 'vue'
import App from './App.vue'
import './plugins/element.js'
import router from './router'
import mavonEditor from "mavon-editor"
import 'mavon-editor/dist/css/index.css'

Vue.config.productionTip = false
Vue.use(mavonEditor)
// const {http} = require("./http");
import http from "./http"
Vue.prototype.$http = http

Vue.mixin({
  methods: {
    getAuthHeaders() {
      return {
        Authorization: "Bear " + (localStorage.token || "")
      }
    }
  },
})

new Vue({
  router,
  render: h => h(App)
}).$mount('#app')
