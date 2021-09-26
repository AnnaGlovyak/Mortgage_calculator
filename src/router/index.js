import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../views/Home.vue'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'Your banks',
    component: Home
  },
  {
    path: '/mortgage',
    name: 'Mortgage calculator',
    component: () => import('../views/MortgageCalculator.vue')
  }
]

const router = new VueRouter({
  routes
})

export default router
