import Vue from 'vue'
import Vuex from 'vuex'
import todoApp from './todoApp'

Vue.use(Vuex)

export default new Vuex.Store({
  strict:process.env.NODE_ENV !== 'production',

  // //Data
  // state:{

  // },
  // //Computed
  // getters:{

  // },
  // //Methods
  // // 실제 값을 변경할때 (비동기X)
  // mutations:{

  // },
  // //Methods
  // //일반 로직 (비동기O)
  // actions:{

  // }
  modules:{
    todoApp
  }
})