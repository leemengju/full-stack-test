import { createRouter, createWebHistory } from 'vue-router'

const routes = [
  {
    path: '/',
    name: 'Home',
    component: () => import('../views/Home.vue')
  },
  {
    path: '/about',
    name: 'About',
    component: () => import('../views/About.vue'),
    children:[
      {
        path: '/about/info',
        name: 'Info',
        component: () => import('../views/Info.vue')
      },
      {
        path: '/about/cv',
        name: 'CV',
        component: () => import('../views/cv.vue')
      }
    ]
  },
  {
    path: '/test',
    name: 'Test',
    component: () => import('../views/Home_test.vue')
  }
]

const router = createRouter({
  history: createWebHistory(),
  routes
})

export default router 