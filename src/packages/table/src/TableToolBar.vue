<template>
  <div class="table-toolbar-container">
    <div class="toolbar">
      <div class="search-box">
        <slot name="queryForm" />
      </div>
      <div class="func-box">
        <slot name="func" />
      </div>
    </div>
    <div v-if="selectItems" class="alert">
      <div class="desc-box">
        <div class="alert-icon">i</div>
        <div class="alert-desc">
          已选择&nbsp;<span class="text-blue">{{ selectItems }}</span
          >&nbsp;项
        </div>
      </div>
      <div class="func-box">
        <slot name="alertFunc" />
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'

export default defineComponent({
  name: 'TableToolBar',
  props: {
    selectItems: {
      type: Number,
      default: 0
    }
  }
})
</script>

<style lang="scss" scoped>
.table-toolbar-container {
  width: 100%;
  /* 表格统一样式 --- start */

  /* 表格工具栏样式 ---start */
  .toolbar {
    display: flex;
    justify-content: space-between;
    margin-bottom: 18px;
    .search-box {
      flex: 1;
    }
    .func-box {
      display: flex;
      align-items: center;
    }
  }
  .alert {
    height: 42px;
    width: 100%;
    margin-bottom: 18px;
    display: flex;
    justify-content: space-between;
    align-items: center;
    background: #e6f7ff;
    border: 1px solid #bae7ff;
    .desc-box {
      display: flex;
      margin: 0 18px;
      font-size: 14px;
      line-height: 22px;
      color: rgba(0, 0, 0, 0.65);
      .alert-icon {
        width: 20px;
        height: 20px;
        margin-right: 8px;
        color: #fff;
        text-align: center;
        border-radius: 50%;
        background: #0a96de;
      }
    }
  }
  /* 表格工具栏样式 ---start */

  /* 表格统一样式 --- end */
}
</style>
