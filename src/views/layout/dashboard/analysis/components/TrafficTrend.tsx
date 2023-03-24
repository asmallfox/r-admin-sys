import { EChart } from '@/components/Echart'

function TrafficTrend() {
  const option = {
    tooltip: {
      trigger: 'axis',
      axisPointer: {
        type: 'line'
      }
    },
    xAxis: [
      {
        type: 'category',
        data: new Array(18).fill(0).map((_, index) => `${index + 6}:00`)
      }
    ],
    yAxis: {
      type: 'value'
    },
    series: [
      {
        type: 'line',
        stack: 'Total',
        smooth: true,
        showSymbol: false,
        areaStyle: {},
        lineStyle: {
          width: 0
        },
        data: [
          0, 300, 2000, 500, 50, 79, 66666, 399, 234, 800, 1200, 200, 123, 654,
          2500, 233, 20, 0
        ]
      },
      {
        type: 'line',
        stack: 'Total',
        smooth: true,
        showSymbol: false,
        areaStyle: {},
        lineStyle: {
          width: 0
        },
        data: [
          0, 300, 100, 8000, 7000, 18888, 675, 200, 234, 800, 1200, 200, 123, 654,
          900, 3000, 122, 0
        ]
      }
    ]
  }
  return <EChart option={option} />
}

export default TrafficTrend
