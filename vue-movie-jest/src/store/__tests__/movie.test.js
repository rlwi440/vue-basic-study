import movie from "../movie"
import cloneDeep from "lodash/cloneDeep"
import axios from "axios"
//가짜 모듈 만들기
jest.mock('axios')
describe("movie store", () => {
  let store;
  beforeEach(() => {
    store = cloneDeep(movie)
    store.state = movie.state()
    //this.$store.commit('NAME',payload)
    store.commit = function(name, payload) {
      store.mutations[name](store.state, payload);
    };
    //this.$store.dispatch('searchMovies' ,payload)
    //return store.actions 비동기 처리 만듬
    store.dispatch = function(name, payload) {
      const context = {
        state: store.state,
        commit: store.commit,
        dispatch: store.dispatch,
      };
      return store.actions[name](context, payload);
    };
  });
  test("state 가 정상적으로 업데이트 ", () => {
    store.commit("updateState", {
      loading: true,
      title: "Hello!",
      movies: [1, 2, 3],
    });
    expect(store.state.loading).toBe(true)
    expect(store.state.title).toBe("Hello!")
    expect(store.state.movies).toEqual([1, 2, 3])
  });

  test("영화목록에 push", () => {
    expect(store.state.movies).toEqual([]);
    store.commit("pushIntoMovies", [{ Title: "영화 제목" }])
    expect(store.state.movies).toEqual([{ Title: "영화 제목" }])
  });
  test("영화목록 을 가져왔을때", async () => {
    axios.get.mockResolvedValue({
      data: {
        totalResults: "1",
        Search: [
          {
            imdbID: "123456",
            Title: "영화 제목",
            Poster: "image.jpg",
            Year: "2020",
          },
        ],
      },
    });
    await store.dispatch("searchMovies")
    expect(store.state.movies).toEqual([
      {
        imdbID: "123456",
        Title: "영화 제목",
        Poster: "image.jpg",
        Year: "2020",
      },
    ])
  })
  test('영화 목록을 가져오지 못했을 때',async ()=>{
    axios.get.mockRejectedValue(new Error('Network Error!'))
    await store.dispatch("searchMovies")
    expect(store.state.error).toEqual(new Error('Network Error!'))
  })
})