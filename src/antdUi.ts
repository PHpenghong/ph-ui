import type { App } from 'vue'

import {
  Button,
  Drawer,
  Form,
  Modal,
  Radio,
  Spin,
  Input,
  Select,
  SelectOption,
  DatePicker,
  Table,
  Pagination,
  Checkbox,
  FormItem,
  Switch,
  Popover,
  Tooltip
} from 'ant-design-vue'

const components = [
  Button,
  Drawer,
  Form,
  Modal,
  Radio,
  Spin,
  Input,
  Select,
  SelectOption,
  DatePicker,
  Table,
  Pagination,
  Checkbox,
  FormItem,
  Switch,
  Popover,
  Tooltip
]

export default function AntUI(app: App<Element>): void {
  components.forEach((plugin: any) => {
    app.use(plugin)
  })
}
