<template>
  <div>
    <a-button class="open_btn" @click="open">打开</a-button>
    <Drawer :visible="state.visible" visible-str="visibleStr">
      <template #body>
        <section class="test_drawer">
          {{ state.visible.visibleStr ? '测试打开drawer' : 'drawer单元测试' }}
        </section>
      </template>
      <template #btns>
        <a-button class="slot_btn" @click="close">Close</a-button>
      </template>
    </Drawer>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import Drawer from '../../packages/drawer/src/index.vue'

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
