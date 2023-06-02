import { Divider, MenuProps } from 'antd'

import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { Modal, Form, Input, Dropdown, Space, Drawer } from 'antd'
import {
  UserOutlined,
  LockOutlined,
  PoweroffOutlined,
  SyncOutlined
} from '@ant-design/icons'

import { useDesign } from '@/hooks/web/useDesign'
import localCache from '@/utils/localStore'
import { PageEnum } from '@/enums/pageEnum'
import { Icon } from '@/components/Icon'
import { useAppSelector } from '@/hooks/web/useApp'

import Theme from './components/Theme'
import { setProjectConfig } from '@/store/modules/app'
import { useAppDispatch } from '@/store'

interface Props {
  className?: string
}

function HeaderMenu({ className = '' }: Props) {
  const { prefixCls } = useDesign('header-menu')
  const navigate = useNavigate()
  const dispatch = useAppDispatch()
  const { userInfo, menuType } = useAppSelector((state) => {
    return {
      userInfo: state.userStore.userInfo,
      menuType: state.appStore.projectConfig.menuType
    }
  })
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

  const menuTypes = [
    {
      title: '垂直',
      mode: 'inline',
      type: 'sidebar'
    },
    {
      title: '水平',
      mode: 'horizontal',
      type: 'sidebar-top'
    },
    {
      title: '顶部log',
      mode: 'inline',
      type: 'sidebar-mix'
    }
  ]

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
        {/* 主题 */}
        <div>
          <Divider style={{ fontSize: '14px', color: '#888' }}>
            界面功能
          </Divider>
          <div className="flex justify-between">
            <span>主题模式</span>
            <Theme />
          </div>
        </div>
        {/* 导航模式 */}
        <div>
          <Divider style={{ fontSize: '14px', color: '#888' }}>
            导航栏布局
          </Divider>

          <div className="flex justify-around items-center">
            {menuTypes.map((nav) => {
              return (
                <div
                  key={nav.type}
                  className={`menu-layout-${nav.type} ${
                    menuType === nav.type ? 'menu-layout-sidebar_active' : ''
                  }`}
                  onClick={() =>
                    dispatch(
                      setProjectConfig({
                        menuType: nav.type,
                        menu: { mode: nav.mode }
                      })
                    )
                  }
                />
              )
            })}
          </div>
        </div>
      </Drawer>
      <div className={`${prefixCls} ${className} mr-2 flex items-center`}>
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
