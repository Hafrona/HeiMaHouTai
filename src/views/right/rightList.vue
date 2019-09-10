<template>
  <div class="rightlist">
    <!-- 面包屑 -->
    <el-breadcrumb separator-class="el-icon-arrow-right">
      <el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item>
      <el-breadcrumb-item>权限管理</el-breadcrumb-item>
      <el-breadcrumb-item>权限列表</el-breadcrumb-item>
    </el-breadcrumb>
    <!-- 表格数据展示区域 -->
    <el-table :data="rightList" border style="width: 100%">
      <el-table-column type="index" width="50"></el-table-column>
      <el-table-column prop="authName" label="权限名称" width="180"></el-table-column>
      <el-table-column prop="path" label="路径" width="180"></el-table-column>
      <!-- prop中指定只能是数据对象中存在的属性名称 -->
      <!-- <el-table-column
      prop="level"
      label="层级">
      {{level | levelFormat}}
      </el-table-column>-->
      <el-table-column label="层级" width="100">
        <template slot-scope="scope">{{scope.row.level | levelFormat}}</template>
      </el-table-column>
    </el-table>
  </div>
</template>
<script>
import { getAllRightList } from '@/api/right_api.js'
export default {
  data () {
    return {
      rightList: []
    }
  },
  //   通过filters添加当前组件的局部过滤器
  filters: {
    // levelFormat: (level) => {
    //   if (level === '0') {
    //     return '一级'
    //   } else if (level === '1') {
    //     return '二级'
    //   } else if (level === '2') {
    //     return '三级'
    //   }
    // }
    levelFormat (level) {
      if (level === '0') {
        return '一级'
      } else if (level === '1') {
        return '二级'
      } else if (level === '2') {
        return '三级'
      }
    }
  },
  mounted () {
    getAllRightList('list').then(res => {
      console.log(res)
      this.rightList = res.data.data
    })
  }
}
</script>
<style lang="less" scoped>
</style>
