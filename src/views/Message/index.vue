<template>
  <div>
    <a-buttom @click="open">打开消息提示</a-buttom>
  </div>
</template>

<script setup lang="ts">
import Message from 'src/packages/message/src/index'

const open = () => {
  Message.open({
    text: '测试',
    type: 'success'
  })
}
</script>

<style lang="scss" scoped></style>
