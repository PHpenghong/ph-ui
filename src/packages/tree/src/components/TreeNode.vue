<template>
  <div class="tree_node">
    <section
      :class="[
        {
          selectsVal__node: ~_that.props.selectsVal.indexOf(
            props.node[fieldNames.id]
          )
        },
        'tree_node__context',
        { noClick: disabled || node?.disabled || node?.meta?.disabled }
      ]"
      :style="{ paddingLeft: `${18 * layer * 2}px` }"
      @click.stop="onclickNode"
    >
      <span
        v-if="
          node[_that.props.fieldNames.children] &&
          node[_that.props.fieldNames.children].length > 0
        "
        class="tree_node__icon flexClass"
        @click.stop="onClickExpand"
      >
        <SvgIcon :name="state.isExpand ? expandIcon : collapseIcon" />
      </span>
      <CheckBox
        v-if="isCheckbox"
        v-model:value="node.checked"
        :indeterminate="node.indeterminate"
        :disabled="disabled || node?.disabled || node?.meta?.disabled"
        @handle-change="handleChangeCheckbox"
      />
      <Context
        :node="node"
        :label="props.node[_that.props.fieldNames.label]"
        :disabled="disabled || node?.disabled || node?.meta?.disabled"
      />
    </section>
    <section v-show="state.isExpand" class="tree_node__children">
      <TreeNode
        v-for="item in node[_that.props.fieldNames.children]"
        :key="item[_that.props.fieldNames.id]"
        :node="item"
        :layer="layer + 1"
        :is-checkbox="isCheckbox"
        :is-expand="isExpand"
        :disabled="disabled"
        :expand-icon="expandIcon"
        :collapse-icon="collapseIcon"
        @check-change="checkChange"
      />
    </section>
  </div>
</template>

<script setup lang="ts">
import {
  PropType,
  inject,
  reactive,
  defineAsyncComponent,
  onMounted,
  nextTick
} from 'vue'

interface FieldNames {
  label: string
  id: string
  children: string
  disabled?: boolean
}

const Context = defineAsyncComponent(() => import('./TreeContext'))

const CheckBox = defineAsyncComponent(() => import('../../../Checkbox'))

const _that: any = inject('treeNode')

const emits = defineEmits(['checkChange', 'clickNode'])
const props = defineProps({
  node: {
    type: Object as PropType<any>,
    default: () => ({})
  },
  fieldNames: {
    type: Object as PropType<FieldNames>,
    default: () => ({
      label: 'label',
      id: 'id',
      children: 'children'
    })
  },
  expandIcon: {
    type: String,
    default: 'caret-down'
  },
  collapseIcon: {
    type: String,
    default: 'caret-right'
  },
  layer: {
    type: Number,
    default: 0
  },
  isCheckbox: {
    type: Boolean,
    default: false
  },
  isExpand: {
    type: Boolean,
    default: false
  },
  defaultExpandVal: {
    type: Array as PropType<(string | number)[]>,
    default: () => []
  },
  disabled: {
    // 禁用
    type: Boolean,
    default: false
  }
})

onMounted(() => {
  state.isExpand =
    props.isExpand ||
    !!~props.defaultExpandVal.indexOf(props.node[props.fieldNames.id])
})

const state = reactive<any>({
  isExpand: false
  // indeterminate: false
})

const onclickNode = (e: any) => {
  if (props.disabled) {
    return
  }
  _that.emit('clickNode', props.node, e)
  _that.props.selectsVal.length = 0
  _that.props.selectsVal.push(props.node[props.fieldNames.id])
}

const onClickExpand = (e: any) => {
  state.isExpand = !state.isExpand
  _that.emit(
    'nodeExpand',
    props.node,
    state.isExpand ? 'expand' : 'collapse',
    e
  )
}

const handleChangeCheckbox = (e: any, val: boolean) => {
  nextTick(() => {
    props.node.indeterminate = false
    if (props.node[props.fieldNames.children]?.length > 0) {
      const f = (arr: any[]) => {
        for (let i = 0, len = arr.length; i < len; i++) {
          const child = arr[i]
          f(child[props.fieldNames.children] || [])
          if (!child.disabled) child.checked = val
          child.indeterminate = false
        }
      }
      f(props.node[props.fieldNames.children])
    }
    emits('checkChange', val)
  })
}

const checkChange = (val: boolean) => {
  if (props.node[props.fieldNames.children]?.length > 0) {
    const isTrue = props.node[props.fieldNames.children].some(
      (i: any) => (i.checked || i.indeterminate) && !i.disabled
    )
    const isDisabled = props.node[props.fieldNames.children].every(
      (i: any) => i.disabled
    )
    const isFalse = props.node[props.fieldNames.children].every(
      (i: any) => i.checked
    )
    if (isTrue && isFalse) {
      props.node.indeterminate = false
      props.node.checked = true
    } else if (isTrue && !isFalse) {
      props.node.indeterminate = true
      props.node.checked = false
    } else if (!isTrue && !isFalse && isDisabled) {
      props.node.indeterminate = false
      props.node.checked = false
    } else {
      props.node.indeterminate = false
      props.node.checked = false
    }
  }
  emits('checkChange', val)
}
</script>

<script lang="ts">
export default {
  name: 'TreeNode'
}
</script>

<style lang="scss" scoped>
.tree_node {
  width: 100%;
  .selectsVal__node {
    background-color: v-bind('_that.props.selectsColor');
  }
  .tree_node__context {
    margin: 0 10px;
    width: 1005;
    height: 26px;
    cursor: pointer;
    display: flex;
    align-items: center;
    .tree_node__icon {
      padding: 6px;
      color: #c0c4cc;
      cursor: pointer !important;
    }
    .tree_node__label {
      color: #606266;
      font-size: 14px;
    }
    &:hover {
      background-color: #f5f7fa;
    }
  }
  .tree_node__children {
  }
}
</style>
