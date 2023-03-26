export interface GrowCardList {
  title: string
  money: number
  total: number
  icon: string
  color: string
  tag: string
}

export const growCardList: GrowCardList[] = [
  {
    title: '访问数',
    tag: '月',
    money: 2000,
    total: 120000,
    icon: 'icon-huore',
    color: 'green'
  },
  {
    title: '成交额',
    tag: '月',
    money: 20000,
    total: 500000,
    icon: 'icon-kaitonghuiyuan',
    color: 'blue'
  },
  {
    title: '下载数',
    tag: '周',
    money: 8000,
    total: 120000,
    icon: 'icon-yaoqinghaoyou',
    color: 'orange'
  },
  {
    title: '成交数',
    tag: '年',
    money: 5000,
    total: 50000,
    icon: 'icon-guanjunjiangbei',
    color: 'purple'
  }
]
