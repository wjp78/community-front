import AlertComponent from './Alert.vue'

const Alert = {}

Alert.install = (Vue) => {
  const AlertConstructor = Vue.extend(AlertComponent) // 组件绑定到全局Vue实例
  const instance = new AlertConstructor() // 实例化
  instance.$mount(document.createElement('div'))
  document.body.appendChild(instance.$el) // 动态的添加到最后面

  // 4. 添加实例方法
  Vue.prototype.$alert = (msg) => {
    // 逻辑...
    instance.type = 'alert'
    instance.msg = msg
    instance.isShow = true
  }

  Vue.prototype.$confirm = (msg, success, cancel) => {
    // 逻辑...
    instance.type = 'confirm'
    instance.msg = msg
    instance.isShow = true
    if (typeof success !== 'undefined') {
      instance.success = success
    }
    if (typeof cancel !== 'undefined') {
      instance.cancel = cancel
    }
  }
}

export default Alert
