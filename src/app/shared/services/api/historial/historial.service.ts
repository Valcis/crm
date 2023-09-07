import {Injectable} from "@angular/core";
import {CrmService} from "../crm.service";
import {HttpClient} from "@angular/common/http";
import {CookiesService} from "../../cookies/cookies.service";
import {GenericRequest} from "../../../models/petition.model";
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
      Servicio: "",
      Metodo: "",
      Tipo: "",
      Entrada: {},
      Id: this._cookie.getSessionId(),
      URL: "",
    };
  }

  getChangesHistorial(entrada:any, link:string){
    const ModifiedHistorialBodyRq = {
      ...this.HistorialBodyRq,
      Servicio: "generales",
      Metodo:"GetHistorialCambiosListado",
      Entrada: entrada,
      URL:link
    };
    return this.sendPost(ModifiedHistorialBodyRq);
  }

  getRelationsHistorial(neoId:number,){
    const ModifiedHistorialBodyRq = {
      ...this.HistorialBodyRq,
      Servicio: "utils",
      Metodo:"GetRelacionesHistorial",
      Entrada: {neoId: neoId}
    };
    return this.sendPost(ModifiedHistorialBodyRq);
  }

}
