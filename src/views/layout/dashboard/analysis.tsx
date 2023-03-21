import axios from 'axios'

const Analysis = () => {
  axios.post('/lege-api/login', { username: 'admin', password: '1234565' }).then(res => {
    console.log(res, '==========')
  })
  return <div>表盘仪</div>
}

export default Analysis