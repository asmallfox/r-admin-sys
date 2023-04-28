import { useDesign } from '@/hooks/web/useDesign'
import { headerKey } from '../index'
interface PageContainerProps {
  children?: JSX.Element | JSX.Element[]
}

function PageContainer(props: PageContainerProps) {
  const { children } = props
  const { prefixCls } = useDesign('page-container')
  const childElement = () => {
    const getClassName = (key?: string) => {
      return key !== headerKey ? 'p-4' : ''
    }
    if (Array.isArray(children)) {
      return children.map((item, index) => {
        return (
          <div key={index} className={getClassName(item.key)}>
            {item}
          </div>
        )
      })
    } else {
      return <div className={getClassName()}>{children}</div>
    }
  }
  return <div className={prefixCls}>{childElement()}</div>
}

export default PageContainer
