import {Injectable} from "@angular/core";
import {LoginEntrada} from "../../../models/user/login.model";
import {GenericRequest} from "../../../models/petition/petition.model";
import {CrmService} from "../crm.service";
import {HttpClient} from "@angular/common/http";
import {ReactiveFormsModule} from "@angular/forms";

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


  public sendGetLogin = (credenciales: LoginEntrada) => {
    console.log("API sendGetLogin ", credenciales )
    const modifiedLoginBodyRq = {
      ...this.loginBodyRq,
      Entrada: credenciales,
      Id: credenciales.user_session_id || ""
    };
    console.log("API. sendGetLogin envio", modifiedLoginBodyRq )
    return this.sendPost(modifiedLoginBodyRq);
  };

  public sendGetLoginById = (id: string) =>{
    console.log("API. sendGetLoginById  extraemos de memcached usuario ", id)
    return this.sendPost({...this.loginBodyRq, Id: id})
  }

  public getUsuarioByEmplCode = (empl_code: number, id: string) => {
    console.log("API. getUsuarioByEmplCode ", empl_code, id)
    const request = {
      Servicio: "usuariosCrm",
      Metodo: "GetUsuarioCrmByEmplCode",
      Tipo: "",
      Entrada: {"empl_code": empl_code},
      Id: id,
      URL: "",
      recuerdame_id: ""
    };
    return this.sendPost(request);
  }
}


