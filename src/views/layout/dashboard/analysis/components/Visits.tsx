import { EChart } from '@/components/Echart'

function Visits() {
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
        data: new Array(12).fill(0).map((_, index) => `${index + 1}月`)
      }
    ],
    yAxis: {
      type: 'value'
    },
    series: [
      {
        type: 'bar',
        color: '#37a3db',
        data: [
          200, 300, 100, 500, 50, 79, 675, 399, 234, 800, 1200, 200]
      }
    ]
  }
  return <EChart option={option} />
}

export default Visits