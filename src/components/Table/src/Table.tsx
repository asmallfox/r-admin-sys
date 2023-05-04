import type { ColumnsType, TablePaginationConfig } from 'antd/es/table'

import { useEffect, useState } from 'react'
import { Table } from 'antd'

import { isFunction } from '@/utils/is'

import Search from './Search'
import TableHeader from './TableHeader'
import { FormDialog } from '@/components/FormDialog'

type TColumnsType<T = any> = ColumnsType<T>
type TApi = string | (<T = any>(rgms: T) => Promise<T>)

interface TableProps {
  pagination?: boolean
  columns: TColumnsType
  api?: TApi
  data?: any
  addFormItems?: any[]
}

const roleOption = [
  {
    value: '1',
    label: '管理员'
  },
  {
    value: '2',
    label: '开发'
  },
  {
    value: '3',
    label: '运维'
  },
  {
    value: '4',
    label: '产品'
  }
]

export default function TableContainer(props: TableProps) {
  const { columns, api, data = [] } = props

  const [loading, setLoading] = useState(false)

  const [dataSource, setDataSource] = useState(data)
  const [total, setTotal] = useState(0)
  const [paginationData, setPaginationData] = useState({
    page: 1,
    pageSize: 10
  })
  const [openAddModal, setOpenAddModal] = useState(false)

  const paginationChange = async (pagination: TablePaginationConfig) => {
    setPaginationData({
      page: pagination.current ?? 1,
      pageSize: pagination.pageSize ?? 10
    })
  }

  async function request(params?: Record<string, unknown>) {
    try {
      setLoading(true)
      const requestParams = {
        ...paginationData,
        order: 'desc',
        ...params
      }
      if (isFunction(api)) {
        const { data: res } = (await api(requestParams)) as any
        setDataSource(res.rows)
        setTotal(res.total ?? res.rows.length)
      }
    } catch (error) {
      console.error(error)
    } finally {
      setLoading(false)
    }
  }

  const addFormItems = [
    {
      key: 'username',
      label: '用户名',
      tooltip: '该字段用于登录',
      attrs: {
        placeholder: '请输入用户名'
      }
    },
    {
      key: 'role',
      label: '角色',
      component: 'Select',
      options: roleOption,
      attrs: {
        placeholder: '请选中角色'
      }
    },
    {
      key: 'nickname',
      label: '昵称'
    },
    {
      key: 'description',
      label: '备注'
    }
  ]

  const rules = {
    username: [
      {
        required: true,
        message: '请输入账号',
        trigger: 'blur'
      }
    ],
    nickname: [
      {
        required: true,
        message: '请输入昵称',
        trigger: 'blur'
      }
    ],
    role: [
      {
        required: true,
        message: '请选择角色',
        trigger: 'change'
      }
    ]
  }

  useEffect(() => {
    if (api) {
      request()
    }
  }, [paginationData])

  return (
    <div>
      <FormDialog
        title="添加账号"
        open={openAddModal}
        onCancel={() => setOpenAddModal(false)}
        formItems={addFormItems}
        rules={rules}
      />
      <Search onSearch={request} />
      <Table
        loading={loading}
        columns={columns}
        dataSource={dataSource}
        rowKey={(record) => record.id}
        size="small"
        bordered
        pagination={{
          total: total,
          showTotal: (total) => `共 ${total} 条数据`,
          pageSizeOptions: [5, 10, 20, 50, 100, 500],
          current: paginationData.page,
          pageSize: paginationData.pageSize,
          showQuickJumper: true,
          showSizeChanger: true,
          position: ['bottomRight']
        }}
        onChange={paginationChange}
        title={() => (
          <TableHeader
            addEvent={() => setOpenAddModal(true)}
            refresh={request}
          />
        )}
      />
    </div>
  )
}
