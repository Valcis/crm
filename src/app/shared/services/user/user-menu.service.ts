import {Injectable} from '@angular/core';
import {UserMenusRq, UserMenusRs} from "../../models/user/user-menu.model";
import {BehaviorSubject} from "rxjs";
import {UserService} from "./user.service";
import {LoginService} from "./login.service";
import {UserConfigService} from "./user-config.service";
import {UserConfig, UserRs} from "../../models/user/user-config.model";
import {map, take} from "rxjs/operators";
import {Observable} from "rxjs";


@Injectable({
  providedIn: 'root'
})
export class UserMenuService {
  private readonly getUserMenu = "GetMenu";
  public userMenuRs: BehaviorSubject<UserMenusRs[]> = new BehaviorSubject<UserMenusRs[]>([]);
  private userMenuDataResponse: any;
  //private getMenuRequest : genericRequest; TODO : implementar modelo generico
  private menuBodyReq;

  constructor(
    private userService: UserService,
    private _userConfig: UserConfigService,
  ) {
    this.menuBodyReq = {
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
    }


    this._userConfig.configuredUser.subscribe(item => item.map(resp => this.userMenuDataResponse = resp.Salida))

  }


  public sendGet(userMenu: UserMenusRq): Observable<UserMenusRs> {
    return this.userService.send2(this.menuBodyReq).pipe(map(r => (<UserMenusRs><unknown>r)));
  }

  async loadMenu(menusRq: UserMenusRq) {
    this.sendGet(menusRq).pipe(take(1)).subscribe((r => this.userMenuRs.next([r])));
  }


  public get userMenuCRM() {
    return this.userMenuRs.asObservable();
  }
}
