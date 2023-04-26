import axios from 'axios'

// 与后端约定的响应数据格式
interface ResponseStructure {
  code: number;
  data: any;
  message: string;
}

const instance = axios.create({
  // baseURL: process.env.API_URL, // 设置API的URL
  baseURL: 'http://localhost:8090', // 网关的URL
  timeout: 5000, // 请求超时时间
  headers: {
    'Content-Type': 'application/json', // 设置请求头
  },
  withCredentials: true, // 设置跨域
})

instance.interceptors.response.use(
  response => {
    // 对响应数据做些什么
    const { data } = response as unknown as ResponseStructure
    console.log('axios全局拦截响应数据 data', data)
    if (data.code !== 0) {
      console.error((data.message))
    }
    return data
  },
  error => {
    // 对响应错误做些什么
    return Promise.reject(error)
  }
)

export default instance