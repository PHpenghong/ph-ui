<template>
  <div class="drawerBox">
    <a-drawer
      v-model:visible="visible[`${visibleStr}`]"
      :style="style"
      :title="title"
      :width="width"
      :placement="placement"
      :keyboard="keyboard"
      :mask-closable="maskClosable"
      :closable="closable"
    >
      <section class="drawerBody">
        <slot name="body" />
      </section>
      <section class="drawerOther">
        <slot name="other" />
      </section>
      <section class="drawerBtns flexClass">
        <slot name="btns" />
      </section>
    </a-drawer>
  </div>
</template>

<script lang="ts">
import { defineComponent, PropType } from 'vue'

export default defineComponent({
  props: {
    title: {
      type: String,
      default: ''
    },
    visible: {
      type: Object as PropType<any>,
      default: () => ({})
    },
    visibleStr: {
      type: String,
      default: 'visible'
    },
    width: {
      type: [String, Number],
      default: 500
    },
    zIndex: {
      type: Number,
      default: 1000
    },
    placement: {
      // top | right | bottom | left
      type: String,
      default: 'right'
    },
    style: {
      type: Object as PropType<any>,
      default: () => ({})
    },
    closable: {
      // 点击右上角按钮关闭
      type: Boolean,
      default: true
    },
    keyboard: {
      // esc关闭
      type: Boolean,
      default: true
    },
    maskClosable: {
      // 点击蒙层关闭
      type: Boolean,
      default: true
    }
  },
  setup() {
    return {}
  }
})
</script>

<style lang="scss" scoped></style>
