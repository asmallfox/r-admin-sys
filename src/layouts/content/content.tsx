import { useOutlet } from 'react-router-dom'
import { Layout } from 'antd'

import { Transition } from '@/components/Transition'
import { ScrollBar } from '@/components/ScrollBar'

export default function LayoutContent() {
  const currentOutlet = useOutlet()

  return (
    <Layout.Content className="flex-auto">
      <Transition>
        <ScrollBar always style={{ height: '100%' }}>
          <>{currentOutlet}</>
        </ScrollBar>
      </Transition>
    </Layout.Content>
  )
}
