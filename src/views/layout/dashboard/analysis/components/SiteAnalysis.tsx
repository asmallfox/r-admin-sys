import { Card } from 'antd'
import React, { useState } from 'react'

import TrafficTrend from './TrafficTrend'
import Visits from './Visits'

function SiteAnalysis() {
  const tabListTitle = [
    {
      key: 'trafficTrend',
      tab: '流量趋势'
    },
    {
      key: 'visits',
      tab: '访问量'
    }
  ]

  const contentList: Record<string, React.ReactNode> = {
    trafficTrend: <TrafficTrend />,
    visits: <Visits />
  }

  const [activeTabKey, setActiveTabKey] = useState('trafficTrend')

  const onTabChange = (key: string) => {
    console.log(key)
    setActiveTabKey(key)
  }
  return (
    <Card
      tabList={tabListTitle}
      activeTabKey={activeTabKey}
      onTabChange={onTabChange}
    >
      {contentList[activeTabKey]}
    </Card>
  )
}

export default SiteAnalysis
