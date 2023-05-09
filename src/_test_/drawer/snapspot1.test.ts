import { describe, test, expect } from 'vitest'
import { mount } from '@vue/test-utils'
import { nextTick } from 'vue'
import Drawer from './index.test.vue'

describe('Drawer', () => {
  test('snapshot', async () => {
    const wrapper = mount(Drawer)
    const slotDOM = wrapper.find('.test_drawer')

    expect(slotDOM).toBeTruthy()

    expect(slotDOM.text()).toBe('drawer单元测试')

    const btnDOM = wrapper.find('.open_btn')

    btnDOM.trigger('click')

    await nextTick()

    expect(slotDOM.text()).toBe('测试打开drawer')

    const slotBtn = wrapper.find('.slot_btn')

    slotBtn.trigger('click')

    await nextTick()

    expect(slotDOM.text()).toBe('drawer单元测试')

    // expect(wrapper).toMatchSnapshot()
  })
})
