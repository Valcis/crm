import {Inject, Injectable} from "@angular/core";
import {UserService} from "./user.service";
import {LoginRs, LoginEntrada} from "../../models/user/login.model";
import {map, take} from "rxjs/operators";
import {Observable, BehaviorSubject} from "rxjs";
import {GenericRequest} from "../../models/petition/petition.model";
import {Subject} from "rxjs";
import {environment} from "../../../../environments/environment.local";
import {CrmService} from "../crm.service";
import {HttpClient} from "@angular/common/http";

@Injectable({
  providedIn: 'root'
})
export class LoginService extends CrmService{

  private readonly loginBodyRq: GenericRequest;
  public loginSubject: BehaviorSubject<LoginRs[]> = new BehaviorSubject<LoginRs[]>([]);
  // recivedData: Observable<LoginEntrada>;
  //private entrada = new Subject<any>();

  constructor(
    //private userService: UserService,
    private entrada :LoginEntrada,

  ) {
    super();
    // this.recivedData = this._entrada.asObservable();
    this.loginBodyRq = {
      ByPass: "usuario",
      Servicio: "usuarios",
      Metodo: "GetLoginCRM",
      Tipo: "",
      Entrada: this.entrada,
      // Entrada: {}, //ya rellenaremos la entrada con los datos especificos mas adelante (cuando llamen este loginService)
      Id: "undefined",
      URL: "",
      recuerdame_id: ""
    };
  }



  protected onSuccess(response: any): void {
    throw new Error("Method not implemented.");
  }
  protected onError(error: any): void {
    throw new Error("Method not implemented.");
  }

  // Creación del login
  public sendGetLogin(credenciales: LoginEntrada): Observable<LoginRs> {
    this.loginBodyRq.Entrada = credenciales;
    //todo :no uses el user service... aislalo y que tenga conexion directa con el crmService
    //return this.userService.send2Back(this.loginBodyRq).pipe(map(r => (<LoginRs><unknown>r)));
    //return this.userService.send2Back(this.loginBodyRq).pipe(map(r => (<LoginRs><unknown>r)));

    return this.sendPost(environment.servers.urlByPass).pipe(map(r => (<LoginRs><unknown>r)));
  }


  send2Back(requestData: any): Observable<any> {
    this.generateBody(requestData);
    console.log("igualando->", this.bodyRequest)
    return this.sendPost(environment.servers.urlByPass);
  }


  public loadGetLogin(login: LoginEntrada) {
    this.sendGetLogin(login).pipe(take(1)).subscribe((r => this.loginSubject.next([r])))
  }

  public get user() {
    return this.loginSubject.asObservable();
  }
}
