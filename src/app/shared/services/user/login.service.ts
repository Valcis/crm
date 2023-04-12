import {Inject, Injectable} from "@angular/core";
import {LoginRs, LoginEntrada} from "../../models/user/login.model";
import {map, take} from "rxjs/operators";
import {Observable, BehaviorSubject} from "rxjs";
import {GenericRequest} from "../../models/petition/petition.model";

import {CrmService} from "../crm.service";
import {HttpClient} from "@angular/common/http";

@Injectable({
  providedIn: 'root'
})
export class LoginService extends CrmService {

  private readonly loginBodyRq: GenericRequest;
  public loginSubject: BehaviorSubject<LoginRs[]> = new BehaviorSubject<LoginRs[]>([]);

  constructor(
    private _http: HttpClient,
  ) {
    super(_http);
    this.loginBodyRq = {
      ByPass: "usuario",
      Servicio: "usuarios",
      Metodo: "GetLoginCRM",
      Tipo: "",
      Entrada: {}, //ya rellenaremos la entrada con los datos especificos mas adelante
      Id: "",
      URL: "",
      recuerdame_id: ""
    };
  }

  //protected onSuccess = (response: any) => new Error("Method not implemented.");
  /*protected onSuccess(response: any): void { throw new Error("Method not implemented."); }
  protected onError(error: any): void { throw new Error("Method not implemented."); }*/

  public logIn(credenciales: LoginEntrada) {
    this.sendGetLogin(credenciales).pipe(take(1)).subscribe((r => this.loginSubject.next([r])))
  }

  private sendGetLogin(credenciales: LoginEntrada): Observable<LoginRs> {
    return this.sendPost({...this.loginBodyRq, Entrada: credenciales}).pipe(map(r => <LoginRs><unknown>r));
  }

  public get user() {
    return this.loginSubject.asObservable();
  }
}
