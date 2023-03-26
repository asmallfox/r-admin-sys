import type { EChartOption } from '@/components/Echart'
import { EChart } from '@/components/Echart'

function TrafficTrend() {
  const option: EChartOption = {
    tooltip: {
      trigger: 'axis',
      axisPointer: {
        type: 'line'
      }
    },
    xAxis: [
      {
        type: 'category',
        boundaryGap: false,
        data: new Array(18).fill(0).map((_, index) => `${index + 6}:00`),
        splitLine: {
          show: true,
          lineStyle: {
            width: 1,
            type: 'solid',
            color: 'rgba(226,226,226,0.5)'
          }
        },
        axisTick: {
          show: false
        }
      }
    ],
    yAxis: {
      type: 'value',
      max: 80000,
      splitNumber: 4,
      axisTick: {
        show: false
      },
      splitArea: {
        show: true,
        areaStyle: {
          color: ['rgba(255,255,255, 0.2)', 'rgba(226,226,226,0.2)']
        }
      }
    },
    series: [
      {
        type: 'line',
        smooth: true,
        areaStyle: {},
        data: [
          111, 222, 4000, 18000, 33333, 55555, 66666, 33333, 14000, 36000,
          66666, 44444, 22222, 11111, 4000, 2000, 500, 333, 222, 111
        ],
        itemStyle: {
          color: '#5ab1ef'
        }
      },
      {
        type: 'line',
        smooth: true,
        areaStyle: {},
        data: [
          33, 66, 88, 333, 3333, 5000, 18000, 3000, 1200, 13000, 22000, 11000,
          2221, 1201, 390, 198, 60, 30, 22, 11
        ],
        itemStyle: {
          color: '#019680'
        }
      }
    ]
  }
  return (
    <div className="w-full">
      <EChart option={option} />
    </div>
  )
}

export default TrafficTrend
