import Vue from 'vue'
import VueRouter from 'vue-router'

import Home from '~/views/Home'
import About from '~/views/About'
import TodoApp from '~/views/TodoApp'

Vue.use(VueRouter)

const routes =[
  {
    //$route에대한 name 
    name:'index',
    path: '/',
    component: Home
  },
  {
    name:'about',
    path: '/about',
    component: About
  },
  {
    name:'todos',
    path: '/todos',
    // redirect 라는 매소드  다시 전달을 해준다 .
    redirect:'/todos/all',
    component: TodoApp,
    children:[
      {
        name:'todos-filter',
        path:':id'
      }
    ]
  }

]

export default new VueRouter({
  routes
})


