import { Form, Input, Button } from 'antd'

import { isNil } from '@/utils/is'
import { isFunction } from 'lodash'

interface SearchProps {
  onSearch: (rgms?: any) => void
  onReset?: () => void
  searchItems?: any[]
  className?: string
}

export default function Search(props: SearchProps) {
  const { onSearch, onReset, className } = props
  const [searchForm] = Form.useForm()

  function handleSearch() {
    const searchValues = searchForm.getFieldsValue()
    const params: any = {}

    for (const key in searchValues) {
      const val = searchValues[key]
      if (!isNil(val)) {
        params[key] = val
      }
    }
    isFunction(onSearch) && onSearch(params)
  }

  function onSearchReset() {
    searchForm.resetFields()
    isFunction(onSearch) && onSearch()
    isFunction(onReset) && onReset()
  }

  return (
    <div className={`${className} flex justify-between items-center`}>
      <Form layout="inline" form={searchForm}>
        <Form.Item label="用户名" name="username">
          <Input />
        </Form.Item>
        <Form.Item label="昵称" name="nickname">
          <Input />
        </Form.Item>
        <Form.Item>
          <Button type="primary" className="mr-3" onClick={handleSearch}>
            查询
          </Button>
          <Button onClick={onSearchReset}>重置</Button>
        </Form.Item>
      </Form>
    </div>
  )
}
