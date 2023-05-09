import { defineComponent, h, getCurrentInstance } from 'vue'
import './checkbox.scss'
import '../../theme/pul.scss'

export default defineComponent({
  props: {
    name: {
      type: String,
      default: ''
    },
    value: {
      type: Boolean,
      default: false
    },
    disabled: {
      type: Boolean,
      default: false
    },
    indeterminate: {
      type: Boolean,
      default: false
    }
  },
  setup(props, { emit }) {
    const instance: any = getCurrentInstance()
    const event = {
      onchange: (e: any) => {
        emit('update:value', e.target.checked)
        emit('handleChange', e, e.target.checked, e.target.name)
      }
    }
    const attrs = {
      name: props.name
    }
    const slot = h(
      'span',
      { class: 'ph_checkbox-span' },
      (instance?.slots?.default && instance?.slots?.default()) || ''
    )
    return () =>
      h(
        'label',
        {
          class: 'ph_checkbox-wrapper'
        },
        [
          h('input', {
            ...{
              type: 'checkbox',
              class: [
                'ph_checkbox',
                'ph_checkbox-indeterminate',
                props.disabled ? 'noClick' : 'ph_checkbox-hover'
              ]
            },
            ...event,
            ...attrs,
            checked: props.value,
            indeterminate: props.indeterminate,
            disabled: props.disabled
          }),
          slot
        ]
      )
  }
})
