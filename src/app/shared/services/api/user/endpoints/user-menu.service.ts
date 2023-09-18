import {Injectable} from '@angular/core';
import {GenericRequest} from "../../../../models/petition/petition.model";
import {CrmService} from "../../crm.service";
import {HttpClient} from "@angular/common/http";

@Injectable({
  providedIn: 'root'
})
export class UserMenuService extends CrmService {
  private readonly userMenuBodyRq: GenericRequest;

  constructor(
    private _http: HttpClient,
  ) {
    super(_http);
    this.userMenuBodyRq = {
      ByPass: "usuario",
      Servicio: "menu",
      Metodo: "GetMenu",
      Tipo: "",
      Entrada: {app: "CRM"},
      Id: "",// se rellena al llamarlo
      URL: "",
      recuerdame_id: ""
    };

  }

  public sendGetMenu = (id: string) =>
    this.sendPost({...this.userMenuBodyRq, Id: id});


  public sendDeleteMenu = (metodo: string, entrada: any, id: string) =>
    this.sendPost({...this.userMenuBodyRq, Metodo: metodo, Entrada: entrada, Id: id});


}
