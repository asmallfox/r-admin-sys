import { useDesign } from '@/hooks/web/useDesign'

import LargerScreenHeader from './components/LargerScreenHeader'
import CountCard from './components/CountCard'
import ProportionCard from './components/ProportionCard'
import DataStatistics from './components/DataStatistics'
import PersonFinished from './components/PersonFinished'
import _ from 'lodash'

import { rankingOption, dataStatistics } from './data'

const dataStatisticsDeep = _.cloneDeep(dataStatistics)
dataStatisticsDeep.title.text = '统计'
delete dataStatisticsDeep.dataZoom

import './style/index.scss'
import Echart from '@/components/Echart/src/Echart'

const LargeScreen = () => {
  const { prefixCls } = useDesign('large-screen')

  return (
    <div className={`${prefixCls} p-2 flex flex-col`}>
      <LargerScreenHeader />
      <div className="flex justify-between mb-2" style={{ height: '256px' }}>
        <CountCard style={{ width: '36%' }} />
        <ProportionCard style={{ width: '27%' }} />
        <DataStatistics style={{ width: '36%' }} />
      </div>
      <div className={`flex-1 flex justify-between`}>
        <div className="map">
          <span>map</span>
        </div>
        <div
          className="flex flex-col justify-between"
          style={{ width: '27%', height: '100%' }}
        >
          <ProportionCard style={{ marginBottom: '0.25rem', height: '50%' }} />
          <DataStatistics
            option={rankingOption}
            style={{ marginTop: '0.25rem', height: '50%' }}
          />
        </div>
        <div className="flex flex-col h-full" style={{ width: '36%' }}>
          <DataStatistics
            option={dataStatisticsDeep}
            style={{ marginBottom: '0.25rem', height: '50%' }}
          />
          <PersonFinished  style={{ marginTop: '0.25rem', height: '50%' }} />
        </div>
      </div>
    </div>
  )
}

export default LargeScreen
