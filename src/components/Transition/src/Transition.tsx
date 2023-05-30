import { SwitchTransition, CSSTransition } from 'react-transition-group'
import { useLocation } from 'react-router-dom'
import { useDesign } from '@/hooks/web/useDesign'

import '../styles/transition.scss'

interface Props {
  children: JSX.Element
}

export default function Transition({ children }: Props) {
  const location = useLocation()
  const { prefixCls } = useDesign('transition')
  console.log('===')
  return (
    <SwitchTransition>
      <CSSTransition
        key={location.pathname}
        timeout={300}
        unmountOnExit
        classNames={`${prefixCls}`}
      >
        {(state) => <>{children}</>}
      </CSSTransition>
    </SwitchTransition>
  )
}
