<template>
  <div class="antdTableSelect">
    <section v-if="isRowSelect" class="tableSecSelectRow">
      <section v-show="hasSelected" class="selectRow">
        <TableToolBar :select-items="state.selectedRowKeys.length">
          <template #alertFunc>
            <slot
              name="alertFunc"
              :selected-row-keys="
                returnRow ? returnKeyRow : state.selectedRowKeys
              "
            />
          </template>
        </TableToolBar>
      </section>
      <a-table
        :row-selection="{
          selectedRowKeys: state.selectedRowKeys,
          onChange: onSelectChange
        }"
        :row-key="rowKey"
        :columns="state.columns"
        :loading="state.loading"
        :pagination="isPage ? pageObj : isPage"
        :data-source="state.tableData"
        @change="changePageSize"
      >
        <template #bodyCell="{ column, record, index }">
          <template v-if="isShowIndex && column.dataIndex == 'index'">
            {{ index + 1 + (pageObj.current - 1) * pageObj.pageSize }}
          </template>
          <template v-for="item in slotList" :key="item">
            <slot v-if="column.dataIndex == item" :name="item" :row="record" />
          </template>
        </template>
      </a-table>
    </section>
    <section v-else class="tableSec">
      <a-table
        :columns="state.columns"
        :row-key="rowKey"
        :loading="state.loading"
        :pagination="isPage ? pageObj : isPage"
        :data-source="state.tableData"
        @change="changePageSize"
      >
        <template #bodyCell="{ column, record, index }">
          <template v-if="isShowIndex && column.dataIndex == 'index'">
            {{ index + 1 + (pageObj.current - 1) * pageObj.pageSize }}
          </template>
          <template v-for="item in slotList" :key="item">
            <slot v-if="column.dataIndex == item" :name="item" :row="record" />
          </template>
        </template>
      </a-table>
    </section>
  </div>
</template>

<script lang="ts">
import {
  defineComponent,
  ref,
  computed,
  reactive,
  defineAsyncComponent,
  // onMounted,
  PropType,
  watch,
  watchEffect,
  nextTick
} from 'vue'

interface stateInterface {
  selectedRowKeys: (string | number)[]
  columns: any[]
  loading: boolean
  fileUrl: any
  // req: any
  tableData: any[]
  isLoad: boolean
  isSearch: boolean
}

/**
 * pageSizeChange
 */

export default defineComponent({
  components: {
    TableToolBar: defineAsyncComponent(() => import('./TableToolBar.vue'))
  },
  props: {
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
      // 列对象集合
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
    isShowIndex: {
      // 是否显示序号
      type: Boolean,
      default: false
    },
    slotList: {
      type: Array as PropType<string[]>,
      default: () => []
    },
    form: {
      type: Object as PropType<any>,
      default: () => ({})
    },
    isRowSelect: {
      type: Boolean,
      default: false
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
      // TableToolBar 组件 返回row
      type: Boolean,
      default: false
    }
  },
  setup(props, content) {
    const state = ref<stateInterface>({
      // req: null,
      loading: false,
      selectedRowKeys: [],
      fileUrl: null,
      columns: [],
      tableData: [],
      isLoad: false,
      isSearch: false
    })
    watch(
      () => props.columnsKey,
      (newVal) => {
        if (newVal) state.value.columns = state.value.fileUrl[props.columnsKey]
      }
    )
    watch(
      () => state.value.isLoad,
      (val: boolean) => {
        if (val && state.value.isSearch) {
          search()
        }
      }
    )
    // const requireMap: { [key: string]: any } = {
    //   logTask: () => import.meta.globEager('@/assets/logTask')
    // }
    watchEffect(() => {
      if (props.fileModule) {
        state.value.fileUrl = props.fileModule
        state.value.columns = state.value.fileUrl[props.columnsKey]
        state.value.isLoad = true
      }
    })
    // const requireMap: any = {}
    // const modules = import.meta.globEager('/src/assets/**/**.ts')
    // Object.keys(modules).forEach((key) => {
    //   const nameMatch = key.match(/^\/src\/assets\/(.+)\.ts/)
    //   if (!nameMatch) return
    //   const indexMatch = nameMatch[1].match(/(.*)\/Index$/i)
    //   let name = indexMatch ? indexMatch[1] : nameMatch[1]
    //   ;[name] = name.split('/').splice(-1)
    //   requireMap[name] = modules[key]
    // })
    // state.value.fileUrl = requireMap[props.fileUrl]
    // state.value.columns = state.value.fileUrl[props.columnsKey]
    // })
    const returnKeyRow = computed(() =>
      state.value.tableData.filter(
        (i: any) => ~state.value.selectedRowKeys.indexOf(i[props.rowKey])
      )
    )

    // 表格切换管理
    const pageObj = reactive({
      current: 1,
      pageSize: 10,
      total: 0,
      showSizeChanger: true,
      showQuickJumper: true,
      pageSizeOptions: props.pageSizeArr,
      showTotal: (total: number) => `共${total}条`,
      showSizeChange: (current: number, pageSize: number) => {
        state.value.loading = true
        pageObj.current = current
        pageObj.pageSize = pageSize
        getList()
        content.emit('pageSizeChange', current, pageSize)
      }
    })
    const hasSelected = computed(() => state.value.selectedRowKeys.length > 0)
    const changePageSize = ({
      current,
      pageSize
    }: {
      current: number
      pageSize: number
    }) => {
      content.emit('pageSizeChange', current, pageSize)
      pageObj.current = current
      pageObj.pageSize = pageSize
      getList()
    }
    const onSelectChange = (selectedRowKeys: (string | number)[]) => {
      state.value.selectedRowKeys = selectedRowKeys
    }
    const getList = async () => {
      state.value.tableData = []
      state.value.loading = true
      props
        .req(
          state.value.fileUrl[props.paramName](
            pageObj.current,
            pageObj.pageSize,
            props.form,
            props.isPage
          )
        )
        .then((result: any) => {
          const res = state.value.fileUrl[props.resName](result)
          nextTick(() => {
            ;[state.value.tableData, pageObj.total] = res
            state.value.loading = false
          })
        })
        .catch((err: any) => {
          console.log(err)
          state.value.loading = false
        })
    }
    const search = (is = false) => {
      state.value.isSearch = true
      if (is) {
        state.value.tableData = []
        pageObj.current = 1
        pageObj.total = 0
        state.value.selectedRowKeys.length = 0
      }
      if (state.value.isLoad) {
        getList()
      }
    }
    const clearTable = () => {
      state.value.tableData.length = 0
      pageObj.current = 1
      pageObj.pageSize = 10
      pageObj.total = 0
    }
    return {
      state,
      pageObj,
      hasSelected,
      returnKeyRow,
      changePageSize,
      onSelectChange,
      search,
      clearTable
    }
  }
})
</script>

<style lang="scss">
.antdTableSelect {
  background-color: #ffffff;
  td {
  }
  .tableSecSelectRow {
    .selectRow {
      height: 42px;
      width: 100%;
      display: flex;
      justify-content: space-between;
      align-items: center;
      background: #e6f7ff;
      border: 1px solid #bae7ff;
    }
  }
  .tableSec {
  }
}
</style>
