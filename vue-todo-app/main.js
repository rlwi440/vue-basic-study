import Vue from 'vue'
import App from './App'
import router from './router'

//CreateElenment 최상위 컴포넌트 를 받는다
new Vue ({
    el:'#app',
    router,
    render: h=> h(App)
})