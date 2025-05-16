import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: HomeView,
      meta: {
        title: '首页'
      }
    },
    {
      path: '/screener',
      name: 'screener',
      component: () => import('../views/screenerView/index.vue'),
      meta: {
        title: 'Screener'
      }
    },
    {
      path: '/etfs',
      name: 'etfs',
      component: () => import('../views/etfsView/index.vue'),
      meta: {
        title: 'ETFs'
      }
    },
    {
      path: '/tool',
      name: 'tool',
      component: () => import('../views/toolView/index.vue'),
      meta: {
        title: 'Tool'
      }
    },
    {
      path: '/issuers',
      name: 'issuers',
      component: () => import('../views/issuersView/index.vue'),
      meta: {
        title: 'Issuers'
      }
    },
    {
      path: '/etfs-list',
      name: 'etfs-list',
      component: () => import('../views/etfsListView/index.vue'),
      meta: {
        title: 'ETFs List'
      }
    },
    {
      path: '/exposure',
      name: 'exposure',
      component: () => import('../views/toolView/Exposure.vue'),
    },
    {
      path: '/equities',
      name: 'equities',
      component: () => import('../views/toolView/Equities.vue'),
    },
    {
      path: '/proshares',
      name: 'proshares',
      component: () => import('../views/issuersView/proshares.vue'),
    },
  ],
})

export default router
