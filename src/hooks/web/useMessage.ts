import type { ArgsProps } from 'antd/lib/notification/interface'
import { Modal, message, notification } from 'antd'

export interface Notification {
  success: (config: ArgsProps) => void
  error: (config: ArgsProps) => void
  info: (config: ArgsProps) => void
  warning: (config: ArgsProps) => void
  open: (config: ArgsProps) => void
  destroy: (key?: string) => void
}

notification.config({
  placement: 'topRight',
  duration: 2
})

const createModal = () => {
  return Modal
}

const createConfirm = (options: ArgsProps) => {
  const opt = {
    centered: true,

  }
}


export function useMessage() {
  return {
    notification,
    createConfirm
  }
}
