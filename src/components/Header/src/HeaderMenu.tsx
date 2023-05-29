import { Divider, MenuProps, Switch } from 'antd'

import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { Modal, Form, Input, Dropdown, Space, Drawer } from 'antd'
import {
  UserOutlined,
  LockOutlined,
  PoweroffOutlined,
  SyncOutlined
} from '@ant-design/icons'
import { useSelector } from 'react-redux'

import { useDesign } from '@/hooks/web/useDesign'
import localCache from '@/utils/localStore'
import { PageEnum } from '@/enums/pageEnum'
import { RootState } from '@/store'
import { Icon } from '@/components/Icon'
import { cacheEnum } from '@/enums/cacheEnum'

function HeaderMenu() {
  const { prefixCls } = useDesign('header-menu')
  const navigate = useNavigate()
  const { userInfo } = useSelector((state: RootState) => state.userReducer)
  const [isModalOpen, setModalOpen] = useState(false)
  const [openSetting, setOpenSetting] = useState(false)

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

  const menuItems: MenuProps['items'] = [
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

  const rules = {
    pwd: [{ required: true, message: 'Input your password!' }]
  }

  const handleTheme = (isDark: boolean) => {
    const theme = isDark ? 'dark' : 'light'
    localCache.setItem(cacheEnum.THEME_KEY, theme)
  }

  return (
    <>
      <Modal
        title="密码修改"
        open={isModalOpen}
        onOk={() => setModalOpen(false)}
        onCancel={() => setModalOpen(false)}
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
      <Drawer
        title="设置"
        placement="right"
        onClose={() => setOpenSetting(false)}
        open={openSetting}
      >
        <div>
          <Divider style={{ fontSize: '14px', color: '#888' }}>
            界面功能
          </Divider>
          <div className="flex justify-between">
            <span>暗黑模式</span>
            <Switch
              checkedChildren="开"
              unCheckedChildren="关"
              onChange={handleTheme}
            />
          </div>
        </div>
      </Drawer>
      <div className={`${prefixCls} mr-2 flex items-center`}>
        <Dropdown menu={{ items: menuItems }} className="mr-3">
          <Space>
            <UserOutlined style={{ fontSize: '18px' }} />
            <span style={{ marginLeft: '5px', fontSize: '14px' }}>
              {userInfo?.nickname}
            </span>
          </Space>
        </Dropdown>
        <Icon
          type="icon-shezhi"
          style={{ fontSize: '20px' }}
          onClick={() => setOpenSetting(true)}
        />
      </div>
    </>
  )
}

export default HeaderMenu
