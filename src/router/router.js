import Vue from 'vue'
import VueRouter from 'vue-router'

// 引入路由所对应的组件
// @:src  相当于Src目录
import Login from '@/views/Login.vue'
import Home from '@/views/Home.vue'
import Welcome from '@/views/welcome.vue'
import Users from '@/views/users/index.vue'
import Right from '@/views/right/rightList.vue'
import Role from '@/views/right/roleList.vue'
import Goods from '@/views/goods/goods.vue'
import List from '@/views/goods/list.vue'
import Add from '@/views/goods/add.vue'

Vue.use(VueRouter)

// 创建路由对象
var router = new VueRouter({

  routes: [
    {
      path: '/',
      redirect: { name: 'home' }
    },
    {
      name: 'login',
      path: '/login',
      component: Login
    },
    {
      name: 'home',
      path: '/home',
      component: Home,
      redirect: { path: '/home/wel' },
      // 嵌套路由 》》 对应着Home组件中的router-view
      children: [
        {
          // 嵌套路由不用添加/，否则会破坏嵌套层次结构
          path: 'wel',
          component: Welcome
        },
        {
          name: 'Users',
          path: 'users',
          component: Users
        },
        {
          name: 'Role',
          path: 'roles',
          component: Role
        },
        {
          name: 'Right',
          path: 'rights',
          component: Right
        },
        {
          name: 'Goods',
          path: 'goods',
          component: Goods,
          redirect: { name: 'List' },
          children: [
            {
              name: 'List',
              path: 'lists',
              component: List
            },
            {
              name: 'Add',
              path: 'add',
              component: Add
            }
          ]
        }
      ]
    }
  ]
})

export default router
