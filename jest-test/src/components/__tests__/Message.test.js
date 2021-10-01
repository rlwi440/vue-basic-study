import { shallowMount } from '@vue/test-utils'
import Message from '../Message'

describe('Message Component', () => {
  test('1', () => {
    const wrapper = shallowMount(Message, {
      propsData: {
        msg: 'World?'
      }
    })
    expect(wrapper.vm.msg).toBe('World?')
    expect(wrapper.element.tagName).toBe('SPAN')
    expect(wrapper.attributes().class).toBe('msg')
    expect(wrapper.attributes('class')).toBe('msg')
  })
})
