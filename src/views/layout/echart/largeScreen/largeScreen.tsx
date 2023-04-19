import { useDesign } from '@/hooks/web/useDesign'

import LargerScreenHeader from './components/LargerScreenHeader'
import CountCard from './components/countCard'
import ProportionCard from './components/proportionCard'

import './style/index.scss'

const LargeScreen = () => {
  const { prefixCls } = useDesign('large-screen')

  return (
    <div className={`${prefixCls} p-2`}>
      <LargerScreenHeader />
      <div className="flex justify-between">
        <CountCard />
        <ProportionCard />
        <div className={`${prefixCls}-person`}></div>
      </div>
    </div>
  )
}

export default LargeScreen
