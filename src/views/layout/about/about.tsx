import pkg from '/package.json'
import { Descriptions, Card, Divider } from 'antd'

import { useDesign } from '@/hooks/web/useDesign'
import { PageContainer, headerKey } from '@/components/PageContainer'

import './style/about.scss'

function About() {
  const { prefixCls } = useDesign('about')
  const { dependencies, devDependencies } = pkg

  const projectInfo = {
    版本: '1.0.0'
  }
  const DescribeList = (data: Record<string, string>, title?: string) => {
    const list = []
    for (const key in data) {
      list.push(
        <Descriptions.Item key={key} label={key}>
          {data[key]}
        </Descriptions.Item>
      )
    }
    return (
      <Card title={title}>
        <Descriptions bordered size="small">
          {list}
        </Descriptions>
      </Card>
    )
  }

  const HeaderElement = () => {
    return (
      <div className="bg-white py-4 px-6" key={headerKey}>
        <h2 className="text-xl font-600 leading-5 mb-1 mt-2">关于</h2>
        <span style={{ lineHeight: '32px', height: '32px' }}>
          Management System 是一个基于React 18、Vite、 Ant Design 、TypeScript
          的后台解决方案，目标是为中大型项目开发,提供现成的开箱解决方案及丰富的示例,原则上不会限制任何代码用于商用。
        </span>
      </div>
    )
  }
  return (
    <PageContainer header={HeaderElement()}>
      <div className={prefixCls}>
        <div className="mb-3">{DescribeList(projectInfo, '项目信息')}</div>
        <div className="mb-3">{DescribeList(dependencies, '生产环境依赖')}</div>
        <div>{DescribeList(devDependencies, '开发环境依赖')}</div>
      </div>
    </PageContainer>
  )
}

export default About
