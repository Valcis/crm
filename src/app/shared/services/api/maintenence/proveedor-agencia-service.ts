import {Injectable} from "@angular/core";
import {GenericRequest} from "../../../models/petition/petition.model";
import {CrmService} from "../crm.service";
import {HttpClient} from "@angular/common/http";
import {CookiesService} from "../../cookies/cookies.service";
import {LogHistorial} from "../../../models/manteninence/proveedor-agencia.model";
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
    return this.sendPost(modifiedproviderAgencyBodyRq);
  };

  public changeProveedor = (data: any, historial: LogHistorial) =>{
    const modifiedproviderAgencyBodyRq = {
      ...this.providerAgencyBodyRq,
      Metodo: "SetProveedorTrabajaAgencia",
      Entrada: {datos_peticion:data},
      setHistorial_cambios:historial
    };
    return this.sendPost(modifiedproviderAgencyBodyRq);
  };

  public deleteProveedor = (data:any) => {
    const modifiedproviderAgencyBodyRq = {
      ...this.providerAgencyBodyRq,
      Metodo: "DeleteProveedorTrabajaAgencia",
      Entrada:{datos_peticion:data}
    };
    return this.sendPost(modifiedproviderAgencyBodyRq);
  };
}
