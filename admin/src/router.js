import Vue from 'vue'
import Router from 'vue-router'
import Home from './views/Home.vue'
import AdminLogin from './views/AdminLogin.vue'
import First from './components/admin/First.vue'
import Category from './components/adminproductcategory/Category.vue'
import User from './components/admin/User.vue'

import Order from './components/adminorder/Order.vue'
import NewProduct from './components/adminproduct/NewProduct.vue'
import SearchProduct from './components/adminproduct/SearchProduct.vue'

Vue.use(Router)

export default new Router({
  mode: 'history',
  base: process.env.BASE_URL,
  routes: [
    {
      path: '/home',
      name: 'home',
      component: Home,
      children:[
        {
          path:'/home/first',
          name:'first',
          component:First

        },{
          path:'/home/category',
          name:'category',
          component:Category

        },{
          path:'/home/user',
          name:'user',
          component:User
        }
        ,
        {
          path:'/home/order',
          name:'order',
          component:Order
        },
        {
          path:'/home/newproduct',
          name:'newproduct',
          component:NewProduct
        },
       
        ,
        {
          path:'/home/searchproduct',
          name:'searchproduct',
          component: SearchProduct
        },
      ]
    },
    {
      path: '/about',
      name: 'about',
      // route level code-splitting
      // this generates a separate chunk (about.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      component: () => import(/* webpackChunkName: "about" */ './views/About.vue')
    },
    {
      path: '/',
      name: 'adminlogin',
      component: AdminLogin

    }
  ]
})
