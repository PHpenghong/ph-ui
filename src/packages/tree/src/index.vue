<template>
  <div
    class="tree_comp"
    :style="{ width: props.width || '100%', height: props.height || '100%' }"
  >
    <TreeNode
      v-for="node in treeData"
      :key="node[fieldNames.id]"
      :node="node"
      :is-checkbox="isCheckbox"
      :is-expand="isExpand"
      :default-expand-val="defaultExpandVal"
      :disabled="disabled"
      :expand-icon="expandIcon"
      :collapse-icon="collapseIcon"
      @check-change="checkChange"
      @click-node="clickNode"
      @node-expand="nodeExpand"
    />
  </div>
</template>

<script setup lang="ts">
/**
 * @clickNode
 *
 * checkedVal
 *
 * checkChange
 */
import {
  PropType,
  getCurrentInstance,
  provide,
  defineAsyncComponent,
  watchEffect,
  watch
} from 'vue'

const TreeNode = defineAsyncComponent(() => import('./components/TreeNode.vue'))

interface FieldNames {
  label: string
  id: string
  children: string
  disabled?: boolean
}

const instance = getCurrentInstance()
provide('treeNode', instance)

const emits = defineEmits(['update:checkedVal', 'clickNode', 'nodeExpand'])
const props = defineProps({
  treeData: {
    type: Array as PropType<any[]>,
    default: () => []
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
  width: {
    type: String,
    default: '100%'
  },
  height: {
    type: String,
    default: '100%'
  },
  selectsVal: {
    type: Array as PropType<(string | number)[]>,
    default: () => []
  },
  selectsColor: {
    type: String,
    default: '#BAE7FF'
  },
  isExpand: {
    // 全部展开
    type: Boolean,
    default: false
  },
  isCheckbox: {
    // 是否显示选择框
    type: Boolean,
    default: false
  },
  checkedVal: {
    // 选择的节点
    type: Array as PropType<(string | number)[]>,
    default: () => []
  },
  defaultExpandVal: {
    // 默认展开的节点
    type: Array as PropType<(string | number)[]>,
    default: () => []
  },
  defaultCheckedVal: {
    // 默认选择的节点
    type: Array as PropType<(string | number)[]>,
    default: () => []
  },
  disabled: {
    // 禁用
    type: Boolean,
    default: false
  }
})

const checkChange = () => {
  if (props.isCheckbox) {
    const list: number[] = []
    const f: any = (arr: any[]) => {
      arr.map((i: any) => {
        f(i[props.fieldNames.children] || [])
        if (i.checked || i.indeterminate) {
          list.push(i[props.fieldNames.id])
        }
        return i
      })
    }
    f(props.treeData)
    emits('update:checkedVal', list as (string | number)[])
  }
}

let isInitChecked = true
const defaultCheckedNode = () => {
  if (isInitChecked && props.defaultCheckedVal && props.treeData.length > 0) {
    const f: any = (arr: any[]) => {
      for (let i = 0, len = arr.length; i < len; i++) {
        const child = arr[i]
        f(child[props.fieldNames.children] || [])
        child.indeterminate = false

        if (~props.defaultCheckedVal.indexOf(child[props.fieldNames.id])) {
          child.checked = true
        } else {
          child.checked = false
        }
        resetIndeterminate(child)
      }
    }
    f(props.treeData)
    isInitChecked = false
  }
}

const resetIndeterminate = (child: any) => {
  if (child[props.fieldNames.children]?.length > 0) {
    const isTrue = child[props.fieldNames.children].some(
      (i: any) => (i.checked || i.indeterminate) && !i.disabled
    )
    const isFalse = child[props.fieldNames.children].every(
      (i: any) => i.checked
    )
    if (isTrue && isFalse) {
      child.indeterminate = false
      child.checked = true
    } else if (isTrue && !isFalse) {
      child.indeterminate = true
      child.checked = false
    }
  }
}

watch(
  () => props.defaultCheckedVal,
  (val: (string | number)[]) => {
    if (val) {
      isInitChecked = true
      defaultCheckedNode()
    }
  }
)
watchEffect(() => {
  if (props.treeData.length > 0) {
    defaultCheckedNode()
  }
})

const clickNode = (node: any) => {
  emits('clickNode', node)
}

const dealWithTree = (tree: any[]) =>
  tree.map((i: any) => {
    if (i.checked === undefined) {
      i.checked = false
    }
    if (i[props.fieldNames.children]?.length > 0) {
      i[props.fieldNames.children] = dealWithTree(i[props.fieldNames.children])
    }
    return i
  })

watchEffect(() => {
  if (props.isCheckbox && props.treeData && props.treeData.length > 0) {
    dealWithTree(props.treeData)
  }
})

const nodeExpand = (node: any, type: string, e: any) => {
  emits('nodeExpand', node, type, e)
}
</script>

<style lang="scss" scoped>
.tree_comp {
  background-color: #ffffff;
}
</style>
