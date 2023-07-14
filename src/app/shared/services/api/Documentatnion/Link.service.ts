import {Injectable} from "@angular/core";
import {LoginEntrada} from "../../../models/user/login.model";
import {GenericRequest} from "../../../models/petition/petition.model";
import {CrmService} from "../crm.service";
import {HttpClient} from "@angular/common/http";
import {FormGroup} from "@angular/forms";
import {CookiesService} from "../../cookies/cookies.service";
//TODO: Limpiar imports que no se usen

@Injectable({
  providedIn: 'root'
})
export class LinkService extends CrmService {
  //TODO: Vigilar espacios y limpiar logs y comentarios que no sirvan de guía.
  //TODO: nombres de los ficheros SIEMPRE en minúscula
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
      Entrada: {}, //ya rellenaremos la entrada con los datos especificos mas adelante
      Id: this._cookie.getSessionId(),
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
  //TODO: añadir ;
  public newLink = (request:any) =>{
    const modifiedLinkBodyRq = {
      ...this.linkBodyRq,
      Metodo: "NewLink",
      Entrada: request,
    };
    console.log(modifiedLinkBodyRq)
    return this.sendPost(modifiedLinkBodyRq);
  }
  //TODO: que el nombre sea un poco más intuitivo
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
//TODO: espacios en blanco


}


