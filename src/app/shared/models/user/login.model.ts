
export interface LoginEntrada {
  username: string;
  password: string;
  user_session_id?: string;
  recordarUsuario?: false;
}





export interface LoginRs {
  Salida: UserCRM;
}

export interface UserCRM {
  afil: string;
  apellido1: string;
  empl_code: string;
  empl_dpto: string;
  empl_empresa: string;
  mail: string;
  nombre: string;
  perfil: string;
  tiempo_sesion: number;
  user_id: string;
  user_session_id: string;
}
