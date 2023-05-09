import { describe, test, expect } from 'vitest'
import { mount } from '@vue/test-utils'
import Drawer from './drawer.test.vue'

describe('Drawer', () => {
  test('snapshot', () => {
    const wrapper = mount(Drawer)

    const drawer = wrapper.find('.drawerBox')

    expect(drawer).toBeTruthy()

    expect(drawer.text()).toBe('drawer单元测试')
  })
})
