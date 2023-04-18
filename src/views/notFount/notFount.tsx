import type { EChartOption } from '@/components/Echart'
import { EChart } from '@/components/Echart'
import { useDesign } from '@/hooks/web/useDesign'
import './style/index.scss'
import { Statistic } from 'antd'
import CountUp from 'react-countup'

const NotFount = () => {
  const { prefixCls } = useDesign('echart')

  const formatter = (value: number) => {
    const formattingFn = (val: number) => {
      return val
    }
    // formattingFn={formattingFn}
    return <CountUp end={value} separator="," />
  }

  const personOption: EChartOption = {
    series: [
      {
        type: 'pie',
        radius: ['45%', '70%'],
        labelLine: {
          length: 30
        },
        color: ['#00ffff', '#c424ff'],
        data: [
          { name: '男', value: 80 },
          { name: '女', value: 123 }
        ]
      }
    ]
  }

  return (
    <div className={`${prefixCls} px-2`}>
      <div className={`${prefixCls}-nav flex items-center px-3 mb-2`}>
        <span className={`${prefixCls}-nav_title`}>筛查系统--筛查统计中心</span>
      </div>
      <div className="flex justify-between">
        <div className={`${prefixCls}-person flex justify-between`}>
          <div className="flex flex-col items-center flex-1">
            <span className="title">筛查人数统计</span>
            <span className="count">
              <Statistic
                valueStyle={{
                  color: '#03dfd5',
                  fontFamily: 'aiweishi',
                  fontSize: '48px',
                  backgroundColor: '#011548'
                }}
                value={1231330}
                formatter={(val: number | string) =>
                  formatter(Number(val) ?? 0)
                }
              />
            </span>
            <EChart option={personOption}></EChart>
          </div>
          <div className="flex flex-col items-center flex-1">
            <span>远视力检查人数</span>
          </div>
          <div className="flex flex-col items-center flex-1">
            <span>近视检查人数</span>
          </div>
        </div>
        <div className={`${prefixCls}-person`}></div>
        <div className={`${prefixCls}-person`}></div>
      </div>
    </div>
  )
}

export default NotFount
