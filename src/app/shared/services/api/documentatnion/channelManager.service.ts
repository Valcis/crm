import {Injectable} from "@angular/core";
import {GenericRequest} from "../../../models/petition/petition.model";
import {CrmService} from "../crm.service";
import {HttpClient} from "@angular/common/http";
import {CookiesService} from "../../cookies/cookies.service";

@Injectable({
  providedIn: 'root'
})
export class ChannelManagerService extends CrmService {
  private readonly channelBodyRq: GenericRequest;
  //TODO: Crec que ja ho vam comentar, però el nom continua estant en camelcase i t'has deixat un log per aquí
  constructor(
    private _http: HttpClient,
    private _cookie: CookiesService,
  ) {
    super(_http);
    this.channelBodyRq = {
      ByPass: "mantenimiento",
      Servicio: "mantenimiento",
      Metodo: "",
      Tipo: "",
      Entrada: {},
      Id: this._cookie.getSessionId(),
      URL: "",
      recuerdame_id: ""};
  }

//"Entrada":{"idcm":"","nombre":"","certificado":"","pci":"","nombre_certificado":"","comentario":"","pagina":"1","num_resultados":"10","orden":"fecha_creacion_ts","tipo_orden":"DESC"}

  public fetchResults = (linkForm: any) => {
    const modifiedLinkBodyRq = {
      ...this.channelBodyRq,
      Metodo:"GetChannelManagers",
      Entrada: linkForm};
    return this.sendPost(modifiedLinkBodyRq);
  };


}
