import { test, expect } from 'vitest'
import { mount } from '@vue/test-utils'
import { nextTick } from 'vue'
import Checkbox from '../../packages/checkbox/src/index'

test('Checkbox default', async () => {
  const wrapper = await mount(Checkbox)

  expect(wrapper).toBeTruthy()
})

test('Checkbox default2', async () => {
  const wrapper = await mount(Checkbox, {
    slots: {
      default: 'CheckboxTest'
    }
  })

  expect(wrapper).toBeTruthy()

  const labelDom = wrapper.find('.ph_checkbox-span')

  expect(labelDom).toBeTruthy()

  expect(labelDom.text()).toBe('CheckboxTest')
})

test('Checkbox disabled ', async () => {
  const wrapper = await mount(Checkbox, {
    props: {
      disabled: true
    },
    slots: {
      default: 'Checkbox disabled'
    }
  })

  expect(wrapper).toBeTruthy()

  const disableDom = wrapper.find('.noClick')

  expect(disableDom).toBeTruthy()
})

test('Checkbox onchange ', async () => {
  const wrapper = await mount(Checkbox, {
    props: {
      disabled: true
    },
    slots: {
      default: 'Checkbox onchange'
    }
  })

  expect(wrapper).toBeTruthy()

  const clickDom = wrapper.find('.ph_checkbox-wrapper')

  expect(clickDom).toBeTruthy()

  clickDom.trigger('click')

  await nextTick()
})
