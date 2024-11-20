import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'
import $auth from "@/auth";

const routes = [
  {
    path: '/',
    name: 'home',
    component: HomeView
  },
  {
    path: '/login',
    name: 'login',
    component: () => import(/* webpackChunkName: "about" */ '../views/LoginView.vue'),
    meta: {
      redirectIfAuthenticated: true
    }
  },
  {
    path: '/register',
    name: 'register',
    component: () => import(/* webpackChunkName: "about" */ '../views/RegisterView.vue'),
    meta: {
      redirectIfAuthenticated: true
    }
  },
  {
    path: '/confirmation/check/:token',
    name: 'confirmation-check',
    component: () => import(/* webpackChunkName: "about" */ '../views/ConfirmationCheckView.vue')
  },
  {
    path: '/blog/add',
    name: 'add-blog',
    component: () => import(/* webpackChunkName: "about" */ '../views/AddBlogView.vue'),
    meta: {
      requiresAuth: true,
    }
  },
  {
    path: '/blog/:id',
    name: 'blog-inner',
    component: () => import(/* webpackChunkName: "about" */ '../views/BlogView.vue'),
  },
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

router.beforeEach((to, from, next) => {
  const isLoggedIn = $auth.check();
  if (to.name == 'index') {
    if (!isLoggedIn) {
      window.location.href = '/login';
      return;
    }
    return next('/');
  }
  if (to.matched.some(record => record.meta.requiresAuth)) {
    if (!isLoggedIn) {
      window.location.href ='/login';
      return;
    } else {
      next()
    }
  } else if (to.matched.some(record => record.meta.redirectIfAuthenticated)) {
    if (isLoggedIn) {
      next('/')
    } else {
      next()
    }
  } else {
    next()
  }
});

export default router
