export default{
  namespaced:true,
  state:() => ({
    a:123,
    b:[]
  }),
  getters:{
    someGetter1(state,getters){
      return state.a + 1
    },
    someGetter2(state,getters){
      return state.a + getters.someGetter1
    }
  },
  mutations:{
    // mutations  (payload)  특정한 전달 받은값을 사용할수가있다. 
    someMutation(state,payload) {
      state.a=789
      state.b.push(payload)

    }
  },
  actions:{
    someAction1({state,getters,commit,dispatch},payload){
      state.a= 789 //Error
      state.b.push(payload) //Error
      commit('someMutation',payload)
    },
      someAction2(context,payload){
        context.commit('someMutation')
        // someAction1 내부를 사용하기 위해 dispatch 사용했습니다.
        context.dispatch('someAction1',payload)
      }
  }
}