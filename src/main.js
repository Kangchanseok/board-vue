// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import { BootstrapVue, IconsPlugin} from 'bootstrap-vue'
import App from './App'
import router from './router'
import store from "./store";
import naver from 'vue-naver-maps'
import axios from 'axios'


import 'bootstrap/dist/css/bootstrap.css'
import 'bootstrap-vue/dist/bootstrap-vue.css'


Vue.config.productionTip = false
const BACKEND_PORT = process.env.BACKEND_PORT 
const BACKEND_DOMAIN = process.env.BACKEND_DOMAIN 
axios.defaults.baseURL = `ec2-13-125-140-17.ap-northeast-2.compute.amazonaws.com:8080`


Vue.config.productionTip = false

Vue.use(BootstrapVue)
Vue.use(IconsPlugin)
Vue.use(naver, {
  clientID: '30u79ppnoj', // client
  key: 'JyC4UGuMcUZrG4iWOYWyV9WfS9dZM8izou4Ki452',
  useGovAPI: false, // 공공클라우드 API
  subModules: '' // 서브 모듈 
})

/* eslint-disable no-new */
new Vue({
  el: '#app',
  store,
  router,
  components: { App },
  template: '<App/>'
})
