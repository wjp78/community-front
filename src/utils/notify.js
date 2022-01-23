import Vue from 'vue'

import {
  notification
} from 'ant-design-vue'

Vue.use(notification)

export const notifySuccess = (message, description, duration) => {
  notification.success({
    message: message,
    description: description,
    duration: duration || 3
  })
}
export const notifyInfo = (message, description, duration) => {
  notification.info({
    message: message,
    description: description,
    duration: duration || 3
  })
}
export const notifyWarning = (message, description, duration) => {
  notification.warning({
    message: message,
    description: description,
    duration: duration || 3
  })
}
export const notifyError = (message, description, duration) => {
  notification.error({
    message: message,
    description: description,
    duration: duration || 3
  })
}
