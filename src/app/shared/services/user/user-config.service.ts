import {Injectable} from '@angular/core';
import {UserConfigEntrada} from "../../models/user/user-config.model";
import {CrmService} from "../crm.service";
import {HttpClient} from "@angular/common/http";
import {GenericRequest} from "../../models/petition/petition.model";

@Injectable({
  providedIn: 'root'
})
export class UserConfigService extends CrmService {
  private readonly userConfigBodyRq: GenericRequest;

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

  public sendGetConfig = (user: UserConfigEntrada, id: string) =>
    this.sendPost({...this.userConfigBodyRq, Entrada: user, Id: id})


}
