
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

  {v:"LINKS.AGENCY", k:"Agencia"},
  {v:"LINKS.HOTEL", k:"Hotel"},
  {v:"LINKS.OTHER", k:"Otros"}];

export interface linksTable {
  c:string,
  link:string,
  description:string,
  name:string,
  value: any
}

export interface filesTable {
  cog: cog,
  fileName: string,
  des:string,
  siz: number,
  categor:string,
  userName: string,
  dateCreation:string
}

interface cog {
    linked: string,
    id: number,
    name:string,
}
