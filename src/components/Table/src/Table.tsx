import type { ColumnsType, TablePaginationConfig } from 'antd/es/table'

import { useEffect, useState, useId, useRef, useMemo } from 'react'
import { Table, Button, Tooltip, Divider, Pagination, theme } from 'antd'
import { DeleteOutlined, FormOutlined } from '@ant-design/icons'
import { cloneDeep } from 'lodash'
import axios from 'axios'

import { useMessage } from '@/hooks/web/useMessage'
import { isFunction, isString } from '@/utils/is'

import Search from './Search'
import TableHeader from './TableHeader'
import { FormDialog } from '@/components/FormDialog'
import { PopconfirmButton } from '@/components/PopconfirmButton'
import { useDesign } from '@/hooks/web/useDesign'
import '../styles/table.scss'
import TablePagination from './TablePagination'

type TColumnsType<T = any> = ColumnsType<T>
type Api = string | (<T = any>(rgms?: T) => Promise<T>) | any

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

  const paginationRef = useRef<HTMLDivElement>(null)

  const [columnsData, setColumnsData] = useState(
    () => config?.list.columns || columns || []
  )

  const { notification } = useMessage()

  const [loading, setLoading] = useState(false)

  const [dataSource, setDataSource] = useState<Record<string, unknown>[]>()

  const [total, setTotal] = useState<number>()
  const [openAddModal, setOpenAddModal] = useState(false)
  const [openUpdateModal, setOpenUpdateModal] = useState(false)

  const [updateData, setUpdateData] = useState(() => ({}))

  async function request(params?: Record<string, unknown>) {
    try {
      if (!config?.list.api) return
      setLoading(true)

      const requestParams = {
        order: 'desc',
        ...params
      }

      let res

      if (isFunction(config.list.api)) {
        res = (await config.list.api(requestParams)) as any
      } else {
        res = await axios.get(config.list.api, {
          params: requestParams
        })
      }
      if (res.data) {
        setDataSource(res.data.rows)
        setTotal(res.data.total || 0)
      }
    } catch (err) {
      console.error(err)
    } finally {
      setLoading(false)
    }
  }

  async function addConfirm(vlaues: unknown, resetFields?: Function) {
    try {
      if (isFunction(config?.create?.api)) {
        await config?.create?.api(vlaues)
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

  async function updateConfirm(values: object, resetFields?: Function) {
    try {
      if (isFunction(config?.update?.api)) {
        const requestParams = {
          ...values,
          id: (updateData as any).id
        }
        await config?.update?.api(requestParams)
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

  async function handleDelete(row: any) {
    try {
      const requestParams = {
        id: row.id
      }
      if (isFunction(config?.delete?.api)) {
        await config?.delete?.api(requestParams)
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

  const initOperate = () => {
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

  const tableAttrs = () => {
    const result: {
      title?: JSX.Element | Function
      scroll?: {
        x?: string | number
        y?: string | number
      }
    } = {
      scroll: {
        x: 'max-content',
        y: getTableBodyHeight()
      }
    }

    if (config?.create) {
      result['title'] = () => (
        <TableHeader addEvent={() => setOpenAddModal(true)} refresh={request} />
      )
    }

    return result as any
  }

  function handleOpenUpdate(row: any) {
    setOpenUpdateModal(true)
    setUpdateData(row)
  }

  const getTableBodyHeight = () => {
    const tabTheadEl = document.querySelector('.ant-table-tbody')
    const theadBottom = tabTheadEl?.getBoundingClientRect().top ?? 0
    const paginationHeight = paginationRef.current?.offsetHeight ?? 0
    const height = theadBottom + paginationHeight
    return `calc(100vh - ${height}px - 1rem)`
  }

  const {token} = theme.useToken()

  useEffect(() => {
    initOperate()
    setDataSource(data)
  }, [])

  return (
    <div
      className={`${prefixCls} h-full p-2 flex flex-col overflow-hidden`}
      style={{ borderRadius: '6px', background: token.colorBgContainer }}
    >
      {config?.create && (
        <FormDialog
          title="添加账号"
          open={openAddModal}
          onOk={addConfirm}
          onCancel={() => setOpenAddModal(false)}
          formItems={config.create.formItems}
          rules={config.create?.rules}
        />
      )}
      {config?.update && (
        <FormDialog
          title="修改账号"
          open={openUpdateModal}
          onOk={updateConfirm}
          onCancel={() => setOpenUpdateModal(false)}
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
        ref={paginationRef}
        loading={loading}
        columns={columnsData}
        dataSource={dataSource}
        rowKey={(record) => record.id || useId()}
        pagination={false}
        size="small"
        bordered={true}
        {...tableAttrs()}
      />
      {config?.list.api && (
        <TablePagination
          request={request}
          total={total}
          ref={paginationRef}
          className="py-2"
        />
      )}
    </div>
  )
}
