import { useEffect, useState } from 'react'

const NotFount = () => {
  const [count, setCount] = useState<number>()

  const request = () => {
    setCount(1)
  }

  useEffect(() => {
    request()
  }, [])
  console.log('notFount')
  return <div>notFount{count}</div>
}

export default NotFount
