// 专门处理role角色管理
import axios from '@/api/common.js'

export const getAllRoleLlist = () => {
  return axios({
    url: 'roles'
  })
}

// 删除指定角色的指定权限
export const delRightByRoleId = (roleId, rightId) => {
  return axios({
    method: 'delete',
    url: `roles/${roleId}/rights/${rightId}`
  })
}

// 为角色分配权限
export const grantRightForRole = (roleId, rids) => {
  return axios({
    url: `roles/${roleId}/rights`,
    method: 'post',
    data: { rids }
  })
}

// 添加角色
export const addrole = (data) => {
  return axios({
    url: `roles`,
    method: 'post',
    data: data
  })
}
