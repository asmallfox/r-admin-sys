import { Progress } from 'antd'

import { useDesign } from '@/hooks/web/useDesign'
import type { CSSProperties } from 'react'
import { EChart } from '@/components/Echart'
import Counting from './Counting'

import { proportionLowVisionOption } from '../data'
import { useEffect, useRef } from 'react'

function ProportionCard(props: { style?: CSSProperties }) {
  const { prefixCls } = useDesign('large-screen-proportion')

  const echartInstance = useRef<HTMLElement>(null)

  useEffect(() => {
    if (proportionLowVisionOption?.series?.length) {
      let index = 0
      const echartIntervalFn = () => {
        echartInstance?.current?.dispatchEvent({
          type: 'downplay',
          seriesId: 'proportion'
        })
        echartInstance?.current?.dispatchEvent({
          type: 'highlight',
          seriesId: 'proportion',
          dataIndex: [index]
        })
        index++
        if (index >= proportionLowVisionOption?.series[0].data.length) {
          index = 0
        }
      }
      let interval = setInterval(echartIntervalFn, 1500)

      echartInstance?.current?.on('mouseover', (e) => {
        clearInterval(interval)
        echartInstance?.current?.dispatchEvent({
          type: 'downplay',
          seriesId: 'proportion'
        })
        echartInstance?.current?.dispatchEvent({
          type: 'highlight',
          seriesId: 'proportion',
          dataIndex: [e.dataIndex]
        })
      })
      echartInstance?.current?.on('mouseout', (e) => {
        echartInstance?.current?.dispatchEvent({
          type: 'downplay',
          seriesId: 'proportion'
        })
        index = e.dataIndex
        interval = setInterval(echartIntervalFn, 1500)
      })
    }
  }, [])

  return (
    <div className={`${prefixCls} p-3 flex box-border`} style={props.style}>
      <div className="basis-1/2 flex flex-col justify-between">
        <span className="title">视力低下率</span>
        <div className="count flex items-center mt-3 pl-4">
          <Counting value={1231330} />
          <span className="pl-1">人</span>
        </div>
        <div className="mt-6 px-4">
          <div className="mb-4">
            <div
              className="flex justify-between px-2"
              style={{ fontSize: '14px' }}
            >
              <span>男</span>
              <span>20%</span>
            </div>
            <Progress percent={10} showInfo={false} trailColor="#ebeef5" />
          </div>
          <div>
            <div
              className="flex justify-between px-2"
              style={{ fontSize: '14px' }}
            >
              <span>女</span>
              <span>60%</span>
            </div>
            <Progress percent={60} showInfo={false} trailColor="#ebeef5" />
          </div>
        </div>
      </div>
      <div className="basis-1/2 flex flex-col justify-between">
        <span className="title">视力低下率占比</span>
        <EChart
          option={proportionLowVisionOption}
          width="100%"
          id="proportion"
          ref={echartInstance}
        />
      </div>
    </div>
  )
}

export default ProportionCard
