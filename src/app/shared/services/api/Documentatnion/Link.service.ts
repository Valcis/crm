import {Injectable} from "@angular/core";
import {LoginEntrada} from "../../../models/user/login.model";
import {GenericRequest} from "../../../models/petition/petition.model";
import {CrmService} from "../crm.service";
import {HttpClient} from "@angular/common/http";
import {FormGroup} from "@angular/forms";
import {CookiesService} from "../../cookies/cookies.service";

@Injectable({
  providedIn: 'root'
})
export class LinkService extends CrmService {
  private readonly linkBodyRq: GenericRequest;


  constructor(
    private _http: HttpClient,
    private _Sesion: CookiesService,
  ) {
    super(_http);
    this.linkBodyRq = {
      Servicio: "links",
      Metodo: "",
      Tipo: "",
      Entrada: {}, //ya rellenaremos la entrada con los datos especificos mas adelante
      Id: this._Sesion.getSessionId(),
      URL: "",
      recuerdame_id: ""
    };
  }
  public fetchLinks = (linkForm: any) => {
    const modifiedLinkBodyRq = {
      ...this.linkBodyRq,
      Metodo:"GetLinks",
      Entrada: linkForm,
    };

    console.log("sendLink", modifiedLinkBodyRq)
    return this.sendPost(modifiedLinkBodyRq);

  };
  public newLink = (request:any) =>{
    const modifiedLinkBodyRq = {
      ...this.linkBodyRq,
      Metodo: "NewLink",
      Entrada: request,
    };
    console.log(modifiedLinkBodyRq)
    return this.sendPost(modifiedLinkBodyRq);
  }

  public rmLink = (item:any) => {
    const modifiedLinkBodyRq = {
      ...this.linkBodyRq,
      Metodo: "DeleteLink",
      Servicio: "links",
      Entrada:{neo_id:item.metadata.neo_id},
      setHistorial_cambios:item.data,
    };
    //var response = this.sendPost(request)
    return this.sendPost(modifiedLinkBodyRq);
  };



}


