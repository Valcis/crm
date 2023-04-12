import {Injectable} from '@angular/core';
import {UserMenuEntrada, UserMenusRs} from "../../models/user/user-menu.model";
import {BehaviorSubject} from "rxjs";
import {UserConfigService} from "./user-config.service";
import {map, take} from "rxjs/operators";
import {Observable} from "rxjs";
import {GenericRequest, GenericResponse} from "../../models/petition/petition.model";
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
    private _userConfig: UserConfigService,
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

  async loadMenu(Id: string) {
    let request: GenericRequest = {...this.userMenuBodyRq, Id};
    //this.sendGet(request).pipe(take(1)).subscribe((r => this.dataObservable.next([r])));
    return this.sendPost(request).pipe(
      map(r => (<UserMenusRs><unknown>r)),
      take(1)).subscribe(r => this.dataObservable.next([r]));
  }

  /*private sendGet(request: GenericRequest): Observable<UserMenusRs> {
    return this.sendPost(request).pipe(map(r => (<UserMenusRs><unknown>r)));
  }*/


  public get userMenuCRM() {
    return this.dataObservable.asObservable();
  }
}
