import {Component, Input, OnInit} from '@angular/core';
import {FormControl, FormGroup} from "@angular/forms";
import {NgbModal} from "@ng-bootstrap/ng-bootstrap";
import {HistorialService} from "../../services/api/Historial/historial.service";
import {Router} from '@angular/router';
import {DateTime} from "luxon";
import {TiposRelacion, TranslateType} from "../../models/historial/type.historial";
import {CrmLoaderService} from "../../services/crmLoader/crm-loader.service";

const possibleActions= ["_CREA","_MODIFICA","_BORRA","_CLONA"];
@Component({
  selector: 'app_historial',
  templateUrl: './historial.component.html',
  styleUrls: ['./historial.component.scss',],
})
export class HistorialComponent implements OnInit{

  @Input() action = possibleActions;
  @Input() fields:Array<string> = ['USER','ACTION','DATE', 'DATA', 'NODE'];


  protected noResults=false;
  protected currentPage=1;
  protected historyButton:boolean = false;
  protected pageSize: number=10;
  public fecthForm!: FormGroup;
  protected userSearch:string = "";
  protected dataSearch:DateTime | string = "";
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
    this.fecthForm = new FormGroup({
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
    if(this.action.length === 0){
      this.fecthForm.patchValue({relaciones: possibleActions});
    }else{
      this.fecthForm.patchValue({relaciones:this.action});
    }
    this._fetch.getHistorial(this.fecthForm.value,this._router.url).subscribe(response => {
      let localData:any = response;
      let fetchResult=[];
      fetchResult = localData.Salida.lineas;
      this.itemList = [];
      if(fetchResult.length === 0){
        this.noResults = true;
      }else{
        this.noResults = false;
        fetchResult.forEach((value:any) => {

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

          if (value.relacion_type === "_CREA"){
            let date = DateTime.fromMillis(value.relacion_creacion_ts).toISO();
            date = HistorialComponent.dateProcessing(date);
            let log ={
              user: ' '.concat(value.empl_nomb,' ',value.empl_ape1,' ',value.empl_ape2," (",value.user_name,")"),
              action: this.translateType[value.relacion_type],
              date: date,
              data: {
                from: value.relacion_data.nombre[0],
                to: value.relacion_data.nombre[1],
              },
              node: {
                id: value.node_origen_text.neo_id,
                nombre: value.node_origen_text.nombre
              }
            };
            this.itemList.push(log);

          }else{
            let date = DateTime.fromMillis(value.relacion_modificacion_ts).toISO();
            date = HistorialComponent.dateProcessing(date);
            let log ={
              user: ' '.concat(value.empl_nomb,' ',value.empl_ape1,' ',value.empl_ape2," (",value.user_name,")"),
              action: this.translateType[value.relacion_type],
              date: date,
              data: {
                from: value.relacion_data.nombre[0],
                to: value.relacion_data.nombre[1],
              },
              node: {
                id: value.node_origen_text.neo_id,
                nombre: value.node_origen_text.nombre
              }
            };
            this.itemList.push(log);
          }
          this.counter ++;
        });
      }

      this.allResult = this.itemList;
      this.changeSort('user', "string");
      this.changeSort('date', "date");
      this._loader.setLoading(false);
    });
  }

  private static dateProcessing(date:string |null){
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
        list = this.allResult.sort((a, b) =>a[this.sortCol] - b[this.sortCol]);
        break;
      case "string":
        list= this.allResult.sort((a, b) => {
          if (a[this.sortCol] < b[this.sortCol]) return -1;
          else if (a[this.sortCol] > b[this.sortCol]) return 1;
          else return 0;
        });
        break;
      case "date":
        list = this.allResult.sort((a,b) => {
          let c = a[this.sortCol].split(' ');
          let e = c[1].split(':').join('');
          c = c[0].split('/').reverse().join('');
          c = c + e;

          let d = b[this.sortCol].split(' ');
          let f = d[1].split(':').join('');
          d = d[0].split('/').reverse().join('');
          d = d + f;

          return c > d ? 1 : c < d ? -1 : 0;});
        break;
      case "data":
        list = this.allResult.sort((a,b) => {
          if(a[this.sortCol].from === "∅"){
            if(b[this.sortCol].from === "∅"){
              return a[this.sortCol].to > b[this.sortCol].to ? 1 : a[this.sortCol].to < b[this.sortCol].to ? -1 : 0;
            }else{
              return -1;
            }
          }else{
            if(b[this.sortCol].from === "∅"){
              return 1;
            }else{
              if (a[this.sortCol].from === b[this.sortCol].from){
                return a[this.sortCol].to > b[this.sortCol].to ? 1 : a[this.sortCol].to < b[this.sortCol].to ? -1 : 0;
              }else{
                return a[this.sortCol].from > b[this.sortCol].from ? 1 : -1;
              }
            }
          }
        });
        break;
      case "node":
        list = this.allResult.sort((a, b) =>a[this.sortCol].id - b[this.sortCol].id);
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
    if(event === ""){
      this.dataSearch = "";
    }else{
      this.dataSearch = DateTime.fromFormat(event, "d-M-yyyy");
    }
    this.searchAll()
  }

  private searchName(){
    this.itemList = this.allResult.filter(e => e.user.toLowerCase().includes(this.userSearch.toLowerCase()));
  }

  private searchDate(){
    if( this.dataSearch !== ""){
      this.itemList = this.itemList.filter(e => {
        let eachDate = DateTime.fromFormat(e.date.split(" ")[0], "d/M/yyyy" );
        return eachDate >= this.dataSearch;
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
