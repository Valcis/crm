import {UserData} from "./user-data.model";

export interface User {
  ByPass: string,
  Servicio: string,
  Metodo: string,
  Tipo: string,
  Entrada: UserData,
  Id: string,
  setHistorial_cambios: undefined,
  URL: string,
  recuerdame_id: string
}
