// 封装 axios 的请求， 返回重新封装的数据格式
// 对错误的统一处理
import axios from 'axios'
import { notifyError } from '@/utils/public'

class HttpRequest {
  constructor(baseUrl) {
    this.baseUrl = baseUrl
  }

  // 获取axios配置
  getInsideConfig() {
    const config = {
      baseURL: this.baseUrl,
      headers: {
        'Content-Type': 'application/json;charset=utf-8'
      },
      timeout: 10000
    }
    return config
  }

  // 设定拦截器
  interceptors(instance) {
    // 请求拦截器
    instance.interceptors.request.use((config) => {
      // Do something before request is sent
      return config
    }, (err) => {
      // Do something with request error
      return Promise.reject(err)
    })

    // 设置请求成功后的拦截器
    const errorHandler = (status, msg) => {
      switch (status) {
        case 400:
          notifyError('请求语法有问题,服务器无法识别')
          break
        case 401:
          notifyError('客户端未授权该请求。缺乏有效的身份认证凭证')
          break
        case 403:
          notifyError('服务器拒绝响应。权限不足')
          break
        case 404:
          notifyError('URL无效或者URL有效但是没有资源')
          break
        case 500:
          notifyError(msg.msg)
          break
        default:
          notifyError(msg)
          break
      }
    }
    // 响应请求的拦截器
    instance.interceptors.response.use(res => {
      // Any status code that lie within the range of 2xx cause this function to trigger
      // Do something with response data
      if (res.status === 200) {
        return Promise.resolve(res.data)
      } else {
        return Promise.reject(res)
      }
    }, (err) => {
      const { response } = err
      // Any status codes that falls outside the range of 2xx cause this function to trigger
      // Do something with response error
      if (response) {
        errorHandler(response.status, response.data)
        return Promise.reject(err)
      } else {
        notifyError('服务器异常, 请联系技术人员!')
      }
    })
  }

  // 创建实例
  request(options) {
    const instance = axios.create()
    const newOptions = Object.assign(this.getInsideConfig(), options)
    this.interceptors(instance)
    return instance(newOptions)
  }

  get(url, config) {
    const options = Object.assign({
      method: 'get',
      url: url
    }, config)
    return this.request(options)
  }

  post(url, data) {
    return this.request({
      method: 'post',
      url: url,
      data: data
    })
  }
}

export default HttpRequest
