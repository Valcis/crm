
export const possibleActions = ["_CREA","_MODIFICA","_BORRA","_CLONA"];


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


export const TiposRelacion:Array<stringPair> = [
  {k:"_CREA",v:"HISTORY.CREATE"},
  {k:"_MODIFICA",v:"HISTORY.MODIFY"},
  {k:"_BORRA",v:"HISTORY.DELETE"},
  {k:"_CLONA",v:"HISTORY.CLONE"}
];
export interface stringPair { k:string, v:string }

export interface LogData {
  [key: string]:string| dataLog| nodeLog | number | null,
  user: string,
  action: string,
  date: string |null,
  data: dataLog,
  node: nodeLog
}

interface dataLog {
  from: string,
  to: string,
}
interface nodeLog {
  id: string,
  nombre: string
}
