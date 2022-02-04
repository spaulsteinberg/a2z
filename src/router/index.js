import { createRouter, createWebHistory } from 'vue-router';
import MainView from '../views/main/MainView.vue';
import AccountView from '../views/profile/AccountView.vue';
import LoginView from '../views/auth/LoginView.vue'
import SignupView from '../views/auth/SignupView.vue'
import ResetPasswordView from '../views/auth/ResetPasswordView.vue'
import NotFound from '../views/NotFound.vue';
import store from '../store/index'

const routes = [
    {
        path: '/',
        component: MainView,
        meta: { requiresAuth: true }
    },
    {
        path: '/explore',
        name: 'Explore',
        component: MainView,
        meta: { requiresAuth: true }
    },
    {
        path: '/profile/account',
        name: 'Account',
        component: AccountView,
        meta: { requiresAuth: true }
    },
    {
        path: '/login',
        name: 'Login',
        component: LoginView,
        meta: { requiresAuth: false }
    },
    {
        path: '/signup',
        name: 'Signup',
        component: SignupView,
        meta: { requiresAuth: false }
    },
    {
        path: '/reset/password',
        name: 'ResetPassword',
        component: ResetPasswordView,
        meta: { requiresAuth: false }
    },
    {
        path: '/:catchAll(.*)',
        name: 'NotFound',
        component: NotFound
    }
]

const router = createRouter({
    routes,
    history: createWebHistory(process.env.BASE_URL)
})

router.beforeEach((to, from, next) => {
    // if a route requires auth check if the user lacks credentials. If so redirect them
    // if a route does not require auth and is the login or signup page with a valid user, redirect to explore
    if (to.matched.some(record => record.meta.requiresAuth)) {
      if (!store.state.user) {
        next({
            path: '/login', query: { redirect: to.fullPath }
        })
      } else { 
        next()
      }
    } else {
      if ((to.name === 'Login' || to.name === 'Signup' || to.name === 'ResetPassword') && store.state.user){
          next({path: '/explore'})
      } else {
          next()
      }
    }
  })

export default router;