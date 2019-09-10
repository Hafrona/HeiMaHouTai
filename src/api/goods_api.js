import axios from '@/api/common.js'

// 获取所有商品列表数据
export const getAllGoodsList = (params) => {
  return axios({
    url: 'goods',
    params
  })
}

// 添加商品信息
export const addGoods = (data) => {
  return axios({
    url: 'goods',
    method: 'post',
    data
  })
}
