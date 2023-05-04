import { Button, Divider } from 'antd'
import { RedoOutlined } from '@ant-design/icons'
import { isFunction } from '@/utils/is'

interface TableHeaderProps {
  refresh?: Function
  addEvent?: Function
}

export default function TableHeader(props: TableHeaderProps) {
  const { refresh, addEvent } = props
  const handleRefresh = async () => {
    isFunction(refresh) && refresh()
  }

  return (
    <div className="flex justify-between items-center">
      <span className="text-base">账号列表</span>
      <div className="flex items-center">
        <Button
          type="primary"
          onClick={() => isFunction(addEvent) && addEvent()}
        >
          新增账号
        </Button>
        <Divider type="vertical" />
        <div>
          <RedoOutlined onClick={handleRefresh} />
        </div>
      </div>
    </div>
  )
}
