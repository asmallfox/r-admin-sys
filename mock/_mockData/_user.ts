import { PermissionEnum } from '../../src/enums/menuEnum'
const userType = [1, 2, 3, 4]

export const adminList = [
  {
    id: 1,
    username: 'admin',
    nickname: '系统管理员',
    role: userType[0],
    createTime: 1682385080446,
    description: 'Tom',
    permissions: PermissionEnum.ADMIN,
    password: '123456',
    avatar: 'https://gw.alipayobjects.com/zos/rmsportal/KDpgvguMpGfqaHPjicRK.svg'
  },
  {
    id: 2,
    username: 'smallfox',
    nickname: '小狐幽',
    role: userType[1],
    createTime: 1682643537823,
    description: '开发人员',
    avatar: 'https://gw.alipayobjects.com/zos/rmsportal/KDpgvguMpGfqaHPjicRK.svg'
  },
  {
    id: 3,
    username: 'adminTest',
    nickname: '测试',
    role: userType[1],
    createTime: 1514569812000,
    description: '测试',
    permissions: PermissionEnum.TEST,
    password: '123456',
    avatar: 'https://gw.alipayobjects.com/zos/rmsportal/KDpgvguMpGfqaHPjicRK.svg'
  },
  {
    id: 4,
    username: 'asdf',
    nickname: '王五',
    role: userType[2],
    createTime: 1514764800000,
    description: '系统管理员3'
  },
  {
    id: 5,
    username: 'Tom',
    nickname: '张三',
    role: userType[0],
    createTime: 1514764800000,
    description: '系统管理员1'
  },
  {
    id: 6,
    username: 'smallfox',
    nickname: '小狐幽',
    role: userType[1],
    createTime: 1514764800000,
    description: '开发人员'
  },
  {
    id: 7,
    username: 'admin',
    nickname: '管理人员1',
    role: userType[1],
    createTime: 1514764800000,
    description: '系统管理员2'
  },
  {
    id: 8,
    username: 'asdf',
    nickname: '王五',
    role: userType[2],
    createTime: 1514764800000,
    description: '系统管理员3'
  },
  {
    id: 9,
    username: 'Tom',
    nickname: '张三',
    role: userType[0],
    createTime: 1514764800000,
    description: '系统管理员1'
  },
  {
    id: 10,
    username: 'smallfox',
    nickname: '小狐幽',
    role: userType[1],
    createTime: 1514764800000,
    description: '开发人员'
  },
  {
    id: 11,
    username: 'admin',
    nickname: '管理人员1',
    role: userType[1],
    createTime: 1514764800000,
    description: '系统管理员2'
  },
  {
    id: 12,
    username: 'asdf',
    nickname: '王五',
    role: userType[2],
    createTime: 1514764800000,
    description: '系统管理员3'
  },
  {
    id: 13,
    username: 'Tom',
    nickname: '张三',
    role: userType[0],
    createTime: 1514764800000,
    description: '系统管理员1'
  },
  {
    id: 14,
    username: 'smallfox',
    nickname: '小狐幽',
    role: userType[1],
    createTime: 1514764800000,
    description: '开发人员'
  },
  {
    id: 15,
    username: 'admin',
    nickname: '管理人员1',
    role: userType[1],
    createTime: 1514764800000,
    description: '系统管理员2'
  },
  {
    id: 16,
    username: 'asdf',
    nickname: '王五',
    role: userType[2],
    createTime: 1514764800000,
    description: '系统管理员3'
  }
]

export const ordinaryUsers = new Array(30).fill(0).map((_, index) => {
  return {
    id: index + 1,
    username: `小狐幽${index + 1}`,
    account: 'smallfox',
    email: 'smallfox@gmail.com',
    createTime: 1514764800000,
    updateTime: 1514764800000
  }
})
