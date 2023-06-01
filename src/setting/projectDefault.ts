import { MenuModeEnum, MenuTypeEnum } from '@/enums/menuEnum'

export interface ProjectDefault {
  menuType: string
  menu: {
    mode: MenuModeEnum.INLINE | MenuModeEnum.HORIZONTAL | MenuModeEnum.VERTICAL
  }
  header: {}
}

export const projectDefault: ProjectDefault = {
  menuType: MenuTypeEnum.SIDEBAR,
  menu: {
    mode: MenuModeEnum.INLINE
  },
  header: {}
}
