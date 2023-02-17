/*
 * @Description: 路由
 * @Author: 余子怡
 * @Date: 2023-01-20 17:18:20
 * @LastEditTime: 2023-02-17 19:26:49
 */
import Vue from 'vue'
import VueRouter from 'vue-router'
import Login from '../views/Login.vue'
import store from '../store';
import Home from '@/views/Home.vue';


Vue.use(VueRouter)

const routes = [
  {name: 'Home',
  path: '/',
  component: Home,
  redirect: '/orderseat',
  meta: {
    title: '首页',
    id:1
  },
children:[
  {
    path: '/personal',
    name: 'personal',
    component: () => import('@/views/personal/index.vue'),
    meta:{
      id:5,
      title:'个人中心',
      role:0
    }
  },
  {
    path: '/orderseat',
    name: 'orderSeat',
    component: () => import('@/views/orderSeat/order.vue'),
    meta:{
      id:3,
      title:'订座',
      role:0
    }
  },
  {
    path: '/ordermeal',
    name: 'orderMeal',
    component: () => import('@/views/orderMeal/order.vue'),
    meta:{
      id:4,
      title:'订餐',
      role:0
    }
  },
  {
    path: '/borrow',
    name: 'borrow',
    component: () => import('@/views/orderBook/order.vue'),
    meta:{
      id:13,
      title:'二手书',
      role:0
    }
  },
  {
    path: '/user',
    name: 'user',
    component: () => import('@/views/user/index.vue'),
    meta:{
      id:6,
      title:'用户',
      role:1
    }
  },
  {
    path: '/seat',
    name: 'seat',
    component: () => import('@/views/seat/index.vue'),
    meta:{
      id:7,
      title:'座位',
      role:1
    }
  },
  {
    path: '/orderSeat',
    name: 'OrderSeat',
    component: () => import('@/views/orderSeat/index.vue'),
    meta:{
      id:8,
      title:'订座列表',
      role:1
    }
  },
  {
    path: '/food',
    name: 'food',
    component: () => import('@/views/food/index.vue'),
    meta:{
      id:9,
      title:'餐食',
      role:1
    }
  },
  {
    path: '/orderMeal',
    name: 'OrderMeal',
    component: () => import('@/views/orderMeal/index.vue'),
    meta:{
      id:10,
      title:'订餐列表',
      role:1
    }
  },
  {
    path: '/book',
    name: 'book',
    component: () => import('@/views/book/index.vue'),
    meta:{
      id:11,
      title:'二手书',
      role:1
    }
  },{
    path: '/orderBook',
    name: 'OrderBook',
    component: () => import('@/views/orderBook/index.vue'),
    meta:{
      id:12,
      title:'二手书订单',
      role:1
    }
  },
  
]},
  {
    path: '/login',
    name: 'Login',
    component: Login,
    meta:{
      id:2
    }
  },
]

// 将菜单路由存入store仓库
store.dispatch('getMenuRoutes', routes[0].children);

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
