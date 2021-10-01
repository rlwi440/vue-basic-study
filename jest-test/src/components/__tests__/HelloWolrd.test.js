import { mount, shallowMount } from '@vue/test-utils'
import HelloWorld from '../HelloWorld'

describe('HelloWorld Component', () => {
  test('mounting', () => {
    const wrapper = mount(HelloWorld)
    console.log(wrapper.html())
    expect(wrapper.text()).toBe('HelloWorld!')
  })
  test('shallowMount', () => {
    const wrapper = shallowMount(HelloWorld)
    console.log(wrapper.html())
    expect(wrapper.text()).toBe('Hello')
  })
})
