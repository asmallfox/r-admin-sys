import { Button } from 'antd'
import { useDesign } from '@/hooks/web/useDesign'

function LayoutEcharts() {
  const { prefixCls } = useDesign('layout-echarts')

  const targetLargeScreen = () => {
    const hrefStr = window.location.href
    const urlParams = new URL(hrefStr)
    const pathname = urlParams.pathname
    const rootPath = hrefStr.replace(pathname, '')
    window.open(`${rootPath}/large-screen`, '__blank')
  }
  return (
    <div className={prefixCls}>
      <Button onClick={targetLargeScreen}>可视化大屏</Button>
    </div>
  )
}

export default LayoutEcharts
