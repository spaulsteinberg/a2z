import { createRouter, createWebHistory } from 'vue-router';
import { 
    MainView,
    HomeView, 
    AccountView, 
    LoginView, 
    SignupView, 
    UpdateEmailView, 
    ResetPasswordView, 
    ChangePasswordView, 
    TicketView,
    RequestView,
    NotFound 
} from "../views"
import store from '../store/index'

const routes = [
    {
        path: '/',
        name: 'Home',
        component: HomeView,
    },
    {
        path: '/explore',
        name: 'Explore',
        component: MainView,
        meta: { requiresAuth: true }
    },
    {
        path: '/tickets/view',
        name: 'Ticket',
        component: TicketView,
        meta: { requiresAuth: true }
    },
    {
        path: '/profile/account',
        name: 'Account',
        component: AccountView,
        meta: { requiresAuth: true }
    },
    {
        path: '/profile/account/update/email',
        name: 'UpdateEmail',
        component: UpdateEmailView,
        meta: { requiresAuth: true }
    },
    {
        path: '/profile/account/change/password',
        name: 'ChangePassword',
        component: ChangePasswordView,
        meta: { requiresAuth: true }
    },
    {
        path: '/requests',
        name: 'RequestHistory',
        component: RequestView,
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
      if (!store.getters['auth/getUser']) {
        next({
            path: '/login', query: { redirect: to.fullPath }
        })
      } else { 
        next()
      }
    } else {
      if ((to.name === 'Login' || to.name === 'Signup' || to.name === 'ResetPassword') && store.getters['auth/getUser']){
          next({path: '/explore'})
      } else {
          next()
      }
    }
  })

export default router;