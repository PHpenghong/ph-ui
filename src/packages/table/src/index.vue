<template>
  <div class="tableComponents" :style="{ padding: padding }">
    <section v-if="title" class="labelSec">
      {{ title }}
    </section>
    <section v-if="!hideForm" class="formSec">
      <slot name="form" />
    </section>
    <section class="tableSec">
      <AntdTable
        ref="antdTable"
        :row-key="rowKey"
        :slot-list="slotList"
        :is-row-select="isRowSelect"
        :form="form"
        :is-show-index="true"
        :req="req"
        :is-page="isPage"
        :file-module="fileModule"
        :columns-key="columnsKey"
        :param-name="paramName"
        :page-size-arr="pageSizeArr"
        :res-name="resName"
        :return-row="returnRow"
        @page-size-change="pageSizeChange"
      >
        <template #alertFunc="{ selectedRowKeys }">
          <slot name="alertFunc" :selected-row-keys="selectedRowKeys" />
        </template>
        <template v-for="item in slotList" :key="item" #[item]="{ row }">
          <slot :name="item" :row="row" />
        </template>
        <!-- <template #address="{row}">
          <span class="testaddress" @click="testClick(row)"> {{row.address}} </span>
        </template> -->
      </AntdTable>
    </section>
  </div>
</template>

<script lang="ts">
import { defineComponent, getCurrentInstance, PropType, ref } from 'vue'
import AntdTable from './AntdTable.vue'

export default defineComponent({
  components: {
    AntdTable
  },
  props: {
    title: {
      type: String,
      default: ''
    },
    form: {
      type: Object as PropType<any>,
      default: () => ({})
    },
    slotList: {
      type: Array as PropType<string[]>,
      default: () => []
    },
    rowKey: {
      type: String,
      default: ''
    },
    req: {
      // 接口对象
      type: Function,
      default: () => ({})
    },
    fileModule: {
      // 表格对象文件路径
      type: Object as any,
      default: () => ({})
    },
    columnsKey: {
      // 列名对象集合
      type: String,
      default: ''
    },
    paramName: {
      // 参数对象处理函数
      type: String,
      default: ''
    },
    resName: {
      // 返回对象处理函数
      type: String,
      default: ''
    },
    // columnsUrl: {
    //   type: String,
    //   default: ''
    // },
    isRowSelect: {
      // 选择行，全选
      type: Boolean,
      default: true
    },
    padding: {
      type: String,
      default: '20px 40px'
    },
    isPage: {
      type: Boolean,
      default: true
    },
    pageSizeArr: {
      type: Array as PropType<string[]>,
      default: () => ['10', '20', '30', '40', '50']
    },
    returnRow: {
      type: Boolean,
      default: false
    },
    hideForm: {
      type: Boolean,
      default: false
    }
  },
  setup(props, content) {
    const refCurr = getCurrentInstance()
    const refs: any = ref()
    const dealWithRefs = () => {
      if (!refs.value || Object.keys(refs.value).length === 0) {
        refs.value = refCurr?.proxy?.$refs
      }
      return refs.value
    }
    const pageSizeChange = (page: number, pageSize: number) => {
      content.emit('pageSizeChange', page, pageSize)
    }
    const search = (is = false) => {
      dealWithRefs() && dealWithRefs().antdTable.search(is)
    }
    const clearTable = () => {
      dealWithRefs() && dealWithRefs().antdTable.clearTable()
    }
    return {
      search,
      pageSizeChange,
      clearTable
    }
  }
})
</script>

<style lang="scss" scoped>
.tableComponents {
  background-color: #ffffff;
  .labelSec {
    border-left: 7px solid #02a7f0;
    height: 23px;
    line-height: 23px;
    padding-left: 10px;
    margin-bottom: 20px;
    font-size: 18px;
    font-weight: bold;
    text-align: left;
  }
  .formSec {
    margin-bottom: 20px;
    height: 35px;
  }
}
</style>
