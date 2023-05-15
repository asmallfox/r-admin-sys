import type { ColumnsType } from 'antd/es/table'
import { TablePro } from '@/components/Table'
import { PageContainer } from '@/components/PageContainer'
import { getOridnaryUserApi } from '@/api'
import { useEffect, useState } from 'react'
import dayjs from 'dayjs'

interface DataType {
  id: number | string
  username: string
  account: string
  email: string
  createTime: number
  updateTime: string
}

export default function Ordinary() {
  const columns: ColumnsType<DataType> = [
    { title: '用户名', dataIndex: 'username' },
    { title: '账户', dataIndex: 'account' },
    { title: '邮箱', dataIndex: 'email' },
    {
      title: '创建时间',
      dataIndex: 'createTime',
      render: (value: number) => (
        <span>{dayjs(new Date(value)).format('YYYY-MM-DD HH:mm:ss')}</span>
      )
    },
    {
      title: '修改时间',
      dataIndex: 'updateTime',
      render: (value: number) => (
        <span>{dayjs(new Date(value)).format('YYYY-MM-DD HH:mm:ss')}</span>
      )
    }
  ].map((column) => ({ ...column, align: 'center' }))

  const [dataSource, setDataSource] = useState()

  const getUserList = async () => {
    try {
      const { data: res } = await getOridnaryUserApi()
      setDataSource(res.rows)
    } catch (error) {
      console.error(error)
    }
  }

  useEffect(() => {
    getUserList()
  }, [])
  return (
    <PageContainer>
      <TablePro columns={columns} data={dataSource} />
    </PageContainer>
  )
}
