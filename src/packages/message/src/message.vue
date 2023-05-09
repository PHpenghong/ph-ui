<template>
  <div v-if="show" :class="{ msg_win: true }">
    <section :class="{ 'meg-bg-sec': true, [baseClassName]: true }">
      <section class="msg_body">
        <article class="textArt">{{ props.text }}</article>
        <span @click="closeMessage">
          <SvgIcon :name="icon || 'x'" />
        </span>
      </section>
    </section>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue'
import type { MessageType } from './types'

const props = withDefaults(
  defineProps<{ text?: string; type?: MessageType; icon?: string }>(),
  {
    type: 'info',
    text: '',
    icon: 'x'
  }
)

const show = ref<boolean>(false)

onMounted(() => {
  show.value = true
})

const closeMessage = () => {
  show.value = false
}

const baseClassName = `${props.type}-message`

defineExpose({ closeMessage })
</script>

<style lang="scss" scoped>
@import './style/index.scss';

.msg_win {
  display: inline-block;
  position: fixed;
  top: 8px;
  border-radius: 2px;
  box-shadow: 0 3px 6px -4px rgb(0 0 0 / 12%), 0 6px 16px 0 rgb(0 0 0 / 8%),
    0 9px 28px 8px rgb(0 0 0 / 5%);
  @include message-className;
  .meg-bg-sec {
    padding: 10px 16px;
  }
  .msg_body {
    display: flex;

    .textArt {
    }
  }
}
</style>
