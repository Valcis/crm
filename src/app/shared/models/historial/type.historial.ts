import {DateTime} from "luxon";

export interface TypeModel {
  v:string,
  k:string
}

export const TranslateType:{ [key: string]: string; }={
  "_CREA":"HISTORY.CREATE",
  "_MODIFICA":"HISTORY.MODIFY",
  "_BORRA":"HISTORY.DELETE",
  "_CLONA":"HISTORY.CLONE",
};


export const TiposRelacion = [
  {k:"_CREA",v:"HISTORY.CREATE"},
  {k:"_MODIFICA",v:"HISTORY.MODIFY"},
  {k:"_BORRA",v:"HISTORY.DELETE"},
  {k:"_CLONA",v:"HISTORY.CLONE"}
];

export interface LogData {
  user: string,
  action: string,
  date:string | any,
  data: {
    from: string,
    to: string,
  },
  node: {
    id: string,
    nombre: string
  }
}

export interface logDataArray {
  [index: number | string]: LogData

}
