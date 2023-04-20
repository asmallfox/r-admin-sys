import type { EChartOption } from '@/components/Echart'
import * as echarts from 'echarts'
import { EChart } from '@/components/Echart'

import { useDesign } from '@/hooks/web/useDesign'

const option: EChartOption = {
  title: {
    text: '各类学校视力不良率',
    textStyle: {
      color: '#fff'
    }
  },
  tooltip: {
    trigger: 'axis',
    axisPointer: {
      type: 'shadow'
    }
  },
  grid: {
    left: '1%',
    right: '1%',
    bottom: 20,
    containLabel: true
  },
  legend: {
    top: 0,
    right: 0,
    data: ['整体', '男生', '女生'],
    textStyle: {
      color: '#fff'
    }
  },
  dataZoom: [
    {
      type: 'slider',
      start: 30,
      end: 75,
      height: 16,
      bottom: 2,
      brushSelect: false,
      textStyle: {
        color: '#fff',
        fontSize: 12
      },
      dataBackground: {
        lineStyle: {
          opacity: 0
        },
        areaStyle: {
          opacity: 0
        }
      },
      selectedDataBackground: {
        lineStyle: {
          opacity: 0
        },
        areaStyle: {
          opacity: 0
        }
      }
    }
  ],
  xAxis: {
    type: 'category',
    data: ['幼儿园', '小学', '初中', '高中', '职高', '大学']
  },
  yAxis: {
    type: 'value',
    max: 100,
    splitNumber: 5
  },
  series: [
    {
      name: '整体',
      type: 'bar',
      data: [10, 20, 50, 1, 6, 30],
      itemStyle: {
        color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [
          { offset: 0, color: '#ccfbff' },
          { offset: 0.65, color: '#ddcae5' },
          { offset: 1, color: '#ee96c5' }
        ])
      }
    },
    {
      name: '男生',
      type: 'bar',
      data: [10, 20, 20, 1, 6, 30],
      itemStyle: {
        color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [
          { offset: 0, color: '#eebd89' },
          { offset: 0.65, color: '#df7ea6' },
          { offset: 1, color: '#d13abd' }
        ])
      }
    },
    {
      name: '女生',
      type: 'bar',
      data: [0, 0, 20, 0, 0, 0],
      itemStyle: {
        color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [
          { offset: 0, color: '#C973FF' },
          { offset: 0.65, color: '#bf95fc' },
          { offset: 1, color: '#AEBAF8' }
        ])
      }
    }
  ]
}

function DataStatistics() {
  const { prefixCls } = useDesign('large-screen-statistics')
  return (
    <div className={`${prefixCls} p-2`}>
      <EChart option={option} width="100%" height="100%"></EChart>
    </div>
  )
}

export default DataStatistics
