import type { Ref } from 'react'
import { Pagination } from 'antd'
import { useEffect, useState, forwardRef } from 'react'

interface Props {
  request: (params?: any) => void
  total?: number
  className?: string
}

const TablePagination = forwardRef(function MyInput(
  props: Props,
  ref?: Ref<any>
) {
  const { request, total = 0, className } = props

  const [paginationData, setPaginationData] = useState({
    page: 1,
    pageSize: 10
  })

  const init = async (params?: Record<string, unknown>) => {
    await request(params)
  }

  const onChange = async (page: number, pageSize: number) => {
    const pagingData = {
      page,
      pageSize
    }
    await init(pagingData)
    setPaginationData(pagingData)
  }

  useEffect(() => {
    init()
  }, [])
  return (
    <div className={`${className} flex justify-end`} ref={ref}>
      <Pagination
        total={total}
        showSizeChanger
        showQuickJumper
        current={paginationData.page}
        {...paginationData}
        showTotal={(total) => `共 ${total} 条数据`}
        onChange={onChange}
      />
    </div>
  )
})

export default TablePagination
