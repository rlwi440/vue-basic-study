import movie from '../movie'
import cloneDeep from 'lodash/cloneDeep'
describe('movie store',()=>{
  let store
  beforeEach(()=>{
     store = cloneDeep(movie) 
    store.state = movie.state()
    //this.$store.commit('NAME',payload)
    store.commit = function(name,payload){
      store.mutations[name](store.state,payload)
    }
  })
  test('state 가 정상적으로 업데이트 ',()=>{

    store.commit('updateState',{
      loading:true,
      title:'Hello!',
      movies:[1,2,3]
    })
    expect(store.state.loading).toBe(true)
    expect(store.state.title).toBe('Hello!')
    expect(store.state.movies).toEqual([1,2,3])
  })

  test('영화목록에 push',()=>{
    expect(store.state.movies).toEqual([])
    store.commit('pushIntoMovies',[{Title:'영화 제목'}])
    expect(store.state.movies).toEqual([{Title:'영화 제목'}])
  })
})