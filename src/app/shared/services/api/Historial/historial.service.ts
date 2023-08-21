import {Injectable} from "@angular/core";
import {GenericRequest} from "../../../models/petition/petition.model";
import {CrmService} from "../crm.service";
import {HttpClient} from "@angular/common/http";
import {CookiesService} from "../../cookies/cookies.service";
const { DateTime } = require("luxon");


@Injectable({
  providedIn: 'root'
})
export class HistorialService extends CrmService {
  private readonly HistorialBodyRq: GenericRequest;

  constructor(
    private _http: HttpClient,
    private _cookie: CookiesService,
  ) {
    super(_http);
    this.HistorialBodyRq = {
      Servicio: "generales",
      Metodo: "",
      Tipo: "",
      Entrada: {},
      Id: this._cookie.getSessionId(),
      URL: "",
    };
  }

  getHistorial(entrada:any, link:string){
    //TODO: mirar el localhost
    const ModifiedHistorialBodyRq = {
      ...this.HistorialBodyRq,
      Metodo:"GetHistorialCambiosListado",
      Entrada: entrada,
    URL:link};
    console.log(ModifiedHistorialBodyRq)
    return this.sendPost(ModifiedHistorialBodyRq);
  }

}
//{"Servicio":"proveedoresTrabajaAgencia","Metodo":"DeleteProveedorTrabajaAgencia","Tipo":"","Entrada":{"datos_peticion":{"neo_id":638449}},"Id":"mT27sNbyBbHA0uKfkT7x1DtTv6JMtPUGsZfbku1D","URL":"","recuerdame_id":""}:

//{"Servicio":"generales","Metodo":"GetHistorialCambiosListado","Tipo":"","Entrada":{"node":{"label":"ProveedorTrabajaAgencia","properties":["nombre"]},"fecha_desde":"","relaciones":["_CREA","_MODIFICA","_BORRA","_CLONA"]},"Id":"mT27sNbyBbHA0uKfkT7x1DtTv6JMtPUGsZfbku1D","URL":"http://localhost:8080/crm/app/index.html#/index/crm_mantenimiento_prove_trabaja_opage"}:

