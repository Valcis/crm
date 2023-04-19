import {Injectable} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {CrmService} from "../crm.service";
import {LoginService} from "./login.service";
import {UserConfigService} from "./user-config.service";
import {UserMenuService} from "./user-menu.service";

@Injectable({
  providedIn: 'root'
})
export class UserService extends CrmService {
  private userData: any;

  constructor(
    private _http: HttpClient,
    private _login: LoginService,
    private _userConfig: UserConfigService,
    private _userMenu: UserMenuService
  ) {
    super(_http);
  }


}
