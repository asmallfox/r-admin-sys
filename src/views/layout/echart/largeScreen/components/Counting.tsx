import CountUp from 'react-countup'
import { Statistic } from 'antd'

export interface CountingProps {
  value: number | string
  start?: number
  end?: number
}

function Counting(props: CountingProps) {
  const { value, start, end } = props

  const formatter = (value: number) => {
    return <CountUp end={value} separator="," />
  }

  return (
    <Statistic
      valueStyle={{
        width: '100%',
        color: '#03dfd5',
        fontFamily: 'aiweishi',
        fontSize: '3.4rem',
        backgroundColor: '#011548'
      }}
      value={value}
      formatter={(val: number | string) => formatter(Number(val) ?? 0)}
    />
  )
}

export default Counting
