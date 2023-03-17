import type { MenuProps } from 'antd'
import type { RootState } from '@/store'

import React, { useEffect, useState } from 'react'
import { useNavigate, useLocation } from 'react-router-dom'
import { useSelector, useDispatch } from 'react-redux'

import {
  Layout,
  theme,
  Dropdown,
  Space,
  Modal,
  Form,
  Input,
  Divider,
  Tag
} from 'antd'
import {
  MenuFoldOutlined,
  MenuUnfoldOutlined,
  UserOutlined,
  LockOutlined,
  PoweroffOutlined,
  SyncOutlined
} from '@ant-design/icons'
import { useDesign } from '@/hooks/web/useDesign'

import localCache from '@/utils/localStore'
import { PageEnum } from '@/enums/pageEnum'
import { removeTag } from '@/store/modules/menu'

import HeaderTag from './HeaderTag'

import './style/index.scss'

interface Props {
  collapsed: boolean
  setCollapsed: (bool: boolean) => void
}

export function LayoutHeader(props: Props) {
  const {
    token: { colorBgContainer }
  } = theme.useToken()
  const { collapsed, setCollapsed } = props

  const [isModalOpen, setModalOpen] = useState(false)

  const { prefixCls } = useDesign('header')
  const navigate = useNavigate()
  const dispatch = useDispatch()
  const routerLocal = useLocation()
  const tagsList = useSelector((state: RootState) => state.menuReducer.tagList)

  const logout = () => {
    Modal.confirm({
      title: '温馨提醒',
      content: '是否确认退出系统?',
      centered: true,
      okText: '确认',
      cancelText: '取消',
      onOk: () => {
        localCache.clear()
        navigate(PageEnum.BASE_LOGIN, { replace: true })
      }
    })
  }

  const items: MenuProps['items'] = [
    {
      key: 1,
      label: <span onClick={() => setModalOpen(true)}>修改密码</span>,
      icon: <SyncOutlined />
    },
    {
      type: 'divider'
    },
    {
      key: 2,
      label: '锁定屏幕',
      icon: <LockOutlined />,
      disabled: true
    },
    {
      key: 3,
      label: <span onClick={logout}>退出系统</span>,
      icon: <PoweroffOutlined />
    }
  ]

  const handleOk = () => {
    setModalOpen(false)
  }
  const handleCancel = () => {
    setModalOpen(false)
  }

  const rules = {
    pwd: [{ required: true, message: 'Input your password!' }]
  }

  const [tags, setTags] = useState(tagsList)

  function onClickTag(item) {
    if (item.routePath === routerLocal.pathname) return
    navigate(item.routePath)
  }
  function oncloseTag(tag) {
    dispatch(removeTag(tag.routePath))
    if (routerLocal.pathname === `/${tag.routePath}`) {
      navigate(tags.at(-2)?.routePath)
    }
  }

  useEffect(() => {
    setTags(tagsList)
  }, [tagsList])
  return (
    <>
      <Modal
        title="密码修改"
        open={isModalOpen}
        onOk={handleOk}
        onCancel={handleCancel}
      >
        <Form labelCol={{ span: 5 }}>
          <Form.Item label="旧密码" name="oldPwd" rules={rules.pwd}>
            <Input type="password" placeholder="请输入旧密码" />
          </Form.Item>
          <Form.Item label="新密码" name="newPwd" rules={rules.pwd}>
            <Input.Password placeholder="请输入新密码" />
          </Form.Item>
          <Form.Item label="确认新密码" name="againPwd" rules={rules.pwd}>
            <Input.Password placeholder="再次输入新密码" />
          </Form.Item>
        </Form>
      </Modal>
      <Layout.Header
        className={prefixCls}
        style={{ padding: 0, background: colorBgContainer }}
      >
        <div>
          {React.createElement(
            collapsed ? MenuUnfoldOutlined : MenuFoldOutlined,
            {
              className: 'trigger',
              onClick: () => setCollapsed(!collapsed)
            }
          )}
        </div>
        <div className={`${prefixCls}-menu`}>
          <Dropdown menu={{ items }}>
            <Space>
              <UserOutlined style={{ fontSize: '18px' }} />
              <span style={{ marginLeft: '5px', fontSize: '14px' }}>Admin</span>
            </Space>
          </Dropdown>
        </div>
      </Layout.Header>
      <Divider style={{ margin: 0 }} />
      <HeaderTag />
      <Divider style={{ margin: 0 }} />
    </>
  )
}

export default LayoutHeader
