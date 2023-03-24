import * as echarts from 'echarts'
import { useEffect, useRef } from 'react'
interface PropsType {
  width?: string
  height?: string
  option: any
}

const EChart = (props: PropsType) => {
  const chartRef = useRef<HTMLDivElement>(null)

  const defaultOptions = {
    grid: {
      left: '0',
      right: '0',
      bottom: '3%',
      containLabel: true
    }
  }

  const option = {
    ...defaultOptions,
    ...props.option
  }
  const initChart = () => {
    const chartInstance = echarts.init(chartRef.current)
    chartInstance.setOption(option)
    return chartInstance
  }

  useEffect(() => {
    setTimeout(() => {
      const instance = initChart()
      window.addEventListener('resize', () => {
        instance.resize()
      })
    })
  }, [])

  return <div ref={chartRef} style={{ width: '100%', height: '280px' }} />
}
export default EChart
