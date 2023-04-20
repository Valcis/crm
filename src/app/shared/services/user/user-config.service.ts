import {Injectable} from '@angular/core';
import {UserConfigEntrada, UserRs} from "../../models/user/user-config.model";
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

  /*async loadUserConfig(user: UserConfigEntrada, id: string) {
    this.sendGet(user, id).pipe(take(1)).subscribe((r => this.configuredUser.next([r])));
  }*/

  public sendGetConfig(user: UserConfigEntrada, id: string) {
    return this.sendPost({...this.userConfigBodyRq, Entrada: user, Id: id})
    //.pipe(map(r => (<UserRs><unknown>r)));
  }

  public get configUser() {
    return this.configuredUser.asObservable();
  }
}
