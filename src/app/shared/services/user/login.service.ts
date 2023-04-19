import {Injectable} from "@angular/core";
import {LoginRs, LoginEntrada} from "../../models/user/login.model";
import {GenericRequest} from "../../models/petition/petition.model";
import {CrmService} from "../crm.service";
import {HttpClient} from "@angular/common/http";
import {Subject} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class LoginService extends CrmService {
  private readonly loginBodyRq: GenericRequest;
  public loginSubject: Subject<LoginRs> = new Subject<LoginRs>();

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

  public sendGetLogin(credenciales: LoginEntrada) {
    return this.sendPost({...this.loginBodyRq, Entrada: credenciales})
    //.subscribe()
    //.subscribe(resp => this.loginSubject.next(<GenericResponse><unknown>resp))
  }

  public get user() {
    return this.loginSubject.asObservable();
  }
}
