import axios from '@/api/common.js'

// 获取所有商品分类数据
export const getCateList = (type) => {
  return axios({
    url: 'categories',
    params: { type }
  })
}
