import {Component, Input, OnInit} from '@angular/core';
import {FormControl, FormGroup} from "@angular/forms";
import {NgbModal} from "@ng-bootstrap/ng-bootstrap";
import {HistorialService} from "../../../../../../shared/services/api/Historial/historial.service";
import { Router } from '@angular/router';
import {DateTime} from "luxon";
import {
  TiposRelacion,
  TranslateType
} from "../../../../../../shared/models/historial/type.historial";
import { Pipe, PipeTransform } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';


@Component({
  selector: 'app_historial',
  templateUrl: './historial.component.html',
  styleUrls: ['./historial.component.scss',],
})
export class HistorialComponent implements OnInit{

  @Input() action = ["_CREA","_MODIFICA","_BORRA","_CLONA"];
  @Input() fields:Array<string> = ['USER','ACTION','DATE', 'DATA', 'NODE'];



  protected currentPage=1;
  protected historyButton:boolean = false;
  protected pageSize: number=10;
  public fecthForm!: FormGroup;
  protected userSearch:string = "";
  protected counter:number= 0;
  protected sortCol:string = "user";
  protected sortDir:string = "asc";
  //Todo cambiar per model
  protected itemList:Array<any>=[];
  protected allResult:Array<any>=[];

  protected tiposRelacion = TiposRelacion
  private translateType=TranslateType;

  constructor(private _fetch: HistorialService,
              private _modal: NgbModal,
              private _router: Router) {
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
    this.fecthForm.patchValue({relaciones:this.action});
    this._fetch.getHistorial(this.fecthForm.value,this._router.url).subscribe(response => {
      let localData:any = response;
      let fetchResult=[];
      fetchResult = localData.Salida.lineas;
      this.itemList = [];
      console.log(fetchResult)
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
          date = this.dateProcessing(date);
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
          date = this.dateProcessing(date);
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
      this.allResult = this.itemList;
      this.changeSort('user', "string")
      this.changeSort('date', "date")
      //this._loader.setLoading(false);
      });
    }

    private dateProcessing(date:string |null){
    let result:null|string = null;
      if (date !== null){
        let noMillisOrOutput = date.split(".");
        let dateTimeSeparation = noMillisOrOutput[0].split("T");
        let dateReorder = dateTimeSeparation[0].split("-").reverse().join("/");
        let dateTimeFusion = [dateReorder,dateTimeSeparation[1]].join(" ")
        result = dateTimeFusion;
      }
      return result
    }

    protected searchName(){
      this.itemList = this.allResult.filter(e => e.user.toLowerCase().includes(this.userSearch.toLowerCase()));
      this.counter = this.itemList.length;
      this.currentPage=1;
    }
    //Todo: assar a pipe
    protected changeSort( sortElement:string, type:string) {

      if (this.sortCol === sortElement) {
        this.sortDir = (this.sortDir === "asc" ? this.sortDir = "desc" : this.sortDir = "asc")
      } else {
        this.sortCol = sortElement;
        this.sortDir = "asc";
      }
      let list = [];
      //TODO: cabiar if else estructura
      if(type  === "number"){
        list = this.allResult.sort((a, b) =>a[this.sortCol] - b[this.sortCol]);
      }else if(type === "string"){
        list= this.allResult.sort((a, b) => {
          if (a[this.sortCol] < b[this.sortCol]) return -1;
          else if (a[this.sortCol] > b[this.sortCol]) return 1;
          else return 0;
        });
      }else if (type === "date"){
        list = this.allResult.sort((a,b) => {
          let c = a[this.sortCol].split(' ');
          c = c[0].split('/').reverse().join('');

          let d= b[this.sortCol].split(' ');
          d = d[0].split('/').reverse().join('');

          return c > d ? 1 : c < d ? -1 : 0;
        });
      }else if(type === "data"){
        //data0
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
        })

      } else if (type === "node"){
        list = this.allResult.sort((a, b) =>a[this.sortCol].id - b[this.sortCol].id);
      }else {
        console.log("errror al ordenar")
      }
      this.allResult = list;
      this.allResult = this.sortDir === 'asc' ? this.allResult : this.allResult.reverse();
      this.searchName()
    }
}
