import {Component, Input, OnInit} from '@angular/core';
import {FormControl, FormGroup} from "@angular/forms";
import {NgbModal} from "@ng-bootstrap/ng-bootstrap";
import {HistorialService} from "../../../../../../shared/services/api/Historial/historial.service";
import { Router } from '@angular/router';
import {DateTime} from "luxon";
import {locale} from "moment";


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
  //Todo cambiar per model
  protected itemList:Array<any>=[];
  protected allResult:Array<any>=[];

//TODO:pass to a model
  protected tiposRelacion = [
    {k:"_CREA",v:"HISTORIAL_CREA"},
    {k:"_MODIFICA",v:"HISTORIAL_MODIFICA"},
    {k:"_BORRA",v:"HISTORIAL_BORRA"},
    {k:"_CLONA",v:"HISTORIAL_CLONA"}
  ];
  private translateType:{ [key: string]: string; }={
    "_CREA":"HISTORIAL_CREA",
    "_MODIFICA":"HISTORIAL_MODIFICA",
    "_BORRA":"HISTORIAL_BORRA",
    "_CLONA":"HISTORIAL_CLONA",
  };

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
      console.log(response)
      fetchResult.forEach((value:any) => {
        //TODO:pass to model
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
          let log ={
            user: value.empl_nomb + value.empl_ape1 + value.empl_ape2 +"(" + value.user_name + ")",
            action: this.translateType[value.relacion_type],
            date: DateTime.fromMillis(value.relacion_data.creacion_ts).toUTC(),
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
          let log ={
            user: ' ' + value.empl_nomb + ' ' + value.empl_ape1 + ' ' + value.empl_ape2 + " (" + value.user_name + ")",
            action: this.translateType[value.relacion_type],
            date: DateTime.fromMillis(value.relacion_data.modificacion_ts).toFormat("DATETIME_SHORT_WITH_SECONDS"),
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
        this.allResult = this.itemList;
        this.counter ++;
      });
      console.log(this.itemList);

      //this._loader.setLoading(false);
      });
    }
    protected searchName(eve:any){
      this.itemList = this.allResult.filter(e => e.user.toLowerCase().includes(this.userSearch.toLowerCase()));
      this.counter = this.itemList.length;
      this.currentPage=1;
      console.log(eve)
    }
}
