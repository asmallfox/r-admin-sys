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

  const defaultOptions = {
    grid: {
      left: '0',
      right: '0',
      bottom: '3%',
      containLabel: true
    },
  }

  const options = {
    ...defaultOptions,
    ...props.options,
  }

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
  })

  // return <div className={prefixCls} ref={chartRef} />
  return <div style={{width: '100%'}}>
    <div ref={chartRef} style={{height: '400px'}} ></div>
  </div>
}
export default Eachrt
