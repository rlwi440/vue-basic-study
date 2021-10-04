import { shallowMount } from '@vue/test-utils'
import Todotitle from '../TodoTitle'
import axios from 'axios'

jest.mock('axios')

describe('TodoTitle Component', () => {
  let wrapper
  beforeEach(() => {
    const res = {
      data: {
        title: 'delectus aut autem'
      }
    }
    // axios.get = jest.fn(() => {
    //   return new Promise(resolve => {
    //     resolve(res)
    //   })
    // })
    axios.get.mockResolvedValue(res)
    wrapper = shallowMount(Todotitle)
  })
  test('가져온 텍스트를 렌더링 ', () => {
    expect(wrapper.text()).toBe('delectus aut autem')
  })
  test('호출 여부 ', () => {
    // expect(axios.get).toHaveBeenCalledTimes(1)
    const spy = jest.spyOn(wrapper.vm, 'fetchTodo')
    wrapper.vm.fetchTodo()
    expect(spy).toHaveBeenCalled()
  })
})
