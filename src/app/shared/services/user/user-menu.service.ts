import {Injectable} from '@angular/core';
import {UserMenuBodyRq, UserMenuEntrada, UserMenusRs} from "../../models/user/user-menu.model";
import {BehaviorSubject} from "rxjs";
import {UserService} from "./user.service";
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
  private readonly userMenuBodyRq: UserMenuBodyRq;
  //private userMenuRs: GenericResponse; //TODO : implementar modelo generico
  public dataObservable: BehaviorSubject<UserMenusRs[]> = new BehaviorSubject<UserMenusRs[]>([]); // todo, cambiar
  private userMenuDataResponse: any;


  constructor(
    private _http: HttpClient,
    private userService: UserService,
    private _userConfig: UserConfigService,
  ) {
    super(_http);
    this.userMenuBodyRq = {
      ByPass: "usuario",
      Servicio: "menu",
      Metodo: "GetMenu",
      Entrada: {app: "CRM"},
    };

    this._userConfig.configuredUser.subscribe(item => item.map(resp => this.userMenuDataResponse = resp.Salida))
  }

  // Este loadMenu debe esperar los datos del usuario (login) para unirlo con los datos de la
  // userMenuBodyRequest en un GenericRequest
  async loadMenu(id: string) {
    let request: GenericRequest = {...this.userMenuBodyRq, Id: id};
    this.sendGet(request).pipe(take(1)).subscribe((r => this.dataObservable.next([r])));
  }

  private sendGet(request: GenericRequest): Observable<UserMenusRs> {
    return this.sendPost(request).pipe(map(r => (<UserMenusRs><unknown>r)));
  }

  public get userMenuCRM() {
    return this.dataObservable.asObservable();
  }
}
