import type { RouterRaws, MenuItem  } from '@/router/routes/types'

type Menu =  {
  key: string;
  label: string;
  icon: JSX.Element;
  children?: MenuItem[];
}

export const matchMenu = (menus: RouterRaws[] = []) => {
  const result: MenuItem[] = []
  menus.forEach((item) => {
    const { path, meta, children = [] } = item
    const menu: Menu  = {
      key: path,
      label: meta?.label ?? '',
      icon: meta?.icon ?? '',
    }
    if (children.length > 0) {
      menu.children = matchMenu(children)
    }
    result.push(menu)
  })

  return result
}
