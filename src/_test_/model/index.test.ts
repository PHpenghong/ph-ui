import { describe, test, expect } from 'vitest'
import { mount } from '@vue/test-utils'
import { nextTick } from 'vue'
import Model from './index.test.vue'

describe('Model', () => {
  test('Model', async () => {
    const wrapper = mount(Model)
    const slotDOM = wrapper.find('.test_model')

    expect(slotDOM).toBeTruthy()

    expect(slotDOM.text()).toBe('模态框单元测试')

    const btnDOM = wrapper.find('.open_btn')

    btnDOM.trigger('click')

    await nextTick()

    expect(slotDOM.text()).toBe('测试打开模态框')

    const slotBtn = wrapper.find('.slot_btn')

    slotBtn.trigger('click')

    await nextTick()

    expect(slotDOM.text()).toBe('模态框单元测试')

    // expect(wrapper).toMatchSnapshot()
  })
})
