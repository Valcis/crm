import {Injectable} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {CrmService} from "../crm.service";
import {GenericRequest} from "../../models/petition/petition.model";

@Injectable({
  providedIn: 'root'
})
export class NotificationsService extends CrmService {
  private readonly bodyRq: GenericRequest;

  constructor(
    private _http: HttpClient,
  ) {
    super(_http);
    this.bodyRq = {
      Servicio: "notificaciones",
      Metodo: "GetNotificaciones",
      Tipo: "",
      Entrada: {},// se rellena al llamarlo
      Id: "",// se rellena al llamarlo
      URL: "",
      recuerdame_id: ""
    };
  }

  public sendGetNotifications(entrada: any, id: string) {
    return this.sendPost({...this.bodyRq, Entrada: entrada, Id: id})
  }


}
