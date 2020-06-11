// 前端路由模块
import Vue from 'vue'
import VueRouter from 'vue-router'
import Login from '../views/Login.vue'
import Main from '../views/Main.vue'
import CategoryEdit from '../views/CategoryEdit.vue'
import CategoryList from '../views/CategoryList.vue'

import ItemEdit from '../views/ItemEdit.vue'
import ItemList from '../views/ItemList.vue'

import HexoEdit from '../views/HexoEdit.vue'
import HexoList from '../views/HexoList.vue'

import ArticleEdit from '../views/ArticleEdit.vue'
import ArticleList from '../views/ArticleList.vue'

import AdEdit from '../views/AdEdit.vue'
import AdList from '../views/AdList.vue'

import AdminUserEdit from '../views/AdminUserEdit.vue'
import AdminUserList from '../views/AdminUserList.vue'

Vue.use(VueRouter) 

const routes = [

  {
    path:'/login',
    name:'login',
    component:Login,
    meta:{
      isPublic:true
    }
  },
  {
    path: '/',
    name: 'main',
    component: Main,
    children: [
      // 新建分类
      {
        path: '/categories/create',
        component: CategoryEdit
      },
      {
        path: '/categories/List',
        component: CategoryList
      },
      {
        path: '/categories/edit/:id',
        component: CategoryEdit,
        props: true
      },

      // 新建物品
      {
        path: '/items/create',
        component: ItemEdit
      },
      {
        path: '/items/List',
        component: ItemList
      },
      {
        path: '/items/edit/:id',
        component: ItemEdit,
        props: true
      },

      // 新建英雄
      {
        path: '/hexoes/create',
        component: HexoEdit
      },
      {
        path: '/hexoes/List',
        component: HexoList
      },
      {
        path: '/hexoes/edit/:id',
        component: HexoEdit,
        props: true
      },

      // 新建文章
      {
        path: '/articles/create',
        component: ArticleEdit
      },
      {
        path: '/articles/List',
        component: ArticleList
      },
      {
        path: '/articles/edit/:id',
        component: ArticleEdit,
        props: true
      },

      // 新建广告
      {
        path: '/ads/create',
        component: AdEdit
      },

      {
        path: '/ads/list',
        component: AdList
      },

      {
        path: '/ads/edit/:id',
        component: AdEdit,
        props: true
      },

      // 新建管理员
      {
        path: '/admin_users/create',
        component: AdminUserEdit
      },

      {
        path: '/admin_users/list',
        component: AdminUserList
      },

      {
        path: '/admin_users/edit/:id',
        component: AdminUserEdit,
        props: true
      }
    ]
  }
  // {
  //   path: '/about',
  //   name: 'about',
  //   // route level code-splitting
  //   // this generates a separate chunk (about.[hash].js) for this route
  //   // which is lazy-loaded when the route is visited.
  //   component: () => import(/* webpackChunkName: "about" */ '../views/About.vue')
  // }
]

const router = new VueRouter({
  routes:routes
})

// 给路由实例对象添加 导航守卫
// to: Route: 即将要进入的目标 路由对象

// from: Route: 当前导航正要离开的路由

// next: Function: 一定要调用该方法来 resolve 这个钩子。执行效果依赖 next 方法的调用参数。

router.beforeEach((to,from,next)=>{
  if(!to.meta.isPublic && !localStorage.token)
{
                                                      
  return next('/login')
}

next()
  
  })

export default router
