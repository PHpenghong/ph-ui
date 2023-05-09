<template>
  <div class="modalBox">
    <a-modal
      v-model:visible="visible[`${visibleStr}`]"
      :title="title"
      :width="modelWidth"
      :z-index="zIndex"
      :keyboard="keyboard"
      :mask-closable="maskClosable"
      :closable="!noBorder && closable"
      :wrap-class-name="wrapClassName"
    >
      <template v-if="!fullModel && !noBorder" #footer>
        <slot v-if="!noBorder" name="btns" />
        <span v-else />
      </template>
      <section class="box_body flexClass">
        <slot name="body" />
      </section>
    </a-modal>
  </div>
</template>

<script lang="ts">
import { defineComponent, onUnmounted, PropType, computed } from 'vue'
import { Modal } from 'ant-design-vue'

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
      type: String,
      default: '500px'
    },
    zIndex: {
      type: Number,
      default: 1000
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
    },
    noBorder: {
      // 无边框
      type: Boolean,
      default: false
    },
    fullModel: {
      type: Boolean,
      default: false
    }
  },
  setup(props) {
    const destroyModal = () => {
      Modal.destroyAll()
    }
    onUnmounted(() => {
      Modal.destroyAll()
    })
    const wrapClassName = computed(
      () =>
        `${props.noBorder ? 'noBorder_class' : ''} ${
          props.fullModel ? 'full_modal' : ''
        }`
    )
    const modelWidth = computed(
      () => `${props.fullModel ? '100%' : props.width}`
    )
    return {
      wrapClassName,
      modelWidth,
      destroyModal
    }
  }
})
</script>

<style lang="scss">
.modalBox {
  .box_body {
    overflow: auto;
  }
}

.noBorder_class {
  .ant-modal-body {
    padding: 0 !important;
  }
  .ant-modal-footer {
    padding: 0 !important;
    display: none;
  }
}

.full_modal {
  .ant-modal {
    max-width: 100%;
    top: 0;
    padding-bottom: 0;
    margin: 0;
  }
  .ant-modal-content {
    display: flex;
    flex-direction: column;
    height: calc(100vh);
  }
  .ant-modal-body {
    flex: 1;
    overflow: hidden;
    // padding: 3px 20px !important;
  }
  .ant-modal-footer {
    padding: 0 !important;
    height: 0;
    display: none;
  }
}
</style>
