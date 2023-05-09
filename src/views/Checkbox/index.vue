<template>
  <div>
    <Checkbox v-model:value="checked" name="">Checkbox</Checkbox>
    <input type="checkbox" :checked="checked" @change="changeInput" />
  </div>
</template>

<script setup lang="ts">
import { defineAsyncComponent, ref } from 'vue'
// import Checkbox from '../../packages/checkbox/src/index'

const Checkbox = defineAsyncComponent(
  () => import('../../packages/checkbox/src/index')
)

const changeInput = () => {
  // console.log('in----changeInput')
  // console.log(checked)
}
const checked = ref<boolean>(false)
</script>

<style lang="scss" scoped></style>
