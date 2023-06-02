import logoIcon from '@/assets/images/react.svg'
import { useDesign } from '@/hooks/web/useDesign'

interface Props {
  collapsed?: boolean
}

export default function AppLogo(props: Props) {
  const { collapsed = false } = props
  const { prefixCls } = useDesign('app-logo')

  return (
    <div className={prefixCls}>
      <img src={logoIcon} alt="logo" />
      {!collapsed && (
        <div className="ml-2 text-lg">
          <span>Management System</span>
        </div>
      )}
    </div>
  )
}
