import { Button, Popconfirm, Tooltip } from 'antd'

interface PropconfirmBtnProps {
  children?: JSX.Element
  confirmTitle?: string
  placement?:
    | 'top'
    | 'bottom'
    | 'left'
    | 'right'
    | 'leftTop'
    | 'leftBottom'
    | 'rightTop'
    | 'rightBottom'
    | 'topLeft'
    | 'topRight'
    | 'bottomLeft'
    | 'bottomRight'
  tipText?: string
  okText?: string
  cancelText?: string
  onConfirm?: () => void
  onCancel?: () => void
}

function PopconfirmButton(props: PropconfirmBtnProps) {
  const {
    children,
    confirmTitle,
    tipText,
    okText = '确定',
    cancelText = '取消',
    placement = 'topLeft',
    onConfirm,
    onCancel
  } = props
  return (
    <Popconfirm
      title={confirmTitle}
      placement={placement}
      okText={okText}
      cancelText={cancelText}
      onConfirm={onConfirm}
      onCancel={onCancel}
    >
      <Tooltip title={tipText}>
        {children ? children : <Button>按钮</Button>}
      </Tooltip>
    </Popconfirm>
  )
}

export default PopconfirmButton
