import {Injectable} from "@angular/core";
import {GenericRequest} from "../../../models/petition/petition.model";
import {CrmService} from "../crm.service";
import {HttpClient} from "@angular/common/http";
import {CookiesService} from "../../cookies/cookies.service";
const { DateTime } = require("luxon");


@Injectable({
  providedIn: 'root'
})
export class ProveedorAgenciaService extends CrmService {
  private readonly providerAgencyBodyRq: GenericRequest;

  constructor(
    private _http: HttpClient,
    private _cookie: CookiesService,
  ) {
    super(_http);
    this.providerAgencyBodyRq = {
      Servicio: "proveedoresTrabajaAgencia",
      Metodo: "",
      Tipo: "",
      Entrada: {},
      Id: this._cookie.getSessionId(),
      URL: "",
      recuerdame_id: ""};
  }


  public getProveedores = (linkForm: any) => {
    const modifiedproviderAgencyBodyRq = {
      ...this.providerAgencyBodyRq,
      Metodo:"GetProveedoresTrabajaAgencia",
      Entrada: linkForm};
    return this.sendPost(modifiedproviderAgencyBodyRq);
  };

  public newProveedor = (data:any) =>{
    const modifiedproviderAgencyBodyRq = {
      ...this.providerAgencyBodyRq,
      Metodo: "NewProveedorTrabajaAgencia",
      Entrada: {datos_peticion:data}
    };
    console.log(modifiedproviderAgencyBodyRq)
    return this.sendPost(modifiedproviderAgencyBodyRq);
  };

  public changeProveedor = (data:any,historial: string) =>{
    let date = DateTime.now().setZone('utc');

    const modifiedproviderAgencyBodyRq = {
      ...this.providerAgencyBodyRq,
      Metodo: "SetProveedorTrabajaAgencia",
      Entrada: {datos_peticion:data},
      setHistorial_cambios:{
        nombre:"historial",
        modificacion_ts:date.toMillis()
      }
    };
    console.log(modifiedproviderAgencyBodyRq);
    return this.sendPost(modifiedproviderAgencyBodyRq);
  };

  public deleteProveedor = (data:any) => {
    const modifiedproviderAgencyBodyRq = {
      ...this.providerAgencyBodyRq,
      Metodo: "DeleteProveedorTrabajaAgencia",
      Entrada:{datos_peticion:{neo_id:data.neo_id.toString()}}
    };
    console.log(modifiedproviderAgencyBodyRq)
    return this.sendPost(modifiedproviderAgencyBodyRq);
  };
}
