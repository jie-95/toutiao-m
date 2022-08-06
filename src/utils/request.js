import store from '@/store'
import axios from 'axios'

const request = axios.create({
  baseURL: 'http://toutiao.itheima.net',
  timeout: 30000
})

// 添加请求拦截器
request.interceptors.request.use(
  function (config) {
    const token = store.state.tokenObj.token
    if (token) {
      config.headers.Authorization = 'Bearer ' + token
    }
    // console.log(config)
    return config
  },
  function (error) {
    return Promise.reject(error)
  }
)
// 添加请求拦截器

export default request
