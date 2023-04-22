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
    <div className={`${prefixCls} p-3 flex`} style={props.style}>
      <div className='flex flex-col' style={{ width: '50%' }}>
        <span className="font-bold">理科占比率</span>
        <div className=" mt-6 flex-1 px-3 flex flex-col justify-between ">
          <Counting value={2022130} />
          <div>
            <div className='mb-2'>
              <div className="flex justify-between px-2 text-sm">
                <span>男</span>
                <span>30%</span>
              </div>
              <Progress percent={30} trailColor="#ebeef5" showInfo={false} />
            </div>
            <div>
              <div className="flex justify-between px-2 text-sm">
                <span>女</span>
                <span>75%</span>
              </div>
              <Progress percent={75} trailColor="#ebeef5" showInfo={false} />
            </div>
          </div>
        </div>
      </div>
      <div className="flex" style={{ width: '50%' }}>
        <EChart
          ref={echartInstance}
          option={proportionLowVisionOption}
          style={{ height: '100%', width: '100%' }}
        />
      </div>
    </div>
  )
}

export default ProportionCard
