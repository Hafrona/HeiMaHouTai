<template>
  <div class="list">
    <!-- 面包屑 -->
    <el-breadcrumb separator-class="el-icon-arrow-right">
      <el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item>
      <el-breadcrumb-item>商品管理</el-breadcrumb-item>
      <el-breadcrumb-item>商品列表</el-breadcrumb-item>
    </el-breadcrumb>
    <!-- 搜索区域 -->
    <div style="margin: 15px 0;">
      <el-input
        v-model="goodsObj.query"
        placeholder="请输入搜索内容"
        class="input-with-select"
        style="width:300px;margin-right:15px"
        @keyup.enter.native='init'
      >
        <el-button slot="append" icon="el-icon-search" @click='init'></el-button>
      </el-input>
      <el-button type="success" @click="addDialogFormVisible = true;$router.push({name: 'Add'})">添加商品</el-button>
    </div>
    <!-- 表格 -->
    <el-table :data="goodsList" border style="width: 100%">
      <el-table-column type="index" width="50"></el-table-column>
      <el-table-column prop="goods_name" label="商品名称" width="580"></el-table-column>
      <el-table-column prop="goods_price" label="商品价格" width="180"></el-table-column>
      <el-table-column prop="goods_state" label="商品状态"></el-table-column>
      <el-table-column prop="goods_weight" label="商品重量"></el-table-column>
      <el-table-column prop="add_time" label="创建时间"></el-table-column>
      <el-table-column label="操作">
        <template slot-scope="scope">
          <el-button size="mini">编辑</el-button>
          <el-button size="mini" type="danger">删除</el-button>
        </template>
      </el-table-column>
    </el-table>
    <!-- 分页结构 -->
    <el-pagination
        style='background:#ddd;margin-top:15px'
      @size-change="handleSizeChange"
      @current-change="handleCurrentChange"
      :current-page="goodsObj.pagenum"
      :page-sizes="[10, 20, 30, 40]"
      :page-size="goodsObj.pagesize"
      layout="total, sizes, prev, pager, next, jumper"
      :total="total">
    </el-pagination>
  </div>
</template>
<script>
import { getAllGoodsList } from '@/api/goods_api.js'
export default {
  data () {
    return {
      total: 0,
      goodsList: [],
      addDialogFormVisible: false,
      goodsObj: {
        query: '',
        pagenum: 1,
        pagesize: 10
      }
    }
  },
  methods: {
    handleSizeChange (val) {
      // val就是用户当前所选择数量
      this.goodsObj.pagesize = val
      this.init()
    },
    handleCurrentChange (val) {
      // val:就是用户当前所点击的页码
      //   单击某个页码，应该去获取这个页码对应页的数据
      this.goodsObj.pagenum = val
      this.init()
    },
    init () {
      getAllGoodsList(this.goodsObj)
        .then(res => {
          console.log(res)
          this.goodsList = res.data.data.goods
          this.total = res.data.data.total
        })
    }
  },
  mounted () {
    this.init()
  }
}
</script>
