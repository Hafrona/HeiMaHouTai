// 专门处理users用户管理
import axios from '@/api/common.js'

// 实现用户登陆
export const login = (data) => {
  return axios({
    method: 'post',
    url: 'login',
    data
  })
}

// 获取用户列表数据
export const getUserList = (pa) => {
  return axios({
    url: 'users',
    params: pa
  })
}

// 添加用户数据
export const addUser = (data) => {
  return axios({
    url: 'users',
    method: 'post',
    data
  })
}

// 根据用户id删除单个用户
// 增加(post)    删除(delete)    修改(put)   查询(get)
export const delUser = (id) => {
  return axios({
    method: 'delete',
    url: `users/${id}`
  })
}

// 修改用户状态
export const updateUserState = (uid, type) => {
  return axios({
    url: `users/${uid}/state/${type}`,
    method: 'put'
  })
}

// 分配 用户角色
export const grantUserRole = (id, rid) => {
  return axios({
    method: 'put',
    url: `users/${id}/role`,
    data: { rid }
  })
}

// 编辑用户
export const editUser = (data) => {
  return axios({
    url: `users/${data.id}`,
    method: 'put',
    data: { email: data.email, mobile: data.mobile }
  })
}
