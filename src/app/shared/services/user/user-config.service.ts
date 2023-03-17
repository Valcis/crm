import { Injectable } from '@angular/core';
import {UserService} from "./user.service";
import {UserConfig, UserOracle, UserRs} from "../../models/user/user-config.model";
import {Observable} from "rxjs";
import {LoginRq, LoginRs} from "../../models/user/login.model";
import {LoginService} from "./login.service";
import {map, take} from "rxjs/operators";
import {BehaviorSubject} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class UserConfigService {

  private readonly getUserConfig = 'GetConfiguracionUsuario';
  public configuredUser: BehaviorSubject<UserRs[]> = new BehaviorSubject<UserRs[]>([]);
  private user: any;


  constructor(
    private userService: UserService,
    private _login: LoginService
  ) {
    if (this.user) {
      this._login.loginSubject.subscribe(a => a.map(user => {
        this.user = user.Salida
      }))
    }
  }

  public sendGet(userConfig: UserConfig): Observable<UserRs> {
    return this.userService.send(userConfig, this.getUserConfig).pipe(map(r => (<UserRs><unknown>r)));
  }

  loadUserConfig(userConfig: UserConfig) {
    this.sendGet(userConfig).pipe(take(1)).subscribe((r => this.configuredUser.next([r])));
  }

  public get configUser() {
    return this.configuredUser.asObservable();
  }
}
