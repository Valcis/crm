import {Injectable} from "@angular/core";
import {UserService} from "./user.service";
import {LoginRs, LoginRq} from "../../models/user/login.model";
import {map, take} from "rxjs/operators";
import {Observable, BehaviorSubject} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class LoginService {

  private readonly getLogin = 'GetLoginCRM';
  public loginSubject: BehaviorSubject<LoginRs[]> = new BehaviorSubject<LoginRs[]>([]);

  constructor(
    private userService: UserService
  ) { }

  // Creación del login
  public sendGetLogin(logIn: LoginRq): Observable<LoginRs> {
    const request = {
      username: logIn.username.trim() || '',
      password: logIn.password.trim() || '',
      user_session_id: logIn.user_session_id || '',
      recordarUsuario: logIn.recordarUsuario
    };
    let sendLoginUser = this.userService.send(request, this.getLogin).pipe(map(r => (<LoginRs><unknown>r)));
    return sendLoginUser;
  }

  public loadGetLogin(login: LoginRq) {
    this.sendGetLogin(login).pipe(take(1)).subscribe((r => this.loginSubject.next([r])))
  }

  public get user() {
    return this.loginSubject.asObservable();
  }
}
