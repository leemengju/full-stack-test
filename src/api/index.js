import axios from 'axios'

const api = axios.create({
  baseURL: 'http://localhost:3000',
  timeout: 5000
})

// 请求拦截器
api.interceptors.request.use(
  config => {
    // 在发送请求之前做些什么
    return config
  },
  error => {
    // 对请求错误做些什么
    return Promise.reject(error)
  }
)

// 响应拦截器
api.interceptors.response.use(
  response => {
    // 对响应数据做点什么
    return response.data
  },
  error => {
    // 对响应错误做点什么
    return Promise.reject(error)
  }
)

export const postApi = {
  // 获取所有文章
  getAllPosts() {
    return api.get('/posts')
  },
  // 获取单个文章
  getPost(id) {
    return api.get(`/posts/${id}`)
  },
  // 创建文章
  createPost(data) {
    return api.post('/posts', data)
  },
  // 更新文章
  updatePost(id, data) {
    return api.put(`/posts/${id}`, data)
  },
  // 删除文章
  deletePost(id) {
    return api.delete(`/posts/${id}`)
  }
}

export default api 