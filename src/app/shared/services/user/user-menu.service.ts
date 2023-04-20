import {Injectable} from '@angular/core';
import {UserMenusRs} from "../../models/user/user-menu.model";
import {BehaviorSubject} from "rxjs";
import {GenericRequest} from "../../models/petition/petition.model";
import {CrmService} from "../crm.service";
import {HttpClient} from "@angular/common/http";

@Injectable({
  providedIn: 'root'
})
export class UserMenuService extends CrmService {
  private readonly userMenuBodyRq: GenericRequest;
  public dataObservable: BehaviorSubject<UserMenusRs[]> = new BehaviorSubject<UserMenusRs[]>([]); // todo, cambiar

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

    //this._userConfig.configuredUser.subscribe(item => item.map(resp => this.userMenuDataResponse = resp.Salida))
  }

  public sendGetMenu(id: string) {
    return this.sendPost({...this.userMenuBodyRq, Id: id})
  }

}
