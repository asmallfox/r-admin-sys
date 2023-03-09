import type { ReactNode } from "react";

export interface MenuItem {
  key: string;
  label: string;
  icon?: ReactNode;
  title?: string;
  danger?: boolean;
  disabled?: boolean;
}

export interface SubMenu extends MenuItem {
  children?: SubMenu[];
}

export interface Meta extends MenuItem {
  menuHidden?: boolean;
}

export interface RouterRaw {
  path: string;
  element: ReactNode;
  children?: RouterRaw[];
  meta?: Meta
}