import pkg from '/package.json'
import { Descriptions, Card, Divider } from 'antd'

import { useDesign } from '@/hooks/web/useDesign'
import { PageContainer, headerKey } from '@/components/PageContainer'

function About() {
  const { prefixCls } = useDesign('about')
  const { dependencies, devDependencies } = pkg

  const DescribeList = (data) => {
    const list = []
    for (const key in data) {
      list.push(
        <Descriptions.Item key={key} label={key}>
          {data[key]}
        </Descriptions.Item>
      )
    }
    return (
      <Descriptions title="生产环境依赖" bordered>
        {list}
      </Descriptions>
    )
  }
  return (
    <PageContainer>
      <div className="bg-white p-4" key={headerKey}>
        <h2 className="text-xl font-600 leading-5 mb-1">关于</h2>
        <span style={{ lineHeight: '32px', height: '32px' }}>
          Management System 是一个基于React 18、Vite、 Ant Design 、TypeScript
          的后台解决方案，目标是为中大型项目开发,提供现成的开箱解决方案及丰富的示例,原则上不会限制任何代码用于商用。
        </span>
      </div>
      <Card>
        <div>{DescribeList(dependencies)}</div>
        <div>{DescribeList(devDependencies)}</div>
      </Card>
    </PageContainer>
  )
}

export default About
