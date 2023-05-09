<template>
  <div>
    <a-button type="primary" @click="open">打开无边框弹框</a-button>
    <x-model :visible="state.visible" visible-str="visibleStr" full-model>
      <template #body> 抽屉Body插槽内容 </template>
    </x-model>
  </div>
</template>

<script setup lang="ts">
import { defineAsyncComponent, ref } from 'vue'
// import 'ph-ui/style/model'

const XModel = defineAsyncComponent(
  () => import('../../../packages/model/src/index.vue')
)

const state = ref<{
  visible: {
    visibleStr: boolean
  }
  title: string
}>({
  visible: {
    visibleStr: false
  },
  title: '无边框弹框展示'
})

const open = () => {
  state.value.visible.visibleStr = true
}
</script>

<style lang="scss" scoped></style>
