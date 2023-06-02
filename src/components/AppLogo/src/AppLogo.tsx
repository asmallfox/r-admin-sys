import logoIcon from '@/assets/images/react.svg'
import { useDesign } from '@/hooks/web/useDesign'

export default function AppLogo({ collapsed }: { collapsed: boolean }) {
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
