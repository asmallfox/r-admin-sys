import { EChart } from '@/components/Echart'
import Counting from './Counting'
import { useDesign } from '@/hooks/web/useDesign'

import { personOption } from '../data'

function CountCard() {
  const { prefixCls } = useDesign('large-screen-person')

  const list = [
    {
      name: '筛查人数统计',
      count: 293300,
      option: personOption
    },
    {
      name: '远视力检查人数',
      count: 2342343,
      option: personOption
    },
    {
      name: '近视检查人数',
      count: 123213,
      option: personOption
    }
  ]

  return (
    <div className={`${prefixCls} flex justify-between p-2`}>
      {list.map((item, index) => {
        return (
          <div
            className="flex flex-col items-center"
            style={{ width: '32%' }}
            key={index}
          >
            <span className="title mb-3">{item.name}</span>
            <div className="count mb-3 flex justify-center">
              <Counting value={item.count} />
            </div>
            <EChart option={item.option} width="100%" />
          </div>
        )
      })}
    </div>
  )
}

export default CountCard
