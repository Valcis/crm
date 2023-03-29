enum StatusType {
  OK = "OK",
  KO = "KO"
}

export interface GenericRequest {
  ByPass?: string, //cuando es al back crm, se omite este aributo
  Servicio: string,
  Metodo: string,
  Tipo?: string | undefined,
  Entrada?: any, //TODO : ¿se puede definir tipo o tipos especificos?
  Id: string,
  URL?: string,
  recuerdame_id?: string,
  setHistorialCambios?: string | undefined
}


export interface GenericResponse {
  Id: string,
  Metodo: string,
  Salida: any, //TODO : ¿se puede definir tipo o tipos especificos?
  Servicio: string
  Status?: StatusType,
  URL: string
}
