import Vue from 'vue';
import VueRouter from 'vue-router';
import Form from '@/components/Form';
import Main from '@/components/Main';
import Product from '@/components/Product';
import Cart from '@/components/Cart';
import PrivetRoute from './privet-route';


Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'Main',
    component: Main,
  },
  {
    path: '/product/:id',
    name: 'Product',
    component: Product
  },
  {
    path: '/cart',
    name: 'Cart',
    component: Cart,
    beforeEnter: PrivetRoute
  },
  {
    path: '/form',
    name: 'Form',
    component: Form,
    beforeEnter: PrivetRoute
  
  },
  {
    path: '*',
    redirect:"/"
  }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
