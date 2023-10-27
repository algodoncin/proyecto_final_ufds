import { createRouter, createWebHistory } from 'vue-router'
import LoginView from '../views/LoginView.vue'
import RegisterView from '../views/RegisterView.vue'
import MainDashboardView from '../views/MainDashboardView.vue'
import DashboardHomeView from '../views/DashboardHomeView.vue'
import DashboardProfileView from '../views/DashboardProfileView.vue'
import DashboardConfigView from '../views/DashboardConfigView.vue'
import DashboardSearchView from '../views/DashboardSearchView.vue'
import DashboardCreateView from '../views/DashboardCreateView.vue'

const routes = [
  {
    path: '/',
    redirect: '/login'
  },
  {
    path: '/login',
    component: LoginView
  },
  {
    path: '/register',
    component: RegisterView
  },
  {
    path: '/dashboard',
    redirect: '/dashboard/home',
  },
  {
    path: '/dashboard',
    name: 'dashboard',
    component: MainDashboardView,
    children: [
      {
        path: '/dashboard/home',
        name: 'home',
        component: DashboardHomeView
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
      },
      {
        path: '/dashboard/create',
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
