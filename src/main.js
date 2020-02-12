import Vue from 'vue'
import App from './App.vue'
import router from './router'
import './plugins/element.js'


// color admin css
import './assets/css/default/style.css'
import './assets/css/default/style-responsive.css'
import './assets/css/default/theme/default.css'
import './assets/css/style.css'

Vue.config.productionTip = false

import axios from  'axios'
Vue.prototype.$http = axios
axios.defaults.baseURL = "http://localhost:8085/mpmsystem/"
axios.interceptors.request.use(config =>{
  window.console.log(config);
  config.headers.Authorization = window.sessionStorage.getItem('token')
  return config
})


new Vue({
  router,
  render: h => h(App)
}).$mount('#app')
