import type {
  EChartOption,
  DefaultLabelFormatterCallbackParams
} from '@/components/Echart'
import { EChart } from '@/components/Echart'
import { useDesign } from '@/hooks/web/useDesign'
import './style/index.scss'
import { Statistic, Select, Progress } from 'antd'
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
    tooltip: {
      show: false
    },
    toolbox: {
      show: false
    },
    series: [
      {
        name: '',
        type: 'pie',
        radius: [30, 34],
        color: ['#00FFFF', '#C424FF'],
        clockWise: false,
        hoverAnimation: false,
        label: {
          color: '#ddd',
          formatter: (params: DefaultLabelFormatterCallbackParams) => {
            return `${params.name}:\n${params.value}\n(${params.percent}%)`
          },
          show: true
        },
        labelLine: {
          length: 10,
          length2: 10,

          show: true
        },
        data: [
          {
            value: 20,
            name: '男性',
            itemStyle: {
              borderColor: '#00FFFF',
              borderWidth: 4,
              shadowColor: '#00FFFF',
              shadowBlur: 4
            }
          },
          {
            value: 20,
            name: '女性',
            itemStyle: {
              borderColor: '#C424FF',
              borderWidth: 4,
              shadowColor: '#C424FF',
              shadowBlur: 4
            }
          }
        ]
      }
    ]
  }

  const options = [
    { value: 'jack', label: 'Jack' },
    { value: 'lucy', label: 'Lucy' },
    { value: 'Yiminghe', label: 'yiminghe' },
    { value: 'disabled', label: 'Disabled', disabled: true }
  ]

  const proportionLowVisionOption: EChartOption = {
    color: ['#13e560', '#f7ff26', '#fe9400', '#ff3a3a'],
    legend: {
      bottom: 0,
      textStyle: {
        color: '#fff'
      }
    },
    series: [
      {
        name: '',
        type: 'pie',
        radius: ['34%', '60%'],
        avoidLabelOverlap: false,
        legendHoverLink: false,
        label: {
          show: false,
          fontSize: 16,
          position: 'center',
          formatter: '{text|{b}}\n{d}%',
          rich: {
            text: {
              color: '#fff',
              align: 'center',
              verticalAlign: 'middle'
            }
          }
        },
        emphasis: {
          label: {
            show: true
          }
        },
        itemStyle: {
          borderRadius: 4,
          borderWidth: 4,
          borderColor: '#011548'
        },
        data: [
          { name: '正常', value: 20, label: { color: '#13e560' } },
          { name: '轻度', value: 20, label: { color: '#f7ff26' } },
          { name: '中度', value: 20, label: { color: '#fe9400' } },
          { name: '重度', value: 20, label: { color: '#ff3a3a' } }
        ]
      }
    ]
  }

  return (
    <div className={`${prefixCls} p-2`}>
      <div className={`${prefixCls}-nav flex items-center px-3 mb-2`}>
        <span className={`${prefixCls}-nav_title`}>筛查系统--筛查统计中心</span>
        <div className="flex justify-around flex-1">
          <Select
            placeholder="请选择筛查计划"
            style={{ width: '20%' }}
            options={options}
            defaultValue="Lucy"
          ></Select>
          <Select
            placeholder="请选择筛查地区"
            style={{ width: '20%' }}
          ></Select>
          <Select
            placeholder="请选择筛查学校"
            style={{ width: '20%' }}
          ></Select>
        </div>
      </div>
      <div className="flex justify-between">
        <div className={`${prefixCls}-person flex justify-between`}>
          <div className="flex flex-col items-center" style={{ width: '40%' }}>
            <span className="title mb-2">筛查人数统计</span>
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
            <EChart option={personOption} height="100px" width="100%"></EChart>
          </div>
          <div className="flex flex-col items-center" style={{ width: '40%' }}>
            <span className="title mb-2">远视力检查人数</span>
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
            <EChart option={personOption} height="100px" width="100%"></EChart>
          </div>
          <div className="flex flex-col items-center" style={{ width: '40%' }}>
            <span className="title mb-2">近视检查人数</span>
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
            <EChart option={personOption} height="100px" width="100%"></EChart>
          </div>
        </div>
        <div className={`${prefixCls}-proportion p-3 flex`}>
          <div className="flex-1">
            <span className="title">视力低下率</span>
            <div className="count flex items-center mt-3 pl-4">
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
              <span>人</span>
            </div>
            <div className="mt-6 pl-4">
              <div className="mb-4">
                <div
                  className="flex justify-between px-2"
                  style={{ fontSize: '14px' }}
                >
                  <span>男</span>
                  <span>123</span>
                </div>
                <Progress percent={10} showInfo={false} trailColor="#ebeef5" />
              </div>
              <div>
                <div
                  className="flex justify-between px-2"
                  style={{ fontSize: '14px' }}
                >
                  <span>女</span>
                  <span>123</span>
                </div>
                <Progress percent={60} showInfo={false} trailColor="#ebeef5" />
              </div>
            </div>
          </div>
          <div className="flex-1">
            <span className="title">视力低下率占比</span>
            <EChart
              option={proportionLowVisionOption}
              height="220px"
              width="100%"
            />
          </div>
        </div>
        <div className={`${prefixCls}-person`}></div>
      </div>
    </div>
  )
}

export default NotFount
