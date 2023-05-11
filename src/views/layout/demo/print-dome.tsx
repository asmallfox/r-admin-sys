import { Button } from 'antd'
import { PageContainer } from '@/components/PageContainer'

function PrintDome() {
  return (
    <PageContainer>
      <div>
        <Button type="primary">打印</Button>
        <div
          style={{
            width: '900px',
            height: '1080px',
            boxShadow: '0 0 6px 1px rgba(0, 0, 0, 0.3)',
            margin: '0 auto'
          }}
        >
          123
        </div>
      </div>
    </PageContainer>
  )
}

export default PrintDome
