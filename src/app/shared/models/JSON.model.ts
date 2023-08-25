export interface JSONpageModel{
  "details":userJSON
,
  "notifications": notificationsJSON,
  "menu": {
    "menuList": Array<page>
  }
}

export interface userJSON{
  afil: string
  apellido1: string
  apellido2: string
  empl_code: string
  empl_dpto: string
  empl_empresa: string
  mail: string
  nombre: string
  perfil: string
  tiempo_sesion: number
  user_id: string
  user_session_id: string
}
export interface notificationsJSON{
  datos:{num_elementos:number}
}

export interface page{
  config_link_pag: string
  config_path_html: string
  config_state: string
  contenido: []
  descripcion: string
  icono: string
  id: string
  id_menu_padre: string
  link_pag: string
  nivel: string
  permisos: {
    eliminacion: boolean,
    modificacion: boolean,
    escritura: boolean,
    exportacion: boolean,
    lectura: boolean}
  permisos_elemento: {}
  subMenu: Array<page>
}
