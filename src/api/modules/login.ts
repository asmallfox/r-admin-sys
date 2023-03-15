export interface UserInfo {
  username: string;
  password: string;
}

export function loginApi(userInfo: UserInfo){
  const { username, password } = userInfo
  if (!username || !password) {
    throw(new Error('用户名或密码不能为空！'))
  } else if (username !== 'admin' || password !== '123456') {
    throw(new Error('用户名或者密码错误！'))
  }
  return Promise.resolve({
    message: '登录成功',
    code: 200,
    token: 'user token'
  })
}