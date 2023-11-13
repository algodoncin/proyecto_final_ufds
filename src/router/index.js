import { createRouter, createWebHistory } from 'vue-router'
import LoginView from '../views/LoginView.vue'
import RegisterView from '../views/RegisterView.vue'
import MainDashboardView from '../views/MainDashboardView.vue'
import DashboardHomeView from '../views/DashboardHomeView.vue'
import DashboardConfigView from '../views/DashboardConfigView.vue'
import DashboardSearchView from '../views/DashboardSearchView.vue'
import DashboardEditView from '../views/DashboardEditView.vue'
import DashboardReadView from '../views/DashboardReadView.vue'
import DashboardUserView from '../views/DashboardUserView.vue'

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
        path: '/dashboard/edit/:id',
        name: 'edit',
        component: DashboardEditView
      },
      {
        path: '/dashboard/read/:id',
        name: 'read',
        component: DashboardReadView
      },
      {
        path: '/dashboard/user/:id',
        name: 'user',
        component: DashboardUserView
      },
    ]
  }
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

export default router
