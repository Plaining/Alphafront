// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import iView from 'iview'
import 'iview/dist/styles/iview.css'
import axios from 'axios'
import QS from 'qs'
import {get, post} from "./components/https"

Vue.prototype.qs = QS
Vue.config.productionTip = false
Vue.prototype.$axios = axios
Vue.use(iView)
Vue.prototype.$http = {
	get,post
}

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  components: { App },
  template: '<App/>',
  mounted(){
  	window.vue = this;
  }
})