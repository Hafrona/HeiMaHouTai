<template>
  <div class="rolelist">
    <!-- 面包屑 -->
    <el-breadcrumb separator-class="el-icon-arrow-right">
      <el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item>
      <el-breadcrumb-item>权限管理</el-breadcrumb-item>
      <el-breadcrumb-item>角色列表</el-breadcrumb-item>
    </el-breadcrumb>
    <el-button type="success" @click="adddialogFormVisible = true">添加角色</el-button>
    <!-- 展开行功能的表格 -->
    <el-table :data="roleList" style="width: 100%;margin-top:15px" border>
      <el-table-column type="expand">
        <template slot-scope="scope">
          <el-row
            v-for="first in scope.row.children"
            :key="first.id"
            style="margin-bottom:10px;border-bottom:1px #ccc dashed"
          >
            <el-col :span="4">
              <el-tag
                closable
                type="success"
                @close="delRight(scope.row,first.id)"
              >{{first.authName}}</el-tag>
            </el-col>
            <el-col :span="20">
              <el-row v-for="second in first.children" :key="second.id" style="margin-bottom:6px">
                <el-col :span="4">
                  <el-tag
                    closable
                    type="warning"
                    @close="delRight(scope.row,second.id)"
                  >{{second.authName}}</el-tag>
                </el-col>
                <el-col :span="20">
                  <el-tag
                    closable
                    type="info"
                    v-for="third in second.children"
                    :key="third.id"
                    style="margin-right:4px;margin-bottom:6px"
                    @close="delRight(scope.row,third.id)"
                  >{{third.authName}}</el-tag>
                </el-col>
              </el-row>
            </el-col>
          </el-row>
          <el-row>
            <el-col :span="24" v-show="scope.row.children.length === 0">没有任何的权限，请先去分配</el-col>
          </el-row>
        </template>
      </el-table-column>
      <el-table-column type="index" width="50"></el-table-column>
      <el-table-column label="角色名称" prop="roleName"></el-table-column>
      <el-table-column label="描述" prop="roleDesc"></el-table-column>
      <el-table-column label="操作">
        <template slot-scope="scope">
          <el-tooltip class="item" effect="dark" content="编辑" placement="top">
            <el-button type="primary" icon="el-icon-edit"></el-button>
          </el-tooltip>
          <el-tooltip class="item" effect="dark" content="分配权限" placement="top">
            <el-button type="primary" icon="el-icon-share" @click="showGrantDialog(scope.row)"></el-button>
          </el-tooltip>
          <el-tooltip class="item" effect="dark" content="删除" placement="top">
            <el-button type="primary" icon="el-icon-delete"></el-button>
          </el-tooltip>
        </template>
      </el-table-column>
    </el-table>
    <!-- 添加分配权限对话框 -->
    <el-dialog title="授权角色" :visible.sync="grantdialogFormVisible">
      <el-tree
         ref='mytree'
        :data="rightList"
        show-checkbox
        node-key="id"
        :default-expand-all="true"
        :default-checked-keys="checkedArr"
        :props="defaultProps"
      ></el-tree>
      <div slot="footer" class="dialog-footer">
        <el-button @click="grantdialogFormVisible = false">取 消</el-button>
        <el-button type="primary" @click='grantRightSubmit'>确 定</el-button>
      </div>
    </el-dialog>
    <!-- 添加角色对话框 -->
    <el-dialog title="添加角色" :visible.sync="adddialogFormVisible">
  <el-form :model="addform"  :label-width="'120px'">
    <el-form-item label="角色名称">
      <el-input v-model="addform.roleName" auto-complete="off"></el-input>
    </el-form-item>
    <el-form-item label="角色描述">
      <el-input v-model="addform.roleDesc" auto-complete="off"></el-input>
    </el-form-item>
  </el-form>
  <div slot="footer" class="dialog-footer">
    <el-button @click="adddialogFormVisible = false">取 消</el-button>
    <el-button type="primary" @click='addrole'>确 定</el-button>
  </div>
</el-dialog>
  </div>
</template>
<script>
import { getAllRoleLlist, delRightByRoleId, grantRightForRole, addrole } from '@/api/role_api.js'
import { getAllRightList } from '@/api/right_api.js'
export default {
  data () {
    return {
      adddialogFormVisible: false,
      addform: {
        roleName: '',
        roleDesc: ''
      },
      roleId: '',
      // 应该默认被选中的节点的id数组
      checkedArr: [],
      rightList: [],
      defaultProps: {
        children: 'children',
        label: 'authName'
      },
      grantdialogFormVisible: false,
      roleList: []
    }
  },
  methods: {
    // 添加角色
    addrole () {
      addrole(this.addform)
        .then(res => {
          console.log(res)
          if (res.data.meta.status === 201) {
            this.$message({
              type: 'success',
              message: res.data.meta.msg
            })
            this.adddialogFormVisible = false
            this.init()
          }
        })
    },
    //   为角色授权
    grantRightSubmit () {
    //   var arr = this.$refs.mytree.getCheckedKeys()
      var arr = this.$refs.mytree.getCheckedNodes()
      //  [{id:109,pid:'107,102},{id:154,pid:'107,102}]
      console.log(arr)
      // 遍历，拼接
      // var temp = []
      // for (var i = 0; i < arr.length; i++) {
      //   temp.push(arr[i].id + ',' + arr[i].pid)
      // }
      // map:可以将回调函数中的函数体执行的结果存储到内部所创建的临时数组中，将数组返回
      var temp = arr.map((value, index) => {
        return value.id + ',' + value.pid
      })
      //   ['109,107,102', '154,107,102']
      console.log(temp)
      //   将temp转换为字符串
      var str = temp.join(',')
      //   '109,107,102,154,107,102'
      console.log(str)
      //   去重：只有数组可以去重
      var arr2 = str.split(',')
      //   [109,107,102, 154,107,102]
      console.log(arr2)
      //   new Set:数组去重 new Set:{109,107,102,154}
      var finalArr = [...new Set(arr2)]
      //   ...可以将对象的成员展开为一个一个值 [109,107,102,154]
      console.log(finalArr)

      grantRightForRole(this.roleId, finalArr.join(','))
        .then(res => {
          if (res.data.meta.status === 200) {
            this.$message({
              type: 'success',
              message: res.data.meta.msg
            })
            this.grantdialogFormVisible = false
            this.init()
          }
        })
    },
    //   展示角色授权对话框
    showGrantDialog (row) {
      this.grantdialogFormVisible = true
      //   存储当前角色id
      this.roleId = row.id
      //   获取树形组件的展示数据源
      getAllRightList('tree').then(res => {
        this.rightList = res.data.data
      })
      // 获取这个角色所有对应的三级权限id
      // 每次遍历前将之前可能的权限id清空
      this.checkedArr.length = 0
      row.children.forEach((first, index) => {
        if (first.children && first.children.length > 0) {
          // 遍历二级权限
          first.children.forEach(second => {
            if (second.children && second.children.length > 0) {
              // 遍历三级权限
              second.children.forEach(third => {
                this.checkedArr.push(third.id)
              })
            }
          })
        }
      })
    },
    // 删除指定角色的指定权限
    // 如果是删除三级权限，那么仅仅删除三级权限，如果删除二级权限，那么也会删除对应的三级权限，如果删除一级权限也会删除对应的二级权限
    delRight (row, rightId) {
      delRightByRoleId(row.id, rightId).then(res => {
        console.log(res)
        if (res.data.meta.status === 200) {
          this.$message({
            type: 'success',
            message: res.data.meta.msg
          })
          // 重置当前展开行数据的数据源数组
          row.children = res.data.data
        }
      })
    },
    init () {
      getAllRoleLlist()
        .then(res => {
          console.log(res)
          if (res.data.meta.status === 200) {
            this.roleList = res.data.data
          }
        })
        .catch(err => {
          console.log(err)
        })
    }
  },
  mounted () {
    this.init()
  }
}
</script>
<style lang="less" scoped>
</style>
