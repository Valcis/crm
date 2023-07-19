export interface TypeModel {
  v:string,
  k:string
}

export const translateType:{ [key: string]: string; }={
  "Otros":"LINKS.OTHER",
  "Agencia":"LINKS.AGENCY",
  "Hotel":"LINKS.HOTEL",
};


export const TypeArray:TypeModel[] =[
  {v:"LINKS.OTHER", k:"Otros"},
  {v:"LINKS.AGENCY", k:"Agencia"},
  {v:"LINKS.HOTEL", k:"Hotel"}];
