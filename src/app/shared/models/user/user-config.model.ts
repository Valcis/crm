
export interface UserConfig {
  id: number
}
export interface UserRs {
  Salida: UserOracle,
}

export interface UserOracle {
  id: string
  datos_user: {
    user_afil:string,
    empl_nomb: string,
    mail: string,
    tipo_aviso_compras: boolean,
    timezone: string,
    taviso_antes: number,
    empl_code: number,
    user_name: string,
    taviso_posponer: number,
    tipo_aviso_evento: boolean,
    idioma_cliente: string,
    user_activo: string,
    tipo_aviso_tarea: boolean,
    id_sesion: string,
    baja_temporal: boolean,
    tipo_aviso_llamada: boolean,
    user_id: number,
    empl_ape2: string,
    empl_ape1: string,
    user_perfil: string
  }
}
