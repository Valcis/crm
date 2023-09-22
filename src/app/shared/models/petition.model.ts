enum StatusType {
  OK = "OK",
  KO = "KO"
}

export interface GenericRequest {
  ByPass?: string, //cuando es al back crm, se omite este aributo
  Servicio: string,
  Metodo: string,
  Tipo?: string,
  Entrada?: any, //TODO : ¿se puede definir tipo o tipos especificos?
  Id: string,
  URL?: string,
  recuerdame_id?: string,
  setHistorial_cambios?: {nombre:string, modificacion_ts:number}
}


export interface GenericIntranetResponse {
  Id: string,
  Metodo: string,
  Salida: any, //TODO : ¿se puede definir tipo o tipos especificos?
  Servicio: string
  Status?: StatusType,
  StatusMsg?: string; //en caso de Status 'KO'
  URL: string
}


export interface GenericNeoResponse {
  datos_peticion: {
    data: any,
    metadata: {
      neo_id: number,
      labels?: string[]
    }
  }
}
