import type { ColumnsType } from 'antd/es/table'
import { Tag } from 'antd'
import dayjs from 'dayjs'

import { PageContainer } from '@/components/PageContainer'
import { TableContainer } from '@/components/Table'

import {
  getUserListApi,
  deleteUserByIdApi,
  addUserApi,
  updateUserApi
} from '@/api'

import './style/index.scss'

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
        return (
          <span>{dayjs(new Date(value)).format('YYYY-MM-DD HH:mm:ss')}</span>
        )
      }
    },
    {
      title: '备注',
      dataIndex: 'description',
      align: 'center'
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

  const config = {
    list: {
      api: getUserListApi,
      columns: columns
    },
    create: {
      api: addUserApi,
      formItems: [
        { key: 'username', label: '用户名' },
        {
          key: 'role',
          label: '角色',
          component: 'Select',
          options: roleOption
        },
        { key: 'nickname', label: '昵称' },
        { key: 'description', label: '备注' }
      ],
      rules: rules
    },
    update: {
      api: updateUserApi,
      formItems: [
        { key: 'username', label: '用户名' },
        {
          key: 'role',
          label: '角色',
          component: 'Select',
          options: roleOption
        },
        { key: 'nickname', label: '昵称' },
        { key: 'description', label: '备注' }
      ],
      rules: rules
    },
    delete: {
      api: deleteUserByIdApi
    },
    search: {
      formItems: [
        { key: 'username', label: '用户名' },
        { key: 'username', label: '昵称' }
      ]
    }
  }

  return (
    <PageContainer>
      <TableContainer config={config} />
    </PageContainer>
  )
}

export default SysAdmin
