import {Injectable} from '@angular/core';
import {CrmService} from "../crm.service";
import {HttpClient} from "@angular/common/http";
import {GenericRequest} from "../../models/petition/petition.model";

@Injectable({
  providedIn: 'root'
})
export class ActivitiesAlertService extends CrmService {
  private readonly bodyRq: GenericRequest;

  constructor(
    private _http: HttpClient,
  ) {
    super(_http);
    this.bodyRq = {
      Servicio: "actividades",
      Metodo: "GetActividadesAlertas",
      Tipo: "",
      Entrada: {},// se rellena al llamarlo
      Id: "",// se rellena al llamarlo
      URL: "",
      recuerdame_id: ""
    };
  }

  public sendGetActAlert(entrada: any, id: string) {
    return this.sendPost({...this.bodyRq, Entrada: entrada, Id: id})
  }

}
