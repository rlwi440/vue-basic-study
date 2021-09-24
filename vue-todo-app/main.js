import Vue from 'vue'
import App from './App'
import router from './router'
import store from './store'

//CreateElenment 최상위 컴포넌트 를 받는다
new Vue ({
    el:'#app',
    router,
    store,
    render: h=> h(App)
})