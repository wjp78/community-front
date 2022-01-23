import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import './plugins/lazy_antd'
import 'ant-design-vue/dist/antd.less'
import './assets/font/iconfont.css'

Vue.config.productionTip = false

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
