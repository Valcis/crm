import {Injectable} from '@angular/core';
import {UserMenuBodyRq, UserMenuEntrada, UserMenusRs} from "../../models/user/user-menu.model";
import {BehaviorSubject} from "rxjs";
import {UserService} from "./user.service";
import {UserConfigService} from "./user-config.service";
import {map, take} from "rxjs/operators";
import {Observable} from "rxjs";
import {GenericRequest, GenericResponse} from "../../models/petition/petition.model";


@Injectable({
  providedIn: 'root'
})
export class UserMenuService {
  //declaro una request y una response generica para luego personalizarla
  private userMenuBodyRq: UserMenuBodyRq; //TODO : implementar modelo generico
  //private userMenuRs: GenericResponse; //TODO : implementar modelo generico

  public dataObservable: BehaviorSubject<UserMenusRs[]> = new BehaviorSubject<UserMenusRs[]>([]);

  private userMenuDataResponse: any;


  constructor(
    private userService: UserService,
    private _userConfig: UserConfigService,
  ) {
    this.userMenuBodyRq = {
      ByPass: "usuario",
      Servicio: "menu",
      Metodo: "GetMenu",
      Entrada: {app: "CRM"},
    };

    /*this.menuBodyReq = {
      "ByPass": "usuario",
      "Servicio": "menu",
      "Metodo": "GetMenu",
      "Tipo": "",
      "Entrada": {
        "app": "CRM"
      },
      "Id": "D8iisq1jS6vf4Ibfo3NOiszn5WoVBSDMejzwb2Qm",
      "URL": "",
      "recuerdame_id": ""
    };*/

    this._userConfig.configuredUser.subscribe(item => item.map(resp => this.userMenuDataResponse = resp.Salida))
  }


  // Este loadMenu debe esperar los datos del usuario (login) para unirlo con los datos de la
  // userMenuBodyRequest en un GenericRequest
  async loadMenu(id: string) {
    let request: GenericRequest = {...this.userMenuBodyRq, Id: id};
    //console.log("request ----------->", request)
    this.sendGet(request).pipe(take(1)).subscribe((r => this.dataObservable.next([r])));
  }

  private sendGet(request: GenericRequest): Observable<UserMenusRs> {
    return this.userService.send2Back(request).pipe(map(r => (<UserMenusRs><unknown>r)));
  }

  public get userMenuCRM() {
    return this.dataObservable.asObservable();
  }
}
