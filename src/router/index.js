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
