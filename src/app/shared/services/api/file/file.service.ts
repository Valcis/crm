import {Injectable} from "@angular/core";
import {GenericRequest} from "../../../models/petition/petition.model";
import {CrmService} from "../crm.service";
import {HttpClient} from "@angular/common/http";

@Injectable({
  providedIn: 'root'
})
export class FileService extends CrmService{
  private readonly fileBodyRq: GenericRequest;

  constructor(
    private _http: HttpClient,
  ){
    super(_http);
    this.fileBodyRq = {
      Servicio: "ficheros",
      Metodo: "",
      Tipo: "",
      Entrada: {}, //ya rellenaremos la entrada con los datos especificos mas adelante
      Id: "",
      URL: "",
      recuerdame_id: "FALTA"
    };
  }

  public getFiles(request:any) {

    const modifiedFilesBodyRq = {
      ...this.fileBodyRq,
      Metodo: "GetFicheros",
      Entrada: request.Entrada
    };
    return this.sendPost(modifiedFilesBodyRq);
  };



  public deleteFile(request: any){

    const modifiedFilesBodyRq = {
      ...this.fileBodyRq,
      Metodo: "DeleteFichero",
      Entrada: request.Entrada
    };
    return this.sendPost(modifiedFilesBodyRq);
  };
}
