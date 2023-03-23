import * as echarts from 'echarts'
import { useEffect, useRef } from 'react'
import { useDesign } from '@/hooks/web/useDesign'

import './style/echart.scss'

interface PropsType {
  width: string
  height: string
  options: any
}

const Eachrt = (props: PropsType) => {
  const { prefixCls } = useDesign('echart')
  const chartRef = useRef<HTMLDivElement>(null)

  const { options } = props

  const initChart = () => {
    const chartInstance = echarts.init(chartRef.current)
    chartInstance.setOption(options)

    return chartInstance
  }

  useEffect(() => {
    const instance = initChart()
    window.addEventListener('resize', () => {
      instance.resize()
    })
  }, [])

  return <div className={prefixCls} ref={chartRef} />
}
export default Eachrt
