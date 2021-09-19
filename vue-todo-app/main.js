import Vue from 'vue'
import App from './App'

//CreateElenment 최상위 컴포넌트 를 받는다
new Vue ({
    el:'#app',
    render: h=> h(App)
})