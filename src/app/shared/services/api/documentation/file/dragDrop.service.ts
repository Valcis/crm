import {Injectable} from "@angular/core";
import {GenericRequest} from "../../../../models/petition/petition.model";
import {CrmService} from "../../crm.service";
import {HttpClient} from "@angular/common/http";
import {CookiesService} from "../../../cookies/cookies.service";

@Injectable({
  providedIn: 'root'
})
export class DragDropService extends CrmService{
  private readonly fileBodyRq: GenericRequest;

  constructor(
    private _http: HttpClient,
    private _Session: CookiesService
  ){
    super(_http);
    this.fileBodyRq = {
      Servicio: "ficheros",
      Metodo: "",
      Tipo: "FILE",
      Entrada: {}, //ya rellenaremos la entrada con los datos especificos mas adelante
      Id: this._Session.getSessionId(),
      URL: "",
      recuerdame_id: ""
    };
  }

  public sendFiles = (request:any) => {

    const modifiedFilesBodyRq = {
      ...this.fileBodyRq,
      Metodo: "NewFichero",
      Entrada: {
        "type_file": request.type_file,
        "files": [
          {
            "name": request.file_name,
            "type": request.file_type,
            "size": request.size
          }
        ],
        "file_name": request.file_name,
        "id_relacionado": request.related_id,
        "categoria": request.catregoria,
        "descripcion": request.descripcion
      },
    };
    return this.sendPost(modifiedFilesBodyRq);
  };

  public deleteFile(request:any) {
    const modifiedFilesBodyRq = {
      ...this.fileBodyRq,
      Metodo: "DeleteFichero",
      Entrada: request.Entrada
    };
    console.log("teeeest", modifiedFilesBodyRq)
    return this.sendPost(modifiedFilesBodyRq);
  };
}


