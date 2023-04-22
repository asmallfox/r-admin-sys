import type { CSSProperties } from 'react'
import { Select } from 'antd'

import { useDesign } from '@/hooks/web/useDesign'

const options = [
  { value: 'jack', label: 'Jack' },
  { value: 'lucy', label: 'Lucy' },
  { value: 'Yiminghe', label: 'yiminghe' },
  { value: 'disabled', label: 'Disabled', disabled: true }
]

function LargerScreenHeader(props: { style?: CSSProperties }) {
  const { prefixCls } = useDesign('large-screen-header')

  return (
    <div
      className={`${prefixCls} flex items-center px-3 py-2 mb-2`}
      style={props.style}
    >
      <span className={`${prefixCls}_title`}>筛查系统--筛查统计中心</span>
      <div className="flex justify-around flex-1">
        <Select
          placeholder="请选择筛查计划"
          defaultValue="Lucy"
          options={options}
          style={{ width: '20%' }}
        />
        <Select placeholder="请选择筛查地区" style={{ width: '20%' }} />
        <Select placeholder="请选择筛查学校" style={{ width: '20%' }} />
      </div>
    </div>
  )
}

export default LargerScreenHeader
