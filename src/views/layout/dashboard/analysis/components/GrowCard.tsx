import type { CSSProperties } from 'react'
import CountUp from 'react-countup'
import { Card, Tag, Statistic } from 'antd'
import { Icon } from '@/components/Icon'
import { growCardList } from '../data'

function GrowCard(props: { loading?: boolean }) {
  const { loading } = props

  const getFormatMoney = (val: string | number, style?: CSSProperties) => {
    const value = Number(val ?? 0)
    return <CountUp end={value} separator="," prefix="$" style={{ ...style }} />
  }
  return (
    <div className="md:flex mb-4">
      {growCardList.map((item, index) => {
        return (
          <Card
            key={item.title}
            title={item.title}
            extra={<Tag color={item.color}>{item.tag}</Tag>}
            className={`md:w-1/4 w-full !md:mt-0 ${index < 3 ? 'md:mr-4' : ''}`}
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
              <Statistic
                value={item.total}
                formatter={(val: string | number) =>
                  getFormatMoney(val, { fontSize: '14px' })
                }
              />
            </div>
          </Card>
        )
      })}
    </div>
  )
}

export default GrowCard
