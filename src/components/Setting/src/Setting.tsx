import { Drawer, Divider } from 'antd'

import { Icon } from '@/components/Icon'

import { useDesign } from '@/hooks/web/useDesign'
import { useState } from 'react'
import Theme from './Theme'

import { menuTypes } from './config'
import { useAppDispatch } from '@/store'

import { setProjectConfig } from '@/store/modules/app'
import { useAppSelector } from '@/hooks/web/useApp'

import '../styles/index.scss'

export default function Setting() {
  const { prefixCls } = useDesign('setting')

  const dispatch = useAppDispatch()
  const [openSetting, setOpenSetting] = useState(false)
  const menuType = useAppSelector(
    (state) => state.appStore.projectConfig.menuType
  )

  return (
    <div className={prefixCls}>
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
                  className={`${prefixCls}-layout__${nav.type} ${
                    menuType === nav.type ? `${prefixCls}-layout__active` : ''
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
      <Icon
        type="icon-shezhi"
        style={{ fontSize: '20px' }}
        onClick={() => setOpenSetting(true)}
      />
    </div>
  )
}
