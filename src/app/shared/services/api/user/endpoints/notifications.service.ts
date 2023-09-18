import {Injectable} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {CrmService} from "../../crm.service";
import {GenericRequest} from "../../../../models/petition/petition.model";

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
      Metodo: "GetNotificaciones",// se rellena al llamarlo
      Tipo: "",
      Entrada: {},// se rellena al llamarlo
      Id: "",// se rellena al llamarlo
      URL: "",
      recuerdame_id: ""
    };
  }


  public sendGetNotifications = (entrada: any, id: string) =>
    this.sendPost({...this.bodyRq, Entrada: entrada, Id: id})


  // TODO: EJEMPLO de 'addNewNotificacion()' ->
  public addNewNotificacion = (entrada: any, metodo: string, id: string) =>
    this.sendPost({...this.bodyRq, Metodo: metodo, Entrada: entrada, Id: id})


}
