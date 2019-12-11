import Vue from 'vue'
import VueRouter from 'vue-router'
import CreateIssue from '../components/CreateIssue.vue'
import Issues from '../components/Issues.vue'

Vue.use(VueRouter)

const routes = [

  {
    path: '/',
    name: 'issues',
    component: Issues
  },
  {
    path: '/about',
    name: 'about',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import(/* webpackChunkName: "about" */ '../views/About.vue')
  },
  {
    path: '/newissue',
    name: 'CreateIssue',
    component: CreateIssue
  },
]

const router = new VueRouter({
  routes
})

export default router