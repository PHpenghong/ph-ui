<template>
  <div>
    <a-button class="open_btn" @click="open">打开</a-button>
    <Model visible-str="">
      <template #body>
        <section class="test_model">
          {{ state.visible.visibleStr ? '测试打开模态框' : '模态框单元测试' }}
        </section>
      </template>
      <template #btns>
        <a-button class="slot_btn" @click="close">Close</a-button>
      </template>
    </Model>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import Model from '../../packages/model/src/index.vue'

const state = ref({
  visible: {
    visibleStr: false
  }
})

const open = () => {
  state.value.visible.visibleStr = true
}

const close = () => {
  state.value.visible.visibleStr = false
}
</script>

<style lang="scss" scoped></style>
