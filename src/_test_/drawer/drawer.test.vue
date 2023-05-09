<template>
  <div>
    <Drawer visible-str="">
      <template #body>
        <section class="test_drawer">drawer单元测试</section>
      </template>
    </Drawer>
  </div>
</template>

<script setup lang="ts">
import Drawer from '../../packages/drawer/src/index.vue'
</script>

<style lang="scss" scoped></style>
