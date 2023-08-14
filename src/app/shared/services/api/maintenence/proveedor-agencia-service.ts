import {Injectable} from "@angular/core";
import {GenericRequest} from "../../../models/petition/petition.model";
import {CrmService} from "../crm.service";
import {HttpClient} from "@angular/common/http";
import {CookiesService} from "../../cookies/cookies.service";

@Injectable({
  providedIn: 'root'
})
export class ProveedorAgenciaService extends CrmService {
  private readonly linkBodyRq: GenericRequest;

  constructor(
    private _http: HttpClient,
    private _cookie: CookiesService,
  ) {
    super(_http);
    this.linkBodyRq = {
      Servicio: "proveedoresTrabajaAgencia",
      Metodo: "",
      Tipo: "",
      Entrada: {},
      Id: this._cookie.getSessionId(),
      URL: "",
      recuerdame_id: ""};
  }


  public getProveedores = (linkForm: any) => {
    const modifiedLinkBodyRq = {
      ...this.linkBodyRq,
      Metodo:"GetProveedoresTrabajaAgencia",
      Entrada: linkForm};
    return this.sendPost(modifiedLinkBodyRq);
  };

  public newProveedor = (data:any) =>{
    const modifiedLinkBodyRq = {
      ...this.linkBodyRq,
      Metodo: "NewProveedorTrabajaAgencia",
      Entrada: {datos_peticion:data}
    };
    console.log(modifiedLinkBodyRq)
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
