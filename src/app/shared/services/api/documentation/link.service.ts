import {Injectable} from "@angular/core";
import {GenericRequest} from "../../../models/petition.model";
import {CrmService} from "../crm.service";
import {HttpClient} from "@angular/common/http";
import {CookiesService} from "../../cookies/cookies.service";

@Injectable({
  providedIn: 'root'
})
export class LinkService extends CrmService {
  private readonly linkBodyRq: GenericRequest;

  constructor(
    private _http: HttpClient,
    private _cookie: CookiesService,
  ) {
    super(_http);
    this.linkBodyRq = {
      Servicio: "links",
      Metodo: "",
      Tipo: "",
      Entrada: {},
      Id: this._cookie.getSessionId(),
      URL: "",
      recuerdame_id: ""};
  }


  public fetchLinks = (linkForm: any) => {
    const modifiedLinkBodyRq = {
      ...this.linkBodyRq,
      Metodo:"GetLinks",
      Entrada: linkForm};
    return this.sendPost(modifiedLinkBodyRq);
  };

  public newLink = (data:any) =>{
    let request = {
      "datos_peticion":{
        "categoria":data.categoria,
        "descripcion":data.descripcion,
        "link":data.link}};
    const modifiedLinkBodyRq = {
      ...this.linkBodyRq,
      Metodo: "NewLink",
      Entrada: request};
    return this.sendPost(modifiedLinkBodyRq);
  };

  public eliminateLink = (item:any) => {
    const modifiedLinkBodyRq = {
      ...this.linkBodyRq,
      Metodo: "DeleteLink",
      Servicio: "links",
      Entrada:{neo_id:item.metadata.neo_id},
      setHistorial_cambios:item.data,
    };
    return this.sendPost(modifiedLinkBodyRq);
  };
}
