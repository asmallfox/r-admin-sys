import { useDesign } from '@/hooks/web/useDesign'
interface PageContainerProps {
  children?: JSX.Element | JSX.Element[]
  header?: JSX.Element
  padding?: boolean
}

function PageContainer(props: PageContainerProps) {
  const { children, header, padding = true } = props
  const { prefixCls } = useDesign('page-container')
  return (
    <div className={`${prefixCls} h-full box-border`}>
      {header && header}
      <div className={`h-full min-h-full box-border ${padding ? 'p-4' : ''}`}>
        {children}
      </div>
    </div>
  )
}

export default PageContainer
