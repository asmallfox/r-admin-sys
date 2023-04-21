import type { EChartOption } from '@/components/Echart'
import type { CSSProperties } from 'react'
import { EChart } from '@/components/Echart'

import { useDesign } from '@/hooks/web/useDesign'

import { dataStatistics } from '../data'

interface PropsType {
  option?: EChartOption
  style?: CSSProperties
}

function DataStatistics(props: PropsType) {
  const { option = dataStatistics, style } = props
  const { prefixCls } = useDesign('large-screen-statistics')
  return (
    <div className={`${prefixCls} p-2`} style={style}>
      <EChart option={option} width="100%" height="100%" />
    </div>
  )
}

export default DataStatistics
