import Vue from 'vue'
import VueRouter from 'vue-router'
import CreateIssue from '../components/CreateIssue.vue'
import Issues from '../components/Issues.vue'
import ShowIssue from '../components/ShowIssue.vue'
import EditIssue from '../components/EditIssue.vue'

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
  {
    path: '/issues/:id',
    name: 'ShowIssue',
    component: ShowIssue
  },
  {
    path: '/issues/edit/:id',
    name: 'EditIssue',
    component: EditIssue
  },
]

const router = new VueRouter({
  routes
})

export default router
