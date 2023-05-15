import type { ColumnsType, TablePaginationConfig } from 'antd/es/table'

import { useEffect, useState, useId } from 'react'
import { Table, Button, Tooltip, Divider } from 'antd'
import { DeleteOutlined, FormOutlined } from '@ant-design/icons'
import { cloneDeep } from 'lodash'

import { useMessage } from '@/hooks/web/useMessage'
import { isFunction } from '@/utils/is'

import Search from './Search'
import TableHeader from './TableHeader'
import { FormDialog } from '@/components/FormDialog'
import { PopconfirmButton } from '@/components/PopconfirmButton'
import { useDesign } from '@/hooks/web/useDesign'
import '../style/table.scss'

type TColumnsType<T = any> = ColumnsType<T>
type Api = string | (<T = any>(rgms: T) => Promise<T>)

interface TableProps {
  data?: Record<string, unknown>[]
  columns?: TColumnsType
  pagination?: boolean | object
  config?: {
    list: {
      api: Api
      columns: TColumnsType
    }
    create?: {
      api: Api
      formItems: any[]
      rules?: Record<string, unknown>
    }
    delete?: {
      api: Api
    }
    update?: {
      api: Api
      formItems: any[]
      rules?: Record<string, unknown>
    }
    search?: {
      formItems: any[]
    }
  }
}

export default function TableContainer(props: TableProps) {
  const { prefixCls } = useDesign('table')
  const { config, columns, data, pagination } = props

  const [columnsData, setColumnsData] = useState(
    cloneDeep(config?.list.columns || columns)
  )

  const { notification } = useMessage()

  const [loading, setLoading] = useState(false)
  const [dataSource, setDataSource] = useState<Record<string, unknown>[]>(
    data ?? []
  )
  const [total, setTotal] = useState(0)
  const [paginationData, setPaginationData] = useState({
    page: 1,
    pageSize: 10
  })
  const [openAddModal, setOpenAddModal] = useState(false)
  const [openUpdateModal, setOpenUpdateModal] = useState(false)

  const [updateData, setUpdateData] = useState(() => ({}))

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
      if (isFunction(config?.list.api)) {
        const { data: res } = (await config?.list.api(requestParams)) as any
        setDataSource(res.rows)
        setTotal(res.total ?? res.rows.length)
      }
    } catch (error) {
      console.error(error)
    } finally {
      setLoading(false)
    }
  }

  async function addConfirm(vlaues: unknown, resetFields?: Function) {
    try {
      if (isFunction(config.create?.api)) {
        await config.create?.api(vlaues)
        await request()
      }
      setOpenAddModal(false)
      resetFields && resetFields()
      notification.success({
        message: '用户添加成功'
      })
    } catch (error) {
      console.error(error)
      notification.error({
        message: (error as any).data.message
      })
    } finally {
      setOpenAddModal(false)
    }
  }

  function addCancel() {
    setOpenAddModal(false)
  }

  async function updateConfirm(values: object, resetFields?: Function) {
    try {
      if (isFunction(config.update?.api)) {
        const requestParams = {
          ...values,
          id: (updateData as any).id
        }
        await config.update?.api(requestParams)
        await request()
      }
      setOpenUpdateModal(false)
      resetFields && resetFields()
      notification.success({
        message: '用户修改成功'
      })
    } catch (error) {
      console.error(error)
      notification.error({
        message: (error as any).data.message
      })
    } finally {
      setOpenUpdateModal(false)
    }
  }
  function updateCancel() {
    setOpenUpdateModal(false)
  }

  const tableAttrs = () => {
    const result: {
      title?: JSX.Element | Function
      scroll?: {
        x?: string | number
        y?: string | number
      }
      size: 'large' | 'middle' | 'small'
      bordered: boolean
    } = {
      scroll: {
        x: 'max-content',
        y: getTableBodyHeight()
      },
      size: 'small',
      bordered: true
    }

    if (config?.create) {
      result['title'] = () => (
        <TableHeader addEvent={() => setOpenAddModal(true)} refresh={request} />
      )
    }

    return result
  }

  function handleOpenUpdate(row: any) {
    setOpenUpdateModal(true)
    setUpdateData(row)
  }

  async function handleDelete(row: any) {
    try {
      const requestParams = {
        id: row.id
      }
      if (isFunction(config.delete?.api)) {
        await config.delete?.api(requestParams)
      }
      await request()
      notification.success({
        message: '删除成功'
      })
    } catch (error) {
      console.error(error)
      notification.error({
        message: '删除失败'
      })
    }
  }

  const initConfig = () => {
    const operate = (row: any) => {
      return (
        <>
          {config?.update && (
            <>
              <Tooltip title="编辑用户资料">
                <Button
                  type="link"
                  onClick={() => handleOpenUpdate(row)}
                  icon={<FormOutlined />}
                />
              </Tooltip>
              {config.delete && <Divider type="vertical" />}
            </>
          )}
          {config?.delete && (
            <PopconfirmButton
              confirmTitle="是否确认删除"
              tipText="删除此账号"
              placement="left"
              onConfirm={() => handleDelete(row)}
            >
              <Button type="link" danger icon={<DeleteOutlined />} />
            </PopconfirmButton>
          )}
        </>
      )
    }
    if (
      (config?.delete || config?.update) &&
      !columnsData.some((item) => item.title === '操作')
    ) {
      setColumnsData([
        ...columnsData,
        {
          title: '操作',
          align: 'center',
          width: '160px',
          fixed: 'right',
          render: (value, row) => operate(row)
        }
      ])
    }
    if (!config?.list.api && props.data) {
      setDataSource(props.data)
    }
  }

  const getTableBodyHeight = () => {
    const tabTheadEl = document.querySelector('.ant-table-tbody')
    const theadBottom = tabTheadEl?.getBoundingClientRect().top ?? 0
    const height = theadBottom + 56

    return `calc(100vh - 1rem - ${height}px)`
  }
  useEffect(() => {
    initConfig()
  }, [])

  useEffect(() => {
    request()
  }, [paginationData])
  return (
    <div
      className={`${prefixCls} h-full bg-white p-2 flex flex-col overflow-hidden`}
      style={{ borderRadius: '6px' }}
    >
      {config?.create && (
        <FormDialog
          title="添加账号"
          open={openAddModal}
          onOk={addConfirm}
          onCancel={addCancel}
          formItems={config.create.formItems}
          rules={config.create?.rules}
        />
      )}
      {config?.update && (
        <FormDialog
          title="修改账号"
          open={openUpdateModal}
          onOk={updateConfirm}
          onCancel={updateCancel}
          formItems={config.update.formItems}
          rules={config.update?.rules}
          defaultValue={updateData}
        />
      )}
      {config?.search && (
        <Search
          searchItems={config.search.formItems}
          onSearch={request}
          className="mt-2 mb-4"
        />
      )}
      <Table
        loading={loading}
        columns={columnsData}
        dataSource={dataSource}
        onChange={paginationChange}
        rowKey={(record) => {
          return record.id || useId()
        }}
        pagination={
          (pagination || !props.data) && {
            total: total,
            showTotal: (total) => `共 ${total} 条数据`,
            pageSizeOptions: [5, 10, 20, 50, 100, 500],
            current: paginationData.page,
            pageSize: paginationData.pageSize,
            showQuickJumper: true,
            showSizeChanger: true,
            position: ['bottomRight']
          }
        }
        {...tableAttrs()}
      />
    </div>
  )
}
