enum MenuType {
  MENU = "MENU",
  CONTENIDO = "CONTENIDO"
}

export interface UserPermissions { //TODO: exportar a un fichero mas generico????
  eliminacion: boolean,
  modificacion: boolean,
  escritura: boolean,
  exportacion: boolean,
  lectura: boolean
}

export interface UserMenusRq {
  app: string;
}

export interface UserMenusRs {
  Salida: {
    menuList: MenuItem[];
  }
}

export interface MenuItem {
  descripcion: string,
  icono?: string, //los submenus no lo llevan
  contenido: MenuItem[]
  subMenu?: MenuItem[], //los contenido no lo llevan
  link_pag: string,
  tipo: MenuType,
  config_link_pag: string,
  config_state?: string, // los menus de 1er orden no lo llevan
  config_path_html?: string, // los menus de 1er orden no lo llevan
  permisos: UserPermissions,
  permisos_elemento: {}, //TODO model ejemplo => {modifiacion_masiva:false}
  id: number,
  nivel: number,
  id_menu_padre: number
}
