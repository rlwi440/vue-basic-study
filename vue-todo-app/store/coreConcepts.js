export default{
  namespaced:true,
  //Data 매칭 하는 개념이다.
  state: () => ({
    a:123,
    b:[]
  }),
  // computed  같은개념 

  getters:{
    someGetter1(state,getters){
      return state.a + 1
    },
    someGetter2(state,getters){
      return state.a + getters.someGetter1
    }
  },
  // payload 
  mutations:{
    someMutation(state,payload){
      state.a= 789
      state.b.push(payload)
    }
  },
  actions:{
    someAction1({ state,getters,commit,dispatch },payload){
      state.a=789 //Error
      // state.b.push(payload) Error
      commit('someMutation',payload)
    },
      someAction2(context,payload){
        context.commit('someMutation')
        context.dispatch('someAction1',payload)
    }
  }
}
