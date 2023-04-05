import {Injectable} from '@angular/core';
import {UserService} from "./user.service";
import {UserConfigEntrada, UserOracle, UserRs} from "../../models/user/user-config.model";
import {Observable} from "rxjs";
import {LoginService} from "./login.service";
import {map, take} from "rxjs/operators";
import {BehaviorSubject} from "rxjs";
import {CrmService} from "../crm.service";
import {HttpClient} from "@angular/common/http";
import {GenericRequest} from "../../models/petition/petition.model";

@Injectable({
  providedIn: 'root'
})
export class UserConfigService extends CrmService {
  private readonly userConfigBodyRq: GenericRequest;
  public configuredUser: BehaviorSubject<UserRs[]> = new BehaviorSubject<UserRs[]>([]);

  constructor(
    private _http: HttpClient,
    private userService: UserService,
    private _login: LoginService
  ) {
    super(_http);
    this.userConfigBodyRq = {
      ByPass: "usuario",
      Servicio: "usuarios",
      Metodo: "GetConfiguracionUsuario",
      Tipo: "",
      Entrada: {}, //ya rellenaremos la entrada con los datos especificos mas adelante
      Id: "", // idem, luego rellenamos
      URL: "",
      recuerdame_id: ""
    };
  }

  async loadUserConfig(user: UserConfigEntrada, id: string) {
    this.sendGet(user, id).pipe(take(1)).subscribe((r => this.configuredUser.next([r])));
  }

  public sendGet(user: UserConfigEntrada, id: string): Observable<UserRs> {
    return this.sendPost({...this.userConfigBodyRq, Entrada: user, Id: id}).pipe(map(r => (<UserRs><unknown>r)));
  }

  public get configUser() {
    return this.configuredUser.asObservable();
  }
}
