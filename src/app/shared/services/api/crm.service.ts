import {Injectable} from '@angular/core';
import {HttpClient, HttpHeaders, HttpParams} from "@angular/common/http";
import {GenericRequest, GenericIntranetResponse} from "../../models/petition/petition.model";
import {environment} from "../../../../environments/environment.local";

@Injectable({
  providedIn: 'root'
})
export abstract class CrmService {
  private httpOptions: any;
  private bodyRequest: GenericRequest | undefined;

  protected constructor(
    private http: HttpClient,
  ) {
    this.initDefaultParameters()
  }


  private generateBody = (req: GenericRequest) => {
    // TODO -> comprobar que se monta el GenericRequest con los datos y sino capturar error
    this.bodyRequest = req; //de momento suponemos que la request viene correctamente
  };

  private initDefaultParameters = () => {
    this.httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8',
      })
    };
  };

  protected sendPost = (request: GenericRequest) => {
    let url = environment.servers.urlCRMServlet;

    if (request.ByPass)
      url = environment.servers.urlByPass;

    this.generateBody(request);

    return this.http.post<GenericIntranetResponse>(url, this.bodyRequest, this.httpOptions);
  };
}
