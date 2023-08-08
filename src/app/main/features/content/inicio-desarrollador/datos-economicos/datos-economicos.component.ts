import {Component, OnInit} from '@angular/core';
import {DateTime} from 'luxon';
import {TranslateService} from "@ngx-translate/core";
import {SwalService} from "../../../../../shared/services/swal/swal.service";


@Component({
  selector: 'datos-economicos',
  templateUrl:'./datos-economicos.component.html',
  styleUrls: ['./datos-economicos.component.scss'],
})
export class DatosEconomicosComponent implements OnInit{
  protected tarifa_neta: boolean = false;
  protected tarifa_comisionable: boolean = false;
  protected descuento_bar:string = "";
  protected markup:string = "";
  protected tz = DateTime.now().zoneName;
  protected produccion_minima: boolean = false;
  protected produccion_minima_value: string = "";

  protected divisaFinal:string = "EUR";

  constructor(
    protected _translate: TranslateService,
    protected  _swal: SwalService){
  }

  ngOnInit(): void {

  }
  conversionMoneda(value:string){
    console.log(value)
    this.divisaFinal = value;
  }
  recalcularDatosEconomicos(){
    this._swal.swalInfoRequest("a","b")
  }
}
