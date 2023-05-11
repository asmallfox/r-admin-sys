import type { ColumnsType, TablePaginationConfig } from 'antd/es/table'
import { useEffect, useState } from 'react'
import {
  Table,
  Tooltip,
  Tag,
  Button,
  Card,
  Divider,
  Modal,
  Form,
  Input,
  Select
} from 'antd'
import {
  ExclamationCircleOutlined,
  FormOutlined,
  DeleteOutlined,
  RedoOutlined
} from '@ant-design/icons'
import dayjs from 'dayjs'
import { PageContainer, headerKey } from '@/components/PageContainer'

import {
  getUserListApi,
  deleteUserByIdApi,
  addUserApi,
  updateUserApi
} from '@/api'
import { useMessage } from '@/hooks/web/useMessage'
import PopconfirmButton from './components/PopconfirmButton'
import { useNavigate } from 'react-router-dom'

import './style/index.scss'

import { TableContainer } from '@/components/Table'

interface DataType {
  id: number | string
  username: string
  nickname: string
  createTime: number
  role: number
  description: string
}

const ROLE_OPTION = {
  '1': {
    title: '管理员',
    color: 'magenta'
  },
  '2': {
    title: '开发',
    color: 'orange'
  },
  '3': {
    title: '运维',
    color: 'green'
  },
  '4': {
    title: '产品',
    color: 'blue'
  }
} as const

function SysAdmin() {
  const columns: ColumnsType<DataType> = [
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
      align: 'center',
      dataIndex: 'role',
      render: (value: keyof typeof ROLE_OPTION) => {
        const data = ROLE_OPTION[value]
        return <Tag color={data.color}>{data.title}</Tag>
      }
    },
    {
      title: '创建时间',
      dataIndex: 'createTime',
      align: 'center',
      render: (value: number) => {
        return <span>{dayjs(new Date(value)).format('YYYY-MM-DD')}</span>
      }
    },
    {
      title: '备注',
      dataIndex: 'description',
      align: 'center'
    },
    {
      title: '操作',
      align: 'center',
      width: '160px',
      render: (value, row) => {
        return (
          <div className="flex justify-center items-center">
            <Tooltip title="查看用户详情">
              <Button
                type="link"
                onClick={() => handleDetail(row)}
                icon={<ExclamationCircleOutlined />}
              />
            </Tooltip>
            <Divider type="vertical" />
            <Tooltip title="编辑用户资料">
              <Button
                type="link"
                onClick={() => handleOpenEditor(row)}
                icon={<FormOutlined />}
              />
            </Tooltip>
            <Divider type="vertical" />
            <PopconfirmButton
              confirmTitle="是否确认删除"
              tipText="删除此账号"
              placement="left"
              onConfirm={() => handleDelete(row)}
            >
              <Button type="link" danger icon={<DeleteOutlined />} />
            </PopconfirmButton>
          </div>
        )
      }
    }
  ]

  const navigate = useNavigate()
  const { notification } = useMessage()
  const [userList, setUserList] = useState<DataType[]>([])
  const [total, setTotal] = useState(0)
  const [loading, setLoading] = useState(false)
  const [openAddModal, setOpenAddModal] = useState(false)
  const [openEditModal, setOpenEditModal] = useState(false)

  const [addForm] = Form.useForm()
  const [editForm] = Form.useForm()
  const [searchForm] = Form.useForm()

  const [paginationData, setPaginationData] = useState({
    page: 1,
    pageSize: 10
  })

  const handleDetail = (row: DataType) => {
    navigate(`/user/administrator/super-admin_detail/${row.id}`)
  }

  const handleDelete = async (row: DataType) => {
    try {
      const requestParams = {
        id: row.id
      }
      await deleteUserByIdApi(requestParams)
      await getUserListRequest()
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

  const handleEdit = async () => {
    try {
      const values = await editForm.validateFields()
      await updateUserApi({
        ...values,
        id: editForm.getFieldValue('id')
      })
      await getUserListRequest()
      setOpenEditModal(false)
      notification.success({
        message: '编辑成功'
      })
    } catch (error) {
      console.error(error)
    }
  }

  const handleOpenEditor = (row: DataType) => {
    editForm.setFieldsValue({
      id: row.id,
      username: row.username,
      nickname: row.nickname,
      role: row.role,
      description: row.description
    })
    setOpenEditModal(true)
  }

  const getUserListRequest = async () => {
    try {
      setLoading(true)
      const requestParams: any = {
        ...paginationData,
        order: 'desc'
      }
      const searchData = searchForm.getFieldsValue()
      for (const key in searchData) {
        if (searchData[key] !== '') {
          requestParams[key] = searchData[key]
        }
      }

      const { data: res } = await getUserListApi(requestParams)
      if (res.rows) {
        setUserList(res.rows)
        setTotal(res.total)
      }
    } catch (error) {
      console.error(error)
    } finally {
      setLoading(false)
    }
  }

  const paginationChange = async (pagination: TablePaginationConfig) => {
    setPaginationData({
      page: pagination.current ?? 1,
      pageSize: pagination.pageSize ?? 10
    })
  }

  const refresh = async () => {
    await getUserListRequest()
  }

  const handleAdd = async () => {
    try {
      const formData = await addForm.validateFields()
      await addUserApi(formData)
      await getUserListRequest()
      setOpenAddModal(false)
      notification.success({
        message: '用户添加成功'
      })
    } catch (error) {
      console.error(error)
      notification.error({
        message: error.data.message
      })
    }
  }

  const onSearchReset = async () => {
    searchForm.resetFields(['username', 'nickname'])
    paginationChange({ current: 1, pageSize: 10 } as TablePaginationConfig)
  }

  const TableHeader = () => {
    return (
      <div className="flex justify-between items-center">
        <span className="text-base">账号列表</span>
        <div className="flex items-center">
          <Button type="primary" onClick={() => setOpenAddModal(true)}>
            新增账号
          </Button>
          <Divider type="vertical" />
          <div>
            <RedoOutlined onClick={refresh} />
          </div>
        </div>
      </div>
    )
  }

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

  useEffect(() => {
    getUserListRequest()
  }, [paginationData])

  return (
    <div className="p-4">
      <Modal
        title={
          <div>
            <span>新增账号</span>
            <Divider />
          </div>
        }
        open={openAddModal}
        onOk={handleAdd}
        onCancel={() => setOpenAddModal(false)}
      >
        <Form
          labelAlign="right"
          labelCol={{ span: 4 }}
          form={addForm}
          name="subForm"
        >
          <Form.Item
            label="用户名"
            tooltip="该字段用于登录"
            name="username"
            rules={rules.username}
          >
            <Input placeholder="请输入" />
          </Form.Item>
          <Form.Item label="角色" name="role" rules={rules.role}>
            <Select options={roleOption} placeholder="请选择" />
          </Form.Item>
          <Form.Item label="昵称" name="nickname" rules={rules.nickname}>
            <Input placeholder="请输入" />
          </Form.Item>
          <Form.Item label="备注" name="description">
            <Input placeholder="请输入" />
          </Form.Item>
        </Form>
      </Modal>
      <Modal
        title={
          <div>
            <span>修改用户信息</span>
            <Divider />
          </div>
        }
        open={openEditModal}
        onOk={handleEdit}
        onCancel={() => setOpenEditModal(false)}
      >
        <Form
          labelAlign="right"
          labelCol={{ span: 4 }}
          form={editForm}
          name="subForm"
        >
          <Form.Item
            label="用户名"
            tooltip="该字段用于登录"
            name="username"
            rules={rules.username}
          >
            <Input placeholder="请输入" />
          </Form.Item>
          <Form.Item label="角色" name="role" rules={rules.role}>
            <Select options={roleOption} placeholder="请选择" />
          </Form.Item>
          <Form.Item label="昵称" name="nickname" rules={rules.nickname}>
            <Input placeholder="请输入" />
          </Form.Item>
          <Form.Item label="备注" name="description">
            <Input placeholder="请输入" />
          </Form.Item>
        </Form>
      </Modal>
      <Card>
        <TableContainer api={getUserListApi} columns={columns} />
        <div className="flex justify-between items-center">
          <Form layout="inline" form={searchForm}>
            <Form.Item label="用户名" name="username">
              <Input />
            </Form.Item>
            <Form.Item label="昵称" name="nickname">
              <Input />
            </Form.Item>
            <Form.Item>
              <Button
                type="primary"
                className="mr-3"
                onClick={getUserListRequest}
              >
                查询
              </Button>
              <Button onClick={onSearchReset}>重置</Button>
            </Form.Item>
          </Form>
        </div>
        <Divider />

        <Table
          loading={loading}
          columns={columns}
          dataSource={userList}
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
          title={() => <TableHeader />}
        />
      </Card>
    </div>
  )
}

export default SysAdmin
