import {Component, Input, OnInit, Pipe, PipeTransform} from '@angular/core';
import {FormControl, FormGroup} from "@angular/forms";
import {NgbModal} from "@ng-bootstrap/ng-bootstrap";
import {HistorialService} from "../../services/api/historial/historial.service";
import {Router} from '@angular/router';
import {DateTime} from "luxon";
import {possibleActions, TiposRelacion, TranslateType} from "../../models/historial/type.historial";
import {CrmLoaderService} from "../../services/crmLoader/crm-loader.service";
import JSONFormatter from 'json-formatter-js'



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
    this.getHistory();
  }


  public getHistory(){
    this.currentPage=1;
    this._loader.setLoading(true);
    if(this.relaciones){
      this._fetch.getRelationsHistorial(this.neoId).subscribe(response => {
        console.log(response)
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
          this.counter=0;
          fetchResult.forEach((value:any) => {
            this.relatoinsLog(value);
            this.counter++
          });
          console.log('item list', this.itemList)
        }else{
          fetchResult = fetchResult.lineas;
          fetchResult.forEach((value:any) => {
            this.changesLog(value);
          });
        }
    }
    this.counter = this.itemList.length ;
    this.allResult = this.itemList;
    this.changeSort('user', "string");
    this.changeSort('date', "date");
    this.changeSort('date', "date");

    this._loader.setLoading(false);

  }
  private relatoinsLog(value:any){
    //const dataCut = Object.fromEntries(Object.entries(value.data).slice(0, -1));


    let date;
    switch (value.metadata.type) {
      case "_CREA":
        date = DateTime.fromMillis(value.data.creacion_ts).toISO();
        date = HistorialComponent.dateProcessing(date);
        break;
      case "_MODIFICA":
        date = DateTime.fromMillis(value.data.modificacion_ts).toISO();
        date = HistorialComponent.dateProcessing(date);
        break;
      case "_BORRA":
        break;
      case "_CLONA":
        break;
      default:
        console.log("errorr de relacion");
        break;
    }

    let dataCut = value.data;
    console.log("datacut",dataCut)
    delete dataCut.modificacion_ts;
    delete dataCut.creacion_ts;

    for( let key in dataCut){
      if(dataCut[key][0] === ''){
        dataCut[key][0] = '∅'
      }else{
        dataCut[key][0]= this.colorSelect(dataCut[key][0],key);
        dataCut[key].push(this.counter+key+0);
        this.formatter(dataCut[key][0], (this.counter+key+0));
      }

      if(dataCut[key][1] === ''){
        dataCut[key][1]='∅'
      }else{
        dataCut[key][1]= this.colorSelect(dataCut[key][1],key);
        dataCut[key].push(this.counter+key+1);
        this.formatter(dataCut[key][1], (this.counter+key+1));
      }
    }
    let node = value.node.data;

    let log ={
      user: ' '.concat(node.empl_nomb,' ',node.empl_ape1,' ',node.empl_ape2," (",node.user_name,")"),
      action: this.translateType[value.metadata.type],
      date: date,
      data: dataCut,
      node: {
        id: "",
        nombre: ""
      }
    };
    this.itemList.push(log);
  }

  private colorSelect(data:string, key:string){
    if(isNaN(parseInt(data))){
      return ('\"' + data + '\"').toString();
    }else if (!isNaN(parseInt(data))){
      if(key.includes("_ts")){
        return DateTime.fromMillis(parseInt(data)).toFormat("dd/MM/yyyy hh:mm:ss");
      }else{
        return parseInt(data);
      }
    }else{
      return data
    }
  }
  formatter(data:any, id:string){
    let formatted = new JSONFormatter(data);
    // @ts-ignore
    document.getElementById(id).appendChild(formatted.render());

  }

  typeOf(value:any) {
    return typeof value;
  }

  private changesLog(value:any){
    if(value.relacion_data.nombre[0] === ''){
      value.relacion_data.nombre[0] = '∅'
    }else{
      value.relacion_data.nombre[0]= '\"' + value.relacion_data.nombre[0] + '\"'
    }

    if(value.relacion_data.nombre[1] === ''){
      value.relacion_data.nombre[1]='∅'
    }else{
      value.relacion_data.nombre[1]= '\"' + value.relacion_data.nombre[1] + '\"'
    }
    let date;


    switch (value.relacion_type) {
      case "_CREA":
        date = DateTime.fromMillis(value.relacion_creacion_ts).toISO();
        date = HistorialComponent.dateProcessing(date);
        break;
      case "_MODIFICA":
        date = DateTime.fromMillis(value.relacion_modificacion_ts).toISO();
        date = HistorialComponent.dateProcessing(date);
        break;
      case "_BORRA":
        break;
      case "_CLONA":
        break;
      default:
        console.log("errorr de relacion");
        break;
    }

    let log ={
      user: ' '.concat(value.empl_nomb,' ',value.empl_ape1,' ',value.empl_ape2," (",value.user_name,")"),
      action: this.translateType[value.relacion_type],
      date: date,
      data: value.relacion_data,
      node: {
        id: value.node_origen_text.neo_id,
        nombre: value.node_origen_text.nombre
      }
    };
    this.itemList.push(log);
  }

  protected static dateProcessing(date:string |null){
  let result:null|string = null;
    if (date !== null){
      let noMillisOrOutput = date.split(".");
      let dateTimeSeparation = noMillisOrOutput[0].split("T");
      let dateReorder = dateTimeSeparation[0].split("-").reverse().join("/");
      result = [dateReorder, dateTimeSeparation[1]].join(" ");
    }
    return result
  }

  protected changeSort( sortElement:string, type:string) {
    this._loader.setLoading(true);
    if (this.sortCol === sortElement) {
      this.sortDir = (this.sortDir === "asc" ? this.sortDir = "desc" : this.sortDir = "asc")
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
    this.searchAll()
  }

  private searchName(){
    this.itemList = this.allResult.filter(e => e.user.toLowerCase().includes(this.userSearch.toLowerCase()));
  }

  private searchDate(){
    if( this.dataSearch !== undefined){
      this.itemList = this.itemList.filter(e => {
        let eachDate = DateTime.fromFormat(e.date.split(" ")[0], "d/M/yyyy" );
        return eachDate >= this.dataSearch!;
      });
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
}
