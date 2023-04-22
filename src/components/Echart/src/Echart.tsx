import type React from 'react'
import type { EChartOption } from './types'

import * as echarts from 'echarts'
import {
  useEffect,
  useRef,
  useImperativeHandle,
  forwardRef,
  CSSProperties
} from 'react'
import { defaultOption } from './config/initEcharts'

interface PropsType {
  id?: string
  option: EChartOption
  style?: CSSProperties
}

type DispatchEvent = boolean | { silent?: boolean; flush?: boolean | undefined }

const RESIZE = 'resize'

const defaultStyle = { height: '280px', width: '100%' }

const EChart = (props: PropsType, ref?: React.Ref<HTMLElement>) => {
  const { id, option: charOption, style = defaultStyle } = props

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

  return <div ref={chartRef} style={style} id={id} />
}

export default forwardRef(EChart)
