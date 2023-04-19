import type {
  EChartOption,
  DefaultLabelFormatterCallbackParams
} from '@/components/Echart'

export const personOption: EChartOption = {
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

export const proportionLowVisionOption: EChartOption = {
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
