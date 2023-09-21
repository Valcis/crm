import {Component, Input, OnInit, Pipe, PipeTransform} from '@angular/core';
import {FormControl, FormGroup} from "@angular/forms";
import {NgbModal} from "@ng-bootstrap/ng-bootstrap";
import {HistorialService} from "../../services/api/historial/historial.service";
import {Router} from '@angular/router';
import {DateTime} from "luxon";
import {possibleActions, TiposRelacion, TranslateType} from "../../models/historial/type.historial";
import {CrmLoaderService} from "../../services/crm-loader/crm-loader.service";


@Component({
  selector: 'app_historial',
  templateUrl: './historial.component.html',
  styleUrls: ['./historial.component.scss',],
})
export class HistorialComponent implements OnInit{

  @Input() relaciones:boolean = true;
  @Input() neoId: number = 29662;

  protected action = possibleActions;
  protected noResults=false;
  protected currentPage=1;
  protected historyButton:boolean = false;
  protected pageSize: number=10;
  public fetchForm!: FormGroup;
  protected userSearch:string = "";
  protected dataSearch:DateTime | undefined;
  protected counter:number= 0;
  protected sortCol:string = "user";
  protected sortDir:string = "asc";
  //Todo cambiar per model
  protected itemList:Array<any>=[];
  protected allResult:Array<any>=[];

  protected tiposRelacion = TiposRelacion;
  private translateType=TranslateType;

  constructor(private _fetch: HistorialService,
              private _modal: NgbModal,
              private _router: Router,
              private _loader: CrmLoaderService,
  ) {
    this.loadForms();
  }
  private loadForms(){

    this.fetchForm = new FormGroup({
      fecha_desde: new FormControl<string>(""),
      relaciones: new FormControl<Array<string>>(this.action),
      node: new FormGroup({
        label: new FormControl<string>("ProveedorTrabajaAgencia"),
        properties: new FormControl<Array<string>>(["nombre"]),
      })
    });

  }

  ngOnInit(){
  }


  public getHistory(){
    this.currentPage=1;
    this._loader.setLoading(true);
    if(this.relaciones){
      this._fetch.getRelationsHistorial(this.neoId).subscribe(response => {
        this.gatherFetchResults(response);
      });
    }else{
      this._fetch.getChangesHistorial(this.fetchForm.value,this._router.url).subscribe(response => {
        this.gatherFetchResults(response);
      });
    }

  }
  private gatherFetchResults(response:any){
    let localData:any = response;
    let fetchResult=[];
    fetchResult = localData.Salida;
    this.itemList = [];
    if(fetchResult.length === 0){
      this.noResults = true;
    }else{
      this.noResults = false;
        if(this.relaciones){
          fetchResult=fetchResult.datos_peticion.relations;
          this.itemList = this.mappingRelations(fetchResult);
        }else{
          fetchResult = fetchResult.lineas;
          this.itemList = this.mapping(fetchResult);
        }
    }
    this.counter = this.itemList.length ;
    this.allResult = this.itemList;
    this.changeSort('user', "string");
    this.changeSort('date', "date");
    this.changeSort('date', "date");

    this._loader.setLoading(false);

  }

  private mappingRelations(items:Array<any>){
    return items.map<any>(item => {
      let historial!:{user_name:string, empl_nomb:string, empl_ape1:string, empl_ape2:string, type:string, ts: string | null, datos: any};
      let datos!:any;
      historial = {user_name:"",empl_nomb:"",empl_ape1:"",empl_ape2:"",type:"",ts:null,datos};
      historial.user_name = item.node.data.user_name;
      historial.empl_nomb = item.node.data.empl_nomb!==undefined?item.node.data.empl_nomb:"";
      historial.empl_ape1 = item.node.data.empl_ape1!==undefined?item.node.data.empl_ape1:"";
      historial.empl_ape2 = item.node.data.empl_ape2!==undefined?item.node.data.empl_ape2:"";
      historial.type = "HISTORIAL" + item.metadata.type;
      let data:string=""
      if (historial.type === "HISTORIAL_CREA") {
        historial.ts = this.dateProcessing(item.data.creacion_ts);
      } else if (historial.type === "HISTORIAL_MODIFICA") {
        historial.ts = this.dateProcessing(item.data.modificacion_ts);
      } else if (historial.type === "HISTORIAL_BORRA") {
        historial.ts = this.dateProcessing(item.data.borrado_ts);
      }else if (historial.type === "HISTORIAL_CLONA") {
        historial.ts = this.dateProcessing(item.data.creacion_ts);
      }else if (historial.type === "HISTORIAL_ENVIA_MAIL_CREDITO" || historial.type === "HISTORIAL_ENVIA_MAIL_BAJA" || historial.type === "HISTORIAL_ENVIA_MAIL_ALTA"
        || historial.type === "HISTORIAL_ENVIA_MAIL_CLAVES_XML" || historial.type === "HISTORIAL_ENVIA_MAIL_AGENCIA_NEO") {
        historial.ts = this.dateProcessing(item.data.enviado_ts);
      }

      datos = item.data;
      for (let key in datos) {
        if (key === "creacion_ts" || key === "modificacion_ts" || key === "borrado_ts" || key === "enviado_ts") {
          delete datos[key];
          continue;
        }
        if (item.data[key][0] !== item.data[key][1]) {
          datos[key] = item.data[key];
          try {
            datos[key][0] = JSON.parse(item.data[key][0]);
          }catch(error){
            datos[key][0] = item.data[key][0];
          }
          try {
            datos[key][1] = JSON.parse(item.data[key][1]);
          }catch(error){
            datos[key][1] = item.data[key][1];
          }
        }
      }
      let persona = item.node.data;
      let log ={
        user: ' '.concat(persona.empl_nomb,' ',persona.empl_ape1,' ',persona.empl_ape2," (",persona.user_name,")"),
        action: this.translateType[item.metadata.type],
        date: historial.ts,
        data: datos,
        node: {
          id: "",
          nombre: ""
        }
      };
      return log;
    })

  }

  private mapping(items:Array<any>){

    return items.map<any>(item => {
      let historial!:{user_name:string, empl_nomb:string, empl_ape1:string, empl_ape2:string, type:string, ts: string | null, datos: any};
      let datos!:any;
      historial = {user_name:"",empl_nomb:"",empl_ape1:"",empl_ape2:"",type:"",ts:null,datos};
      historial.user_name = item.user_name;
      historial.empl_nomb = item.empl_nomb!==undefined?item.empl_nomb:"";
      historial.empl_ape1 = item.empl_ape1!==undefined?item.empl_ape1:"";
      historial.empl_ape2 = item.empl_ape2!==undefined?item.empl_ape2:"";
      historial.type = "HISTORIAL" + item.relacion_type;

      datos = item.relacion_data;
      if (historial.type === "HISTORIAL_CREA") {
        historial.ts = this.dateProcessing(datos.creacion_ts);
      } else if (historial.type === "HISTORIAL_MODIFICA") {
        historial.ts = this.dateProcessing(datos.modificacion_ts);
      } else if (historial.type === "HISTORIAL_BORRA") {
        historial.ts = this.dateProcessing(datos.borrado_ts);
      }else if (historial.type === "HISTORIAL_CLONA") {
        historial.ts = this.dateProcessing(datos.creacion_ts);
      }else if (historial.type === "HISTORIAL_ENVIA_MAIL_CREDITO" || historial.type === "HISTORIAL_ENVIA_MAIL_BAJA" || historial.type === "HISTORIAL_ENVIA_MAIL_ALTA"
        || historial.type === "HISTORIAL_ENVIA_MAIL_CLAVES_XML" || historial.type === "HISTORIAL_ENVIA_MAIL_AGENCIA_NEO") {
        historial.ts = this.dateProcessing(datos.enviado_ts);
      }

      for (let key in datos) {
        if (key === "creacion_ts" || key === "modificacion_ts" || key === "borrado_ts" || key === "enviado_ts") {
          delete datos[key];
          continue;
        }
        if (item.relacion_data[key][0] !== item.relacion_data[key][1]) {
          datos[key] = item.relacion_data[key];
          try {
            datos[key][0] = JSON.parse(item.relacion_data[key][0]);
          }catch(error){
            datos[key][0] = item.relacion_data[key][0];
          }
          try {
            datos[key][1] = JSON.parse(item.relacion_data[key][1]);
          }catch(error){
            datos[key][1] = item.relacion_data[key][1];
          }
        }
      }

      let log ={
        user: ' '.concat(historial.empl_nomb,' ',historial.empl_ape1,' ',historial.empl_ape2," (",historial.user_name,")"),
        action: this.translateType[item.relacion_type],
        date: historial.ts,
        data: datos,
        node: {
          id: item.node_origen_text.neo_id,
          nombre: item.node_origen_text.nombre
        }
      };
      return log;
    })

  }


  typeOf(value:any) {
    return typeof value;
  }



  public dateProcessing(millis:number | undefined | string){
    let result:null|string = null;
    if (millis !== undefined){
      if(typeof millis === "string"){
      millis = +millis
      }
      let date: string|null = DateTime.fromMillis(millis).toISO();
      if (date !== null){
        let noMillisOrOutput = date.split(".");
        let dateTimeSeparation = noMillisOrOutput[0].split("T");
        let dateReorder = dateTimeSeparation[0].split("-").reverse().join("/");
        result = [dateReorder, dateTimeSeparation[1]].join(" ");
      }
    }
    return result
  }

  protected changeSort( sortElement:string, type:string) {
    this._loader.setLoading(true);
    if (this.sortCol === sortElement) {
      this.sortDir = (this.sortDir === "asc" ? this.sortDir = "desc" : this.sortDir = "asc");
    } else {
      this.sortCol = sortElement;
      this.sortDir = "asc";
    }
    let list = [];

    switch (type) {
      case "number":
        list = this.allResult.sort((number1, number2) =>number1[this.sortCol] - number2[this.sortCol]);
        break;
      case "string":
        list= this.allResult.sort((string1, string2) => {
          if (string1[this.sortCol] < string2[this.sortCol]) return -1;
          else if (string1[this.sortCol] > string2[this.sortCol]) return 1;
          else return 0;
        });
        break;
      case "date":
        list = this.allResult.sort((date1,date2) => {
          let millis1 = DateTime.fromFormat(date1[this.sortCol], "dd/MM/yyyy hh:mm:ss", { locale: "en-GB"}).toMillis();
          let millis2 = DateTime.fromFormat(date2[this.sortCol], "dd/MM/yyyy hh:mm:ss", { locale: "en-GB"}).toMillis();
          return millis1 - millis2;
          });
        break;
      case "data":

        list = this.allResult.sort((dictionary1,dictionary2) => {
          let key1 = Object.keys(dictionary1[this.sortCol])[0];
          let key2 = Object.keys(dictionary2[this.sortCol])[0];
          let item1 = dictionary1[this.sortCol][key1];
          let item2 = dictionary2[this.sortCol][key2];
          if(item1[0] === "∅"){
            if(item2[0] === "∅"){
              return item1[1] > item2[1] ? 1 : item1[1] < item2[1] ? -1 : 0;
            }else{
              return -1;
            }
          }else{
            if(item2[0] === "∅"){
              return 1;
            }else{
              if (item1[0] === item2[0]){
                return item1[1] > item2[1] ? 1 : item1[1] < item2[1] ? -1 : 0;
              }else{
                return item1[0] > item2[0] ? 1 : -1;
              }
            }
          }
        });
        break;
      case "node":
        list = this.allResult.sort((nod1, nod2) =>nod1[this.sortCol].id - nod2[this.sortCol].id);
        break;
      default:
        console.log("errror al ordenar")
    }

    this.allResult = list;
    this.allResult = this.sortDir === 'asc' ? this.allResult : this.allResult.reverse();
    this.searchAll();
    this._loader.setLoading(false);
  }

  protected getData(event:any){
    if(event === undefined){
      this.dataSearch = undefined;
    }else{
      this.dataSearch = DateTime.fromFormat(event, "d-M-yyyy");
    }
    this.searchAll();
  }

  private searchName(){
    if(this.userSearch.length > 2 ){
      this.itemList = this.allResult.filter(e => e.user.toLowerCase().includes(this.userSearch.toLowerCase()));
    }else{
      this.itemList = this.allResult.filter(e => e.user.toLowerCase().includes(""));

    }
  }

  private searchDate(){
    if( this.dataSearch !== undefined){
      this.itemList = this.itemList.filter(e => {let eachDate = DateTime.fromFormat(e.date.split(" ")[0], "d/M/yyyy" ); return eachDate >= this.dataSearch!;});
    }
  }

  protected searchAll(){
    this._loader.setLoading(true);
    this.searchName();
    this.searchDate();
    this.counter = this.itemList.length;
    this.currentPage=1;
    this._loader.setLoading(false);

  }

  isArray(item:any){
    return Array.isArray(item);
  }
}
