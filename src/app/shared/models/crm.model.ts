
export class CrmBody {
  ByPass: string = '';
  Servicio: string = '';
  Metodo: string = '';
  Tipo: string = '';
  Entrada: any;
  Id: string = '';
  setHistorial_cambios = undefined;
  URL: string = '';
  recuerdame_id: string = '';
}

export interface CrmResponse {
  Status: string;
  Metodo: string;
  Servicio: string;
  Id: string;
  URL: string;
  StatusMsg?: string;
}
