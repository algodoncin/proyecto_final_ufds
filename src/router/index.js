import { createRouter, createWebHistory } from 'vue-router'
import MainDashboardView from '../views/MainDashboardView.vue'
import DashboardHomeView from '../views/DashboardHomeView.vue'
import DashboardProfileView from '../views/DashboardProfileView.vue'
import DashboardConfigView from '../views/DashboardConfigView.vue'
import DashboardSearchView from '../views/DashboardSearchView.vue'
import DashboardCreateView from '../views/DashboardCreateView.vue'

const routes = [
  {
    path: '/',
    redirect: '/dashboard',
  },
  {
    path: '/dashboard',
    name: 'dashboard',
    component: MainDashboardView,
    children: [
      {
        path: '/home',
        name: 'home',
        component: DashboardHomeView
      },
      {
        path: '/profile',
        name: 'profile',
        component: DashboardProfileView
      },
      {
        path: '/configuration',
        name: 'configuration',
        component: DashboardConfigView
      },
      {
        path: '/search',
        name: 'search',
        component: DashboardSearchView
      },
      {
        path: '/create',
        name: 'create',
        component: DashboardCreateView
      },
    ]
  }
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

export default router
