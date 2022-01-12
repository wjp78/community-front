import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import './components/modules/antDesign/lazy_antd'
import 'ant-design-vue/dist/antd.less'
import Alert from './components/modules/alert'

Vue.use(Alert)

Vue.config.productionTip = false

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
