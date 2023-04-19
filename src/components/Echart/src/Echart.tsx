import type { EChartOption } from './types'

import * as echarts from 'echarts'
import { useEffect, useRef } from 'react'

interface PropsType {
  width?: string
  height?: string
  option: EChartOption
}

const defaultOption = {
  grid: { left: '1%', right: '1%', top: '2%', bottom: 0, containLabel: true }
}

const RESIZE = 'resize'

const EChart = (props: PropsType) => {
  const { option: charOption, width = '100%', height = '280px' } = props

  const chartRef = useRef<HTMLDivElement>(null)

  let chartInstance: echarts.EChartsType

  const initEChart = () => {
    if (!echarts.getInstanceByDom(chartRef?.current as HTMLDivElement)) {
      chartInstance = echarts.init(chartRef?.current as HTMLDivElement)
      chartInstance.setOption({
        ...defaultOption,
        ...charOption
      })
    }
  }

  const handleResize = () => {
    if (chartInstance) {
      chartInstance.resize()
    }
  }

  useEffect(() => {
    if (charOption) {
      setTimeout(() => {
        initEChart()
      }, 200)
    }
  }, [charOption])

  useEffect(() => {
    window.addEventListener(RESIZE, handleResize)
    return () => {
      window.removeEventListener(RESIZE, handleResize)
    }
  })

  return <div ref={chartRef} style={{ width, height }} />
}
export default EChart
