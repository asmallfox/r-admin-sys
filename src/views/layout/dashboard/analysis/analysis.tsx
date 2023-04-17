import { useDesign } from '@/hooks/web/useDesign'
import { useState } from 'react'

import GrowCard from './components/GrowCard'
import SiteAnalysis from './components/SiteAnalysis'
import Detail from './components/DetailRadar'

import './style/index.scss'

const Analysis = () => {
  const { prefixCls } = useDesign('analysis')

  const [loading, setLoading] = useState(true)

  setTimeout(() => {
    setLoading(false)
  }, 1500)

  return (
    <div className={prefixCls}>
      {/* <GrowCard loading={loading} />
      <SiteAnalysis loading={loading} />
      <Detail loading={loading} /> */}
    </div>
  )
}

export default Analysis
