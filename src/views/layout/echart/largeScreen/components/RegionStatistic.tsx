import type {
  EChartOption,
  DefaultLabelFormatterCallbackParams
} from '@/components/Echart'
import { EChart } from '@/components/Echart'
import * as echarts from 'echarts'

import {
  chinaMap,
  chinaGeoCoordMap,
  chinaDatas,
  chinaMapOutline
} from '../json/map'

echarts.registerMap('chinaMap', chinaMap as any)
echarts.registerMap('chinaMapOutline', chinaMapOutline as any)

const convertData = (data: any) => {
  const res = []
  for (let i = 0; i < data.length; i++) {
    const dataItem = data[i]
    const fromCoord = (chinaGeoCoordMap as any)[dataItem[0].name]
    const toCoord = [121.4648, 31.2891]
    if (fromCoord && toCoord) {
      res.push([
        {
          coord: toCoord
        },
        {
          coord: fromCoord,
          value: dataItem[0].value
        }
      ])
    }
  }
  return res
}
const series = [
  {
    map: 'chinaMap',
    type: 'map',
    zoom: 1.2,
    label: {
      show: false,
      color: '#fff'
    },
    emphasis: {
      label: {
        textStyle: {
          color: '#fff'
        }
      }
    },
    top: '16%',
    tooltip: {
      show: false
    },
    roam: false,
    itemStyle: {
      areaColor: 'transparent',
      borderColor: 'rgba(0,255,255,.1)',
      borderWidth: 1,
      emphasis: {
        areaColor: 'rgba(0,255,255,.1)',
        textStyle: {
          color: 'red'
        }
      }
    }
  }
]
;[['上海', chinaDatas]].forEach((item) => {
  series.push(
    {
      type: 'lines',
      // @ts-ignore
      zlevel: 2,
      effect: {
        show: true,
        period: 4, //箭头指向速度，值越小速度越快
        trailLength: 0.02, //特效尾迹长度[0,1]值越大，尾迹越长重
        symbol: 'arrow', //箭头图标
        symbolSize: 5 //图标大小
      },
      lineStyle: {
        width: 1, //尾迹线条宽度
        opacity: 1, //尾迹线条透明度
        curveness: 0.3 //尾迹线条曲直度
      },
      data: convertData(item[1])
    },
    {
      type: 'scatter',
      coordinateSystem: 'geo',
      zlevel: 2,
      rippleEffect: {
        //涟漪特效
        period: 4, //动画时间，值越小速度越快
        brushType: 'stroke', //波纹绘制方式 stroke, fill
        scale: 4 //波纹圆环最大限制，值越大波纹越大
      },
      label: {
        show: false,
        position: 'right', //显示位置
        offset: [5, 0], //偏移设置
        formatter: (params: any) => {
          //圆环显示文字
          return params.data.name
        },
        fontSize: 13,
        emphasis: {
          show: true
        }
      },
      symbol: 'circle',
      symbolSize: (val: any) => {
        return 5 + val[2] * 5 //圆环大小
      },
      itemStyle: {
        show: false,
        color: '#34c6bb'
      },
      data: (item[1] as unknown as []).map((dataItem: any) => {
        return {
          name: dataItem[0].name,
          value: (chinaGeoCoordMap as any)[dataItem[0].name].concat([
            dataItem[0].value
          ])
        }
      })
    }
  )
})

const option: EChartOption = {
  color: ['#34c6bb'],
  tooltip: {
    trigger: 'item'
  },
  geo: {
    silent: true,
    map: 'chinaMapOutline',
    zoom: 0.8,
    top: '0%',
    label: {
      show: false,
      color: '#fff'
    },
    emphasis: {
      label: {
        color: '#fff'
      }
    },
    roam: false,
    itemStyle: {
      areaColor: 'rgba(0,255,255,.02)',
      borderColor: '#00ffff',
      borderWidth: 1.5,
      shadowColor: '#00ffff',
      shadowOffsetX: 0,
      shadowOffsetY: 4,
      shadowBlur: 10
    }
  },
  // @ts-ignore
  series: series
}

function RegionStatistic() {
  return <EChart option={option} style={{ width: '100%', height: '100%' }} />
}

export default RegionStatistic
