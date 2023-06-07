import { useDesign } from '@/hooks/web/useDesign'

import LargerScreenHeader from './components/LargerScreenHeader'
import CountCard from './components/CountCard'
import ProportionCard from './components/ProportionCard'
import DataStatistics from './components/DataStatistics'
import PersonFinished from './components/PersonFinished'
import RegionStatistic from './components/RegionStatistic'
import { cloneDeep } from 'lodash-es'

import { rankingOption, dataStatistics } from './data'

import './style/index.scss'

const LargeScreen = () => {
  const { prefixCls } = useDesign('large-screen')

  const dataStatisticsDeep = cloneDeep(dataStatistics) as any
  if (dataStatisticsDeep?.title) {
    dataStatisticsDeep.title.text = '统计'
    delete dataStatisticsDeep.grid
    delete dataStatisticsDeep.dataZoom
  }

  return (
    <div className={`${prefixCls} p-2 flex flex-col`}>
      <LargerScreenHeader />
      <div className="flex justify-between mb-2" style={{ height: '16rem' }}>
        <CountCard style={{ width: '36%' }} />
        <ProportionCard style={{ width: '27%' }} />
        <DataStatistics style={{ width: '36%' }} />
      </div>
      <div className={`flex-1 flex justify-between`}>
        <div className="map">
          <RegionStatistic />
        </div>
        <div className="flex flex-col justify-between" style={{ width: '27%' }}>
          <div className="flex-1 mb-2">
            <ProportionCard />
          </div>
          <div className="flex-1">
            <DataStatistics option={rankingOption} />
          </div>
        </div>
        <div className="flex flex-col" style={{ width: '36%' }}>
          <div className="flex-1  mb-2">
            <DataStatistics option={dataStatisticsDeep} />
          </div>
          <div className="flex-1">
            <PersonFinished />
          </div>
        </div>
      </div>
    </div>
  )
}

export default LargeScreen
