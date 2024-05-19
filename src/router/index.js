import { createRouter, createWebHashHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'
import customers from '../views/customers.vue'
import EditarCustomer from '../components/Customers/EditarCustomer.vue'
import NewCustomer from '../components/Customers/NewCustomer.vue'
import Categories from '../views/categories.vue';
import EditarCategorie from '../components/categories/EditarCategorie.vue';
import NewCategorie from '../components/categories/NewCategorie.vue';

const routes = [
  {
    path: '/',
    name: 'home',
    component: HomeView
  },
  {
    path: '/about',
    name: 'about',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import(/* webpackChunkName: "about" */ '../views/AboutView.vue')
  },

  {path: '/customers',
    name: 'Customers',
    component: customers
  },
  {path: '/editar-customers/:id',
    name: 'EditarCustomer',
    component: EditarCustomer
  },

  {path: '/add-customer/',
  name: 'NewCustomer',
  component: NewCustomer
},
{
  path: '/categories',
  name: 'Categories',
  component: Categories
},
{
  path: '/editar-categorie/:id',
  name: 'EditarCategorie',
  component: EditarCategorie
},
{
  path: '/add-categorie/',
  name: 'NewCategorie',
  component: NewCategorie
},


]

const router = createRouter({
  history: createWebHashHistory(),
  routes
})

export default router
