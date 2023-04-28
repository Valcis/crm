import {Injectable} from "@angular/core";
import {LoginEntrada} from "../../models/user/login.model";
import {GenericRequest} from "../../models/petition/petition.model";
import {CrmService} from "../crm.service";
import {HttpClient} from "@angular/common/http";

@Injectable({
  providedIn: 'root'
})
export class LoginService extends CrmService {
  private readonly loginBodyRq: GenericRequest;


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


  public sendGetLogin = (credenciales: LoginEntrada) =>
    this.sendPost({...this.loginBodyRq, Entrada: credenciales})

}
