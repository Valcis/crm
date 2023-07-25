export interface TypeModel {
  v:string,
  k:string
}

export const translateType:{ [key: string]: string; }={
  "Agencia":"LINKS.AGENCY",
  "Hotel":"LINKS.HOTEL",
  "Otros":"LINKS.OTHER",
};


export const TypeArray:TypeModel[] =[
  {v:"LINKS.OTHER", k:"Otros"},
  {v:"LINKS.AGENCY", k:"Agencia"},
  {v:"LINKS.HOTEL", k:"Hotel"}];
