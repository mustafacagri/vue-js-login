import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../views/Home.vue'
import store from '../store/index.js'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home
  },
  {path: '/forget', name: 'Forget', component: () => import('../views/Forget.vue')},
  {path: '/signup', name: 'Signup', component: () => import('../views/Signup.vue')},
  {path: '/logout', name: 'Logout', component: () => import('../views/Logout.vue')},
  {path: '/profile', name: 'Profile', component: () => import('../views/User/Profile.vue'), meta: { requiresLogin: true }},
  {path: '/change-password', name: 'ChangePassword', component: () => import('../views/User/ChangePassword.vue'), meta: { requiresLogin: true }}
  
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

  router.beforeEach((to, from, next) => {
    if (to.matched.some(record => record.meta.requiresLogin) && store.getters.isAuthenticated == false) {
        // console.log("access to the page is denied")
        store.dispatch("setUser", null)
        store.state.user = null
        window.location.href = "/"  // Since there may be a critical error, we leave the SPA logic and change the page by refreshing it.  ==> router.push("/")
    } else {
        // console.log("access to the page is approved")
        next()
    }
  })

export default router
