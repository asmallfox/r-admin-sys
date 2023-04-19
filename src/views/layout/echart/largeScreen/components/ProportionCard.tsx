import { Progress } from 'antd'

import { useDesign } from '@/hooks/web/useDesign'
import { EChart } from '@/components/Echart'
import Counting from './Counting'

import { proportionLowVisionOption } from '../data'

function ProportionCard() {
  const { prefixCls } = useDesign('large-screen-proportion')

  return (
    <div className={`${prefixCls} p-3 flex`}>
      <div className="basis-1/2">
        <span className="title">视力低下率</span>
        <div className="count flex items-center mt-3 pl-4">
          <Counting value={1231330} />
          <span className="pl-1">人</span>
        </div>
        <div className="mt-6 pl-4">
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
      <div className="basis-1/2">
        <span className="title">视力低下率占比</span>
        <EChart
          option={proportionLowVisionOption}
          height="220px"
          width="100%"
        />
      </div>
    </div>
  )
}

export default ProportionCard
