import { useDesign } from '@/hooks/web/useDesign'
import { Echart } from '@/components/Echart'
import { Card, Tag, Statistic } from 'antd'
import { Icon } from '@/components/Icon'
import { useState } from 'react'
import CountUp from 'react-countup'

const Analysis = () => {
  const { prefixCls } = useDesign('analysis')

  const [loading, setLoading] = useState(false)

  const times = new Array(19).fill(0).map((_, index) => `${index + 5}:00`)
  const moths = new Array(12).fill(0).map((_, index) => `${index + 1}月`)
  console.log(times,moths)

  const options1 = {
    tooltip: {},
    xAxis: {
      data: [1, 2, 3, 45]
    },
    yAxis: {},
    series: [
      {
        name: 'title',
        type: 'bar',
        data: ['', 100, 200, 300]
      }
    ]
  }

  const options2 = {
    tooltip: {},
    xAxis: {
      data: [1, 2, 3, 45]
    },
    yAxis: {},
    series: [
      {
        name: 'title',
        type: 'bar',
        data: ['', 100, 200, 300]
      }
    ]
  }

  const tagPanels = [
    {
      title: '访问数',
      tag: '月',
      money: 12000,
      total: 5000,
      icon: 'icon-huore',
      color: 'green'
    },
    {
      title: '成交额',
      tag: '月',
      money: 80000,
      total: 5000,
      icon: 'icon-kaitonghuiyuan',
      color: 'blue'
    },
    {
      title: '下载数',
      tag: '周',
      money: 1956,
      total: 5000,
      icon: 'icon-yaoqinghaoyou',
      color: 'orange'
    },
    {
      title: '成交数',
      tag: '年',
      money: 26000,
      total: 5000,
      icon: 'icon-guanjunjiangbei',
      color: 'purple'
    }
  ]

  const getFormatMoney = (val: string | number) => {
    const value = Number(val ?? 0)
    return <CountUp end={value} separator="," prefix='$' />
  }

  return (
    <div className={prefixCls}>
      {/* <div className="flex justify-between">
        {tagPanels.map((item) => {
          return (
            <Card
              key={item.title}
              title={item.title}
              extra={<Tag color={item.color}>{item.tag}</Tag>}
              style={{ width: '23%' }}
              loading={loading}
            >
              <div className="flex justify-between items-center">
                <span className="mr-2" style={{ fontSize: '28px' }}>
                  {getFormatMoney(item.money)}
                </span>
                <Icon type={item.icon} style={{ fontSize: '38px' }} />
              </div>
              <div className="flex items-center justify-between">
                <span className="mr-1">总访问数</span>
                <Statistic value={item.total} formatter={getFormatMoney} />
              </div>
            </Card>
          )
        })}
      </div> */}
      <Echart options={options2} />
    </div>
  )
}

export default Analysis
