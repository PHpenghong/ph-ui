<template>
  <div>
    <Card :card-list="cardList" info-icon-color="" @handle-card="handleCard">
      <template #cardKey1="{ item }">
        <article class="title_art">{{ test ? test : item.title }}</article>
      </template>
    </Card>
  </div>
</template>

<script setup lang="ts">
import { reactive, ref } from 'vue'
import Card from '../../packages/card/src/index.vue'

const cardList = reactive([
  {
    title: '卡片标题1',
    value: 999,
    icon: 'x',
    iconColor: '',
    iconBg: '#FFF5EC',
    key: 'cardKey1',
    info: '这里是描述文本这里是描述文本',
    slot: true
  },
  {
    title: '卡片标题2',
    value: 56,
    icon: 'x',
    iconColor: '#3FBF8D',
    iconBg: '#ECF9F4',
    key: 'cardKey2',
    info: '这里是描述文本这里是描述文本'
  },
  {
    title: '卡片标题3',
    value: 39,
    icon: 'x',
    iconColor: '#427EF1',
    iconBg: '#ECF4FF',
    key: 'cardKey3',
    info: '这里是描述文本这里是描述文本'
  },
  {
    title: '卡片标题4',
    value: 3,
    icon: 'x',
    iconColor: '',
    iconBg: '',
    key: 'cardKey4',
    info: '这里是描述文本这里是描述文本'
  }
])
const test = ref<string>('')

const handleCard = (key: string) => {
  test.value = key
}
</script>

<style lang="scss" scoped>
.title_art {
  color: red;
}
</style>
