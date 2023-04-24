import type { EChartOption } from '@/components/Echart'
import { Card } from 'antd'
import { EChart } from '@/components/Echart'

interface DataType {
  title: string
  option: EChartOption
}
const data: DataType[] = [
  {
    title: '转化率',
    option: {
      legend: {
        bottom: 0,
        data: ['访问', '购买']
      },
      tooltip: {},
      radar: {
        radius: '60%',
        splitNumber: 8,
        indicator: [
          { name: '电脑' },
          { name: '耳机' },
          { name: 'Ipad' },
          { name: '手机' },
          { name: '蓝牙' },
          { name: '充电器' }
        ],
        splitArea: {}
      },
      series: [
        {
          type: 'radar',
          symbolSize: 0,
          areaStyle: {
            shadowBlur: 0,
            shadowColor: 'rgba(0,0,0,.2)',
            shadowOffsetX: 0,
            shadowOffsetY: 10,
            opacity: 1
          },
          data: [
            {
              value: [90, 50, 86, 40, 50, 20],
              name: '访问',
              itemStyle: {
                color: '#b6a2de'
              }
            },
            {
              value: [70, 75, 70, 76, 20, 85],
              name: '购买',
              itemStyle: {
                color: '#5ab1ef'
              }
            }
          ]
        }
      ]
    }
  },
  {
    title: '访问来源',
    option: {
      tooltip: {
        trigger: 'item'
      },
      legend: {
        bottom: 0
      },
      series: [
        {
          type: 'pie',
          name: '访问来源',
          radius: ['40%', '70%'],
          color: ['#5ab1ef', '#b6a2de', '#67e0e3', '#2ec7c9'],
          avoidLabelOverlap: false,
          itemStyle: {
            borderRadius: 10,
            borderColor: '#fff',
            borderWidth: 2
          },
          label: {
            show: false,
            position: 'center'
          },
          emphasis: {
            label: {
              show: true,
              fontSize: 12,
              fontWeight: 'bold'
            }
          },
          labelLine: {
            show: false
          },
          data: [
            { value: 1048, name: '搜索引擎' },
            { value: 735, name: '直接访问' },
            { value: 580, name: '邮件营销' },
            { value: 484, name: '联盟广告' }
          ],
          animationType: 'scale',
          animationEasing: 'exponentialInOut',
          animationDelay: () => Math.random() * 100
        }
      ]
    }
  },
  {
    title: '成交占比',
    option: {
      series: [
        {
          name: '成交占比',
          color: ['#5ab1ef', '#b6a2de', '#67e0e3', '#2ec7c9'],
          type: 'pie',
          radius: '80%',
          center: ['50%', '50%'],
          itemStyle: {
            borderRadius: 8
          },
          data: [
            { value: 500, name: '电子产品' },
            { value: 310, name: '服装' },
            { value: 274, name: '化妆品' },
            { value: 400, name: '家居' }
          ].sort(function (a, b) {
            return a.value - b.value
          }),
          roseType: 'radius',
          animationType: 'scale',
          animationEasing: 'exponentialInOut',
          animationDuration: () => Math.random() * 100
        }
      ]
    }
  }
]

function Detail(props: { loading: boolean }) {
  const { loading } = props

  return (
    <div className="mt-4 md:flex">
      {data.map((item, index) => {
        return (
          <Card
            title={item.title}
            key={index}
            loading={loading}
            className={`md:w-1/3 w-full ${
              index < data.length - 1 ? 'md:mr-4' : ''
            }`}
          >
            <EChart option={item.option} />
          </Card>
        )
      })}
    </div>
  )
}

export default Detail
