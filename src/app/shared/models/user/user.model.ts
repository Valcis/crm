import {UserData} from "./user-data.model";

export interface User {
  Metodo: 'GetUsuarios',
  Servicio: 'usuarios',
  Entrada: UserData;
}
