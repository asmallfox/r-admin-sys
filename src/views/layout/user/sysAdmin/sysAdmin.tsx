import type { ColumnsType } from 'antd/es/table'
import { useEffect, useState } from 'react'
import { Table, Button } from 'antd'

import { getUserList } from '@/api'

import {
  ExclamationCircleOutlined,
  FormOutlined,
  DeleteOutlined
} from '@ant-design/icons'

import './style/index.scss'

interface DataType {
  id: string | number
  name: string
  type: number
  description: string
}

function SysAdmin() {
  const columns = [
    {
      title: '序号',
      dataIndex: 'id',
      align: 'center',
      width: '60px',
      render: (value, row, index: number) => {
        return `${index + 1}`
      }
    },
    {
      title: '用户名',
      dataIndex: 'username',
      align: 'center'
    },
    {
      title: '昵称',
      dataIndex: 'nickname',
      align: 'center'
    },
    {
      title: '角色',
      align: 'center'
    },
    {
      title: '创建时间',
      dataIndex: 'createTime',
      align: 'center'
    },
    {
      title: '备注',
      dataIndex: 'description',
      align: 'center'
    },
    {
      title: '操作',
      align: 'center',
      render: () => {
        return (
          <>
            <div className="flex justify-around">
              <Button
                style={{ color: '#0960bd' }}
                shape="circle"
                icon={<ExclamationCircleOutlined />}
              />
              <Button
                style={{ color: '#0960bd' }}
                shape="circle"
                icon={<FormOutlined />}
              />
              <Button danger shape="circle" icon={<DeleteOutlined />} />
            </div>
          </>
        )
      }
    }
  ]

  const [userList, setUserList] = useState<DataType[]>([])

  useEffect(() => {
    const userReqeust = async () => {
      const { data: res } = await getUserList()
      if (res.rows) {
        console.log(res.rows)
        setUserList(res.rows)
      }
    }
    userReqeust()
  }, [])

  return (
    <div>
      <Table
        columns={columns}
        dataSource={userList}
        rowKey={(record) => record.id}
        size="small"
        bordered
      />
    </div>
  )
}

export default SysAdmin
