import Vue from 'vue'
import Router from 'vue-router'
import Home from './views/Home.vue'

function load (component) {
  return () => import(`./views/${component}.vue`)
}

Vue.use(Router)

export default new Router({
  mode: 'history',
  routes: [
    {
      path: '/',
      name: 'home',
      component: Home
    },
    {
      path: '/add-article',
      name: 'addArticle',
      component: load('RegisterArticle')
    },
    {
      path: '/article-list',
      name: 'articleList',
      component: load('Articles')
    },
    {
      path: '/article/:id',
      name: 'article',
      props: true,
      component: load('Article')
    }
  ]
})
