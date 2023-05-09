import { defineComponent, h, inject, PropType } from 'vue'
import '../../../theme/pul.scss'

export default defineComponent({
  props: {
    node: {
      type: Object as PropType<any>,
      default: () => ({})
    },
    label: {
      type: String,
      default: ''
    },
    disabled: {
      // 禁用
      type: Boolean,
      default: false
    }
  },
  setup(props) {
    const _that: any = inject('treeNode')
    if (typeof _that.slots.default === 'function') {
      return () => _that.slots.default({ node: props.node })
    }

    return () =>
      h(
        'article',
        { class: ['tree_node__label', props.disabled ? 'noClick' : ''] },
        props.label
      )
  }
})
