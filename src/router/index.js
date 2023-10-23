import { createRouter, createWebHistory } from 'vue-router'
import DashboardHomeView from '../views/DashboardHomeView.vue'
import DashboardProfileView from '../views/DashboardProfileView.vue'
import DashboardConfigView from '../views/DashboardConfigView.vue'
import DashboardSearchView from '../views/DashboardSearchView.vue'

const routes = [
  {
    path: '/',
    redirect: '/dashboard',
  },
  {
    path: '/dashboard',
    name: 'dashboard',
    component: DashboardHomeView,
  },
  {
    path: '/dashboard/profile',
    name: 'profile',
    component: DashboardProfileView
  },
  {
    path: '/dashboard/configuration',
    name: 'configuration',
    component: DashboardConfigView
  },
  {
    path: '/dashboard/search',
    name: 'search',
    component: DashboardSearchView
  }
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

export default router
