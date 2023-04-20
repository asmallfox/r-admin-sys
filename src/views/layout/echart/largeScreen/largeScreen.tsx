import { useDesign } from '@/hooks/web/useDesign'

import LargerScreenHeader from './components/LargerScreenHeader'
import CountCard from './components/CountCard'
import ProportionCard from './components/ProportionCard'
import DataStatistics from './components/DataStatistics'

import './style/index.scss'

const LargeScreen = () => {
  const { prefixCls } = useDesign('large-screen')

  return (
    <div className={`${prefixCls} p-2`}>
      <LargerScreenHeader />
      <div className="flex justify-between mb-2">
        <CountCard />
        <ProportionCard />
        <DataStatistics />
      </div>
      <div>
        <span>地图</span>
      </div>
    </div>
  )
}

export default LargeScreen
