import { createRouter, createWebHistory } from 'vue-router'

function auth(to, from, next) {
  if (!localStorage.getItem('access_token')) {
    return next({ name: 'login' })
  }

  next()
}

function guest(to, from, next) {
  if (localStorage.getItem('access_token')) {
    return next({ name: 'classrooms.index' })
  }

  next()
}

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: import('@/views/HomeView.vue')
    },
    {
      path: '/register',
      name: 'register',
      beforeEnter: guest,
      component: () => import('@/views/Auth/RegisterView.vue')
    },
    {
      path: '/login',
      name: 'login',
      beforeEnter: guest,
      component: () => import('@/views/Auth/LoginView.vue')
    },
    {
      path: '/profile',
      name: 'profile.edit',
      beforeEnter: auth,
      component: () => import('@/views/Profile/EditView.vue')
    },
    {
      path: '/profile/change-password',
      name: 'profile.change-password',
      beforeEnter: auth,
      component: () => import('@/views/Profile/ChangePassword.vue')
    },
    {
      path: '/classrooms',
      name: 'classrooms.index',
      beforeEnter: auth,
      component: () => import('@/views/Classrooms/IndexView.vue')
    },

    {
      path: '/classrooms/create',
      name: 'classrooms.create',
      beforeEnter: auth,
      component: () => import('@/views/Classrooms/CreateView.vue')
    },
    {
      path: '/classrooms/:id/edit',
      name: 'classrooms.edit',
      beforeEnter: auth,
      component: () => import('@/views/Classrooms/EditView.vue')
    },
    {
      path: '/score',
      name: 'score.index',
      beforeEnter: auth,
      component: () => import('@/views/Score/IndexView.vue')
    },
    {
      path: '/score/create',
      name: 'score.create',
      beforeEnter: auth,
      component: () => import('@/views/Score/CreateView.vue')
    }
  ]
})

export default router
