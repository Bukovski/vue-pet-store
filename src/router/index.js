import Vue from 'vue';
import VueRouter from 'vue-router';
import Form from '@/components/Form';
import Main from '@/components/Main';
import Product from '@/components/Product';
import EditProduct from '@/components/EditProduct';

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
    component: Product,
    children: [
      {
        path: 'edit',
        name: 'Edit',
        component: EditProduct,
      }
    ]
  },
  {
    path: '/form',
    name: 'Form',
    component: Form,
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
