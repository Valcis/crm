import {Injectable} from '@angular/core';
import {CrmService} from "../../crm.service";
import {HttpClient} from "@angular/common/http";
import {GenericRequest} from "../../../../models/petition.model";

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

  public sendGetConfig = (empl_code: number, id: string) =>
    this.sendPost({...this.userConfigBodyRq, Entrada: {id: empl_code}, Id: id})


}
