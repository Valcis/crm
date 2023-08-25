

export interface menuListBase {
  descripcion: string,
  config_link_pag: string,
  contenido: Array<any>,
  icono: string,
  link_pag: string,
  tipo: string,
  id_menu_padre: string,
  nivel: string,
  subMenu: Array<any>
}
export const menuItem: menuListBase =
  {
    descripcion: 'MENU_INICIO',
    config_link_pag: '/main',
    contenido: [],
    icono: 'fa fa-home',
    link_pag: '/main',
    tipo: 'MENU',
    id_menu_padre: '0',
    nivel: '1',
    subMenu: []
  };
