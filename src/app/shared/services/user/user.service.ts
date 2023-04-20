import {Injectable} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {CrmService} from "../crm.service";
import {LoginService} from "./login.service";
import {UserConfigService} from "./user-config.service";
import {UserMenuService} from "./user-menu.service";
import {LoginEntrada} from "../../models/user/login.model";

@Injectable({
  providedIn: 'root'
})
export class UserService extends CrmService {
  public userData: any;
  private localdata: any;
  public userId: string | undefined;


  constructor(
    private _http: HttpClient,
    private _login: LoginService,
    private _userConfig: UserConfigService,
    private _userMenu: UserMenuService
  ) {
    super(_http);

    this.userData = {
      details: {},
      config: {},
      menu: {}
    }
  }

  public retrieveUser(credenciales: LoginEntrada) {
    this._login.sendGetLogin(credenciales).subscribe(response => {
      console.log("retrieveUser", response);
      this.localdata = response;

      if (this.localdata.Status && this.localdata.Status === "OK") {
        this.userData.details = this.localdata.Salida;
        this.userId = this.localdata.Salida.Id  // TODO comprobar que se propaga....

      } else {
        // TODO : lanzar toast con mensaje de "Datos de usuario incorrectos"
      }
    });
  }


  public getConfig(emp_code: string, id: string) {
    this._userConfig.sendGetConfig({id: this.userData.details.empl_code}, id).subscribe(response => {
      console.log("getConfig", response);
      this.localdata = response;
      if (this.localdata.Status && this.localdata.Status === "OK") {
        this.userData.config = this.localdata.Salida;
      } else {
        // TODO : lanzar toast con mensaje de "XXXX???"
      }
    })
  }

  public getMenu(id: string) {
    this._userMenu.sendGetMenu(id).subscribe(response => {
      console.log("getMenu", response);
      this.localdata = response;
      if (this.localdata.Status && this.localdata.Status === "OK") {
        this.userData.menu = this.localdata.Salida;
      } else {
        // TODO : lanzar toast con mensaje de "XXXX???"
      }
    })
  }


}
