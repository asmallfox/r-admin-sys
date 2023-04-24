import type { ColumnsType } from 'antd/es/table'
import { useEffect, useState } from 'react'
import { Table } from 'antd'

import { getUserList } from '@/api'

interface DataType {
  id: string | number
  name: string
  type: number
  description: string
}

function SysAdmin() {
  const columns: ColumnsType<DataType> = [
    {
      title: '姓名',
      key: 'name'
      // dataIndex: 'id'
    },
    {
      title: '类型',
      key: 'type'
      // dataIndex: 'id'
    },
    {
      title: '描述',
      key: 'description'
      // dataIndex: 'id'
    }
  ]

  const [userList, setUserList] = useState<DataType[]>([])

  useEffect(() => {
    async function userReqeust() {
      const { data: res } = await getUserList()
      if (res.rows) {
        setUserList(res.rows)
      }
    }
    userReqeust()
  }, [])

  return (
    <div>
      {/* <Table columns={columns} dataSource={userList} /> */}
      <Table dataSource={userList}>
        <Table.Column title="Name" key="1"></Table.Column>
      </Table>
    </div>
  )
}

export default SysAdmin
