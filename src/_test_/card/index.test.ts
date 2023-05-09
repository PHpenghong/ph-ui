import { describe, test, expect } from 'vitest'
import { mount } from '@vue/test-utils'
import { nextTick } from 'vue'
import Card from './index.test.vue'

// const localVue = createLocalVue()

describe('Drawer', () => {
  test('snapshot', async () => {
    const wrapper = mount(Card)

    const icons_chick_dom = wrapper.find('.icons_chick')

    expect(icons_chick_dom).toBeTruthy()

    icons_chick_dom.trigger('click')

    await nextTick()
  })
})
