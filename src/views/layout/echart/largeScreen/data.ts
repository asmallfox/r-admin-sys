import type {
  EChartOption,
  DefaultLabelFormatterCallbackParams
} from '@/components/Echart'

import * as echarts from 'echarts'

const img =
  'data:image/png;base64,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'
const man =
  'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAFAAAAByCAMAAADzq6aiAAABpFBMVEUAAAAA//8A//8A//8A//8A//8A//8A//8A//8A//8A//8A//8A//8A//8A//8A//8A//8A//8A//8A//8A//8A//8A//8A//8A//8A//8A//8A//8A//8A//8A//8A//8A//8A//8A//8A//8A//8A//8A//8A//8A//8A//8A//8A//8A//8A//8A//8A//8A//8A//8A//8A//8A//8A//8A//8A//8A//8A//8A//8A//8A//8A//8A//8A//8A//8A//8A//8A//8A//8A//8A//8A//8A//8A//8A//8A//8A//8A//8A//8A//8A//8A//8A//8A//8A//8A//8A//8A//8A//8A//8A//8A//8A//8A//8A//8A//8A//8A//8A//8A//8A//8A//8A//8A//8A//8A//8A//8A//8A//8A//8A//8A//8A//8A//8A//8A//8A//8A//8A//8A//8A//8A//8A//8A//8A//8A//8A//8A//8A//8A//8A//8A//8A//8A//8A//8A//8A//8A//8A//8A///ZqXRjAAAAi3RSTlMAAQIDBAYICQoMDQ4RExQWGBkaGxweHyAmJyksLTU4OTo7PD5AQkZHTk9QUVJTVFVYWVpgZGhqa21ucXJzdHZ5fX+AgYKDhoeIi5CRk5WWmZqbn6ChoqOlpqeoqaqsrrW2t7i5uru8vcPFx8jQ0tTX293e4OHi4+Tl5+jr7e7v8PHy8/T2+fr7/P3+d8xxFQAAAmtJREFUaN7t2vlb0zAYB/AAm1zeyKGIByKiQ9zwxgMRhifMCYooh4qgzrMw2awKKhZs80+7jbqkkGzpm/mDz/N+f1rfJZ9nT9ulTVNCiqfu0nTSspJPL9eRUmTnyBp1s/Zgt753/BvlshzS9c7a1BP7nJ53coOXEbt0vPoluinfGzTAJ1SQCbi31xaB9j4weJMKcwsMvhODH6BetS0GnRog2Ewl2Q8ED8vAQ0CwRQa2AMFdMnAP9Kh8EXtLZVBwQgxOgc/DTjF4CgwGDJE3H4D/mbtEoNb4NbbZG9MaYCtfbfQSVXpDdvW013tWq3tRKe/5wbifV8pLcB3dfv3jOmf07wBdRyIDsdH4bZZYLPZ8cXU1NZP5cIeV46P3Brrri2ll4YRDfcR5Eym4ExpeU99JNMq9ps8UELNZ5m01KCjJbRJwhALzUDJA21DQOSgE71Na2p9owMGUELRYA2u2qG7Mcu0dIcifCaSvGNhHTG4LQQQRRBBBBBFEEEG/4C/2/aIKuMDd/gnBt6zBSxXwBdt4LwSjrEGPCniBbdwQPxtdzu/CWhWwJp2fU0qepHb+dvdIO1EBSZt7U2xHZDOfjtxMauEoUQNJW+64mCcKTODDg9FQkKiCJBiKDobVpvhqoI/8Y3AlnclKCcHhbGkYQQQRRBBBBBFEEMH/Brzm6T2ULd3VAs97ekezpX5P6aJP8ICnd+79iw5PqdXvYtk8v1ybu9Gv/MqVPlX4Xes6zfXuXS9d5Upn/K+ePc53nnNXVwNz+dIkYDmuYshdPxvf8rdU5b6Z4cSDoBXC1kcpy5w6xpfaJ00rPX6kQKc/RsXweS7aQLIAAAAASUVORK5CYII='
const woman =
  'data:image/png;base64,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'

export const personOption: EChartOption = {
  tooltip: {
    show: false
  },
  toolbox: {
    show: false
  },
  graphic: {
    elements: [
      {
        type: 'image',
        top: 'center',
        left: 'center',
        z: 3,
        style: {
          image: img,
          width: 42,
          height: 42
        }
      },
      {
        type: 'image',
        top: 'center',
        right: '50%',
        z: 3,
        style: {
          image: man,
          width: 17,
          height: 26
        }
      },
      {
        type: 'image',
        top: 'center',
        left: '50%',
        z: 3,
        style: {
          image: woman,
          width: 17,
          height: 26
        }
      }
    ]
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
  title: {
    text: '各年级占比',
    textStyle: {
      color: '#fff'
    }
  },
  legend: {
    bottom: 0,
    left: 'center',
    textStyle: {
      color: '#fff'
    }
  },
  grid: {
    left: '1%',
    right: '1%',
    bottom: 0,
    containLabel: true
  },
  series: [
    {
      name: '',
      id: 'proportion',
      type: 'pie',
      radius: ['34%', '62%'],
      avoidLabelOverlap: false,
      legendHoverLink: false,
      // center: ['50%', '40%'],
      label: {
        show: false,
        position: 'center',
        formatter: '{text|{b}}\n{perc|{d}%}',
        rich: {
          text: {
            fontSize: 14,
            color: '#fff',
            align: 'center',
            verticalAlign: 'middle'
          },
          perc: {
            align: 'center',
            fontSize: 12,
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
        { name: '高一', value: 20, label: { color: '#13e560' } },
        { name: '高二', value: 32, label: { color: '#f7ff26' } },
        { name: '高三', value: 20, label: { color: '#fe9400' } }
      ]
    }
  ]
}

export const dataStatistics: EChartOption = {
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
    data: ['幼儿园', '小学', '初中', '高中', '职高', '大学'],
    axisLabel: {
      show: true,
      color: '#fff'
    },
    axisLine: {
      show: true,
      lineStyle: {
        color: '#fff'
      }
    }
  },
  yAxis: {
    type: 'value',
    max: 100,
    splitNumber: 5,
    axisLabel: {
      show: true,
      color: '#fff'
    }
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

export const rankingOption: EChartOption = {
  title: {
    text: '排名',
    textStyle: {
      color: '#fff'
    }
  },
  grid: {
    left: '1%',
    right: '1%',
    bottom: 0,
    containLabel: true
  },
  color: [
    new echarts.graphic.LinearGradient(0, 0, 0, 1, [
      { offset: 0, color: '#C973FF' },
      { offset: 0.65, color: '#bf95fc' },
      { offset: 1, color: '#AEBAF8' }
    ])
  ],
  tooltip: {
    trigger: 'axis',
    axisPointer: {
      type: 'shadow'
    },
    formatter: '{b}: {c}%'
  },
  xAxis: {
    type: 'category',
    data: ['北京', '上海', '广东', '深圳'],
    axisLabel: {
      show: true,
      color: '#fff'
    },
    axisLine: {
      show: true,
      lineStyle: {
        color: '#fff'
      }
    }
  },
  yAxis: {
    type: 'value',
    max: 100,
    splitNumber: 5,
    axisLabel: {
      show: true,
      color: '#fff',
      formatter: `{value}%`
    }
  },
  series: [
    {
      data: [25, 50.35, 13, 32.8],
      type: 'bar',
      barMaxWidth: 12,
      itemStyle: {
        borderRadius: 6,
        borderWidth: 2,
        shadowColor: '#fff',
        shadowBlur: 4
      }
    }
  ]
}

export const personFinishOption = {}
