<template>
  <div class="goods">
    <!-- 面包屑 -->
    <el-breadcrumb separator-class="el-icon-arrow-right">
      <el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item>
      <el-breadcrumb-item>商品管理</el-breadcrumb-item>
      <el-breadcrumb-item>添加商品</el-breadcrumb-item>
    </el-breadcrumb>
    <!-- 添加步骤条 -->
    <el-steps :active="activeName-0" finish-status="success">
      <el-step title="步骤 1"></el-step>
      <el-step title="步骤 2"></el-step>
      <el-step title="步骤 3"></el-step>
      <el-step title="步骤 4"></el-step>
      <el-step title="步骤 5"></el-step>
    </el-steps>
    <!-- 添加标签页 -->
    <el-form ref="addform" :model="addform" :label-width="'120px'">
      <el-tabs v-model="activeName" tab-position="left" style="margin-top:15px">
        <el-tab-pane label="基本信息" name="0">
          <el-form-item label="商品名称">
            <el-input v-model="addform.goods_name"></el-input>
          </el-form-item>
          <el-form-item label="商品价格">
            <el-input v-model="addform.goods_price"></el-input>
          </el-form-item>
          <el-form-item label="商品重量">
            <el-input v-model="addform.goods_weight"></el-input>
          </el-form-item>
          <el-form-item label="商品数量">
            <el-input v-model="addform.goods_number"></el-input>
          </el-form-item>
          <!-- 添加级联选择器 -->
          <el-form-item label="商品分类">
            <el-cascader
              :options="goodsCateList"
              :props="cascaderProps"
              clearable
              @change="getcate"
              v-model="addform.goods_cat"
            ></el-cascader>
          </el-form-item>
        </el-tab-pane>
        <el-tab-pane label="商品参数" name="1">商品参数</el-tab-pane>
        <el-tab-pane label="商品属性" name="2">商品属性</el-tab-pane>
        <el-tab-pane label="商品图片" name="3">
          <el-upload
            class="upload-demo"
            action="http://localhost:8888/api/private/v1/upload"
            :on-remove="handleRemove"
            :on-success='handleSuccess'
            :before-upload="beforeUpload"
            :headers="gettoken()"
            :file-list="fileList"
            list-type="picture"
          >
            <el-button size="small" type="primary">点击上传</el-button>
            <div slot="tip" class="el-upload__tip">只能上传jpg/png文件，且不超过500kb</div>
          </el-upload>
        </el-tab-pane>
        <el-tab-pane label="商品内容" name="4">
          <quill-editor
            v-model="addform.goods_introduce"
            ref="myQuillEditor"
            :options="editorOption"
            style='height:400px;border-bottom:1px solid #ccc'>
        </quill-editor>
        </el-tab-pane>
      </el-tabs>
      <el-button type="primary" class="btn" @click='addGoods'>添加商品</el-button>
    </el-form>
  </div>
</template>
<script>
import { getCateList } from '@/api/categories_api.js'
import { addGoods } from '@/api/goods_api.js'
import { quillEditor } from 'vue-quill-editor'
import 'quill/dist/quill.core.css'
import 'quill/dist/quill.snow.css'
import 'quill/dist/quill.bubble.css'
export default {
  components: {
    quillEditor
  },
  data () {
    return {
      editorOption: {},
      fileList: [],
      cascaderProps: {
        checkStrictly: true,
        label: 'cat_name',
        value: 'cat_id',
        children: 'children'
      },
      goodsCateList: [],
      activeName: '0',
      addform: {
        goods_name: '',
        goods_weight: '',
        goods_price: '',
        goods_number: '',
        goods_cat: '',
        // 用户图片数据，它是一个数组，里面的每一个值都是对象{pic:path}
        pics: [],
        goods_introduce: '',
        attrs: [],
        goods_state: 1
      }
    }
  },
  methods: {
    // 文件上传之前的钩子
    beforeUpload (file) {
      console.log(file)
      if (file.type.indexOf('image/') === -1) {
        this.$message({
          type: 'warning',
          message: '请选择图片格式的文件'
        })
        return false
      }
    },
    // 添加商品
    addGoods () {
      addGoods(this.addform)
        .then(res => {
          console.log(res)
          if (res.data.meta.status === 201) {
            this.$router.push({ name: 'List' })
          }
        })
    },
    gettoken () {
      var token = localStorage.getItem('heima_manager_token')
      return { Authorization: token }
    },
    // 文件上传成功之后的钩子
    handleSuccess (response, file, fileList) {
      // 将当前成功上传的文件添加到数据对象中
      this.addform.pics.push({ pic: response.data.tmp_path })
    },
    // 移除图片时触发
    handleRemove (file, fileList) {
      if (!file.response) {
        return
      }
      // 查询对应名称的文件对象进行删除
      for (var i = 0; i < this.addform.pics.length; i++) {
        if (this.addform.pics[i].pic === file.response.data.tmp_path) {
          this.addform.pics.splice(i, 1)
        }
      }
    },
    getcate (value) {
      //   获取双向绑定的数据
      this.addform.goods_cat = value.join(',')
    }
  },
  mounted () {
    getCateList(3).then(res => {
      // console.log(res)
      if (res.data.meta.status === 200) {
        this.goodsCateList = res.data.data
      }
    })
  }
}
</script>
<style lang="less" scoped>
.btn {
  float: right;
  margin-top: 20px;
}
</style>
