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

Vue.mixin({
  methods: {
    async getUserInfo() {
      const res = await this.$http.get("api/user");
      // this.$set(this.auth, "username", res.data.studentName);
      this.$set(this.auth, "type", res.data.type);
      this.auth = res.data;
    },
    parseDate(datetime) {
      return new Date((datetime)).toLocaleString().replace(new RegExp('/','g'),"-")
    }
  },
})

new Vue({
  router,
  render: h => h(App)
}).$mount('#app')
