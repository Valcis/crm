import {Component, OnInit} from '@angular/core';
import {DateTime} from 'luxon';
import {TranslateService} from "@ngx-translate/core";
import {SwalService} from "../../services/swal/swal.service";


@Component({
  selector: 'datos-economicos',
  templateUrl:'./datos-economicos.component.html',
  styleUrls: ['./datos-economicos.component.scss'],
})
export class DatosEconomicosComponent{
  protected clean_rate: boolean = false;
  protected commissionable_rate: boolean = false;
  protected discount_bar:string = "";
  protected markup:string = "";
  protected tz = DateTime.now().zoneName;
  protected minimum_production: boolean = false;
  protected minimum_production_value: string = "";

  protected divisaFinal:string = "";

  constructor(
    protected _translate: TranslateService,
    protected _swal: SwalService){
  }

  conversionMoneda(value:string){
    this.divisaFinal = value;
  }
  recalcularDatosEconomicos(){
    this._swal.swalInfoRequest("a","b")
  }
  calcularCarencia(event:any){

  }

}
