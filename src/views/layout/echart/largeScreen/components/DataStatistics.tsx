import type { EChartOption } from '@/components/Echart'
import { EChart } from '@/components/Echart'

const option: EChartOption = {
  title: {
    text: '各类学校视力不良率',
    textStyle: {
      color: '#fff'
    }
  },
  tooltip: {
    trigger: 'axis'
  },
  legend: {
    top: 0,
    right: 0,
    data: ['整体', '男生', '女生']
  },
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
      data: [10, 20, 50, 1, 6, 30],
      type: 'bar',
      backgroundStyle: {
        color: 'rgba(180, 180, 180, 0.2)'
      }
    },
    {
      data: [10, 20, 20, 1, 6, 30],
      type: 'bar',
      backgroundStyle: {
        color: 'rgba(180, 180, 180, 0.2)'
      }
    },
    {
      data: [0, 0, 20, 0, 0, 0],
      type: 'bar',
      backgroundStyle: {
        color: 'rgba(180, 180, 180, 0.2)'
      }
    }
  ]
}

function DataStatistics() {
  return <EChart option={option} width="100%" height="100%"></EChart>
}

export default DataStatistics
