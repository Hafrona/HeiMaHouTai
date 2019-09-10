// 专门处理right权限管理
import axios from '@/api/common.js'

// 获取所有权限数据
export const getAllRightList = (type) => {
  return axios({
    url: `rights/${type}`
  })
}

// 获取左侧菜单列表
// 不用传参是因为：它会根据当前登陆用户去获取相应的信息
export const getLeftMenuList = () => {
  return axios({
    url: `menus`
  })
}
