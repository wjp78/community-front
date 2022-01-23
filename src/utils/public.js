import Vue from 'vue'
import { notification } from 'ant-design-vue'
/**
 * 成功提示
 * @param {(string)} message
 * @param {(string)} title
 */
export const notifySuccess = function (message, title, duration) {
  notification.success({
    message: title || '成功',
    description: message || '操作成功',
    duration: duration || 3
  })
}

/**
 * 警告提示
 * @param {(string)} message
 * @param {(string)} title
 */
export const notifyWarning = function (message, title, duration) {
  notification.warning({
    message: title || '警告',
    description: message || 'warning',
    duration: duration || 5
  })
}
/**
 * 错误提示
 * @param {(string)} message
 * @param {(string)} title
 */
export const notifyError = function (message, title, duration) {
  notification.error({
    message: title || '错误',
    description: message || 'Error',
    duration: duration || 3
  })
}
Vue.prototype.notifyError = notifyError
Vue.prototype.notifyWarning = notifyWarning
Vue.prototype.notifySuccess = notifySuccess
