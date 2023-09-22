

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

export interface pageItemBase{
  config_link_pag: string,
  config_path_html: string,
  config_state: string,
  contenido: Array<pageItemBase>,
  descripcion: string,
  icono: string,
  id: string,
  id_menu_padre: string,
  link_pag: string,
  nivel: string,
  permisos:perimitList,
  permisos_elemento: {}
  subMenu: Array<pageItemBase>
  tipo: string
}

export interface perimitList {
  eliminacion: boolean,
  modificacion: boolean,
  escritura: boolean,
  exportacion: boolean,
  lectura: boolean
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
