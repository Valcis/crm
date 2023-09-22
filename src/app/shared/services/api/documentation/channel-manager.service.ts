import {Injectable} from "@angular/core";
import {GenericRequest} from "../../../models/petition.model";
import {CrmService} from "../crm.service";
import {HttpClient} from "@angular/common/http";
import {CookiesService} from "../../cookies/cookies.service";

@Injectable({
  providedIn: 'root'
})
export class ChannelManagerService extends CrmService {
  private readonly channelBodyRq: GenericRequest;
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


  public fetchResults = (linkForm: any) => {
    const modifiedLinkBodyRq = {
      ...this.channelBodyRq,
      Metodo:"GetChannelManagers",
      Entrada: linkForm};
    return this.sendPost(modifiedLinkBodyRq);
  };


}
