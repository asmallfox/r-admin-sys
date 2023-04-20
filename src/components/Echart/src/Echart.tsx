import type React from 'react'
import type { EChartOption } from './types'

import * as echarts from 'echarts'
import { useEffect, useRef, useImperativeHandle, forwardRef } from 'react'
import { defaultOption } from './config/initEcharts'

interface PropsType {
  width?: string
  height?: string
  option: EChartOption
  id?: string
}

const RESIZE = 'resize'

const EChart = (props: PropsType, ref?: React.Ref<HTMLElement>) => {
  const { option: charOption, width = '100%', height = '280px', id } = props

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

  type DispatchEvent =
    | boolean
    | { silent?: boolean; flush?: boolean | undefined }

  useImperativeHandle(
    ref,
    (): any => ({
      dispatchEvent: (payload: echarts.Payload, opt?: DispatchEvent): void => {
        chartInstance.dispatchAction(payload, opt)
      },
      on: (key: string, handler: () => void) => {
        chartInstance.on(key, handler)
      }
    }),
    []
  )

  const handleResize = () => {
    if (chartInstance) {
      chartInstance.resize()
    }
  }
  useEffect(() => {
    if (charOption) {
      initEChart()
    }
  }, [charOption])

  useEffect(() => {
    window.addEventListener(RESIZE, handleResize)
    return () => {
      window.removeEventListener(RESIZE, handleResize)
    }
  }, [])

  return <div ref={chartRef} style={{ width, height }} id={id} />
}

export default forwardRef(EChart)
