import axios from 'axios'
import { Message } from 'element-ui'
axios.defaults.baseURL = '//blog-server.hunger-valley.com'
axios.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded'
const URL = {
  REGISTER: '/auth/register',
  LOGIN: '/auth/login',
  LOGOUT: '/auth/logout',
  GET_INFO: '/auth',
  GET_LIST: '/blog',
  GET_DETAIL: '/blog/:blogId',
  CREATE: '/blog',
  UPDATE: '/blog/:blogId',
  DELETE: '/blog/:blogId'
}
export default {

  // 封装request请求
  request (url, type = 'GET', data = {}) {
    return new Promise((resolve, reject) => {
      let option = {
        url,
        method: type
      }
      if (type.toLowerCase() === 'get') {
        option.params = data
      } else {
        option.data = data
      }
      if (localStorage.token) {
        axios.defaults.headers.common['Authorization'] = localStorage.token
      }
      axios(option).then(res => {
        if (res.data.status === 'ok') {
          if (res.data.token) {
            localStorage.token = res.data.token
          }
          resolve(res.data)
        } else {
          Message.error(res.data.msg)
          reject(res.data)
        }
      }).catch(
        err => {
          Message.error(err + '网络异常')
          reject(new Error('error'))
        }
      )
    })
  },
  // 封装登录，注册，注销，个人信息接口
  /**
   * 认证相关
   * POST /auth/register 功能: 用户注册
   * POST /auth/login 功能: 用户登录
   * GET /auth/logout 功能: 注销登录
   * GET /auth 获取用户信息
   */
  register ({ username, password }) {
    return this.request(URL.REGISTER, 'POST', { username, password })
  },
  login ({ username, password }) {
    return this.request(URL.LOGIN, 'POST', { username, password })
  },
  logout () {
    return this.request(URL.LOGOUT, 'GET')
  },
  getInfo () {
    return this.request(URL.GET_INFO, 'GET')
  },
  /**
   * 博客相关
   * GET /blog 功能: 获取博客列表
   * page: 页码，不传默认 page 为1。
   * userId: 用户 id，不传则获取全部用户的数据，如果设置则获取某个用户的博客列表
   * (atIndex: 是否展示在首页，传递 true则只得到显示到首页的博客列表，
   * 不传得到全部类型(包括展示到首页和不展示到首页)的博客列表，false得到不展示到首页的列表)
   * 如 /blog?page=2&userId=1 获取属于用户1的第2页博客列表
   *
   * GET /blog/:blogId 功能: 获取id 为 blogId 的博客详情， 如 /blog/1
   *
   * POST /blog 功能: 创建博客
   * title : 博客标题, 博客标题不能为空，且不超过100个字符
   * content : 博客内容, 博客内容不能为空，且不超过10000个字符
   * description: 博客内容简要描述,可为空，如果为空则后台自动从content 中提取
   *
   * PATCH /blog/:blogId 功能: 修改博客 id 为:blogId 的博客
   * title : 博客标题, 可选
   * content : 博客内容, 可选
   * description: 博客内容简要描述, 可选
   * atIndex: true/false， 展示到首页/从首页异常, 可选
   *
   * DELETE /blog/:blogId 功能: 删除博客 id 为:blogId 的博客
   * 提交参数：无
   */
  getBlogs ({ page = 1, userId, atIndex } = { page: 1 }) {
    return this.request(URL.GET_LIST, 'GET', { page, userId, atIndex })
  },
  getIndexBlogs ({ page = 1 } = { page: 1 }) {
    return this.getBlogs({ page, atIndex: true })
  },
  getBlogsByUserId (userId, { page = 1, atIndex } = { page: 1 }) {
    return this.getBlogs({ userId, page, atIndex })
  },
  getDetail ({ blogId }) {
    return this.request(URL.GET_DETAIL.replace(':blogId', blogId))
  },
  updateBlog ({ blogId }, { title, content, description, atIndex }) {
    return this.request(URL.UPDATE.replace(':blogId', blogId), 'PATCH', { title, content, description, atIndex })
  },
  deleteBlog ({ blogId }) {
    return this.request(URL.DELETE.replace(':blogId', blogId), 'DELETE')
  },
  createBlog ({ title = '', content = '', description = '', atIndex = false } = { title: '', content: '', description: '', atIndex: false }) {
    return this.request(URL.CREATE, 'POST', { title, content, description, atIndex })
  }
}
