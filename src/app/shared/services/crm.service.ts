import {Injectable} from '@angular/core';
import {HttpClient, HttpHeaders, HttpParams} from "@angular/common/http";
import {GenericRequest, GenericResponse} from "../models/petition/petition.model";
import {environment} from "../../../environments/environment.local";

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

  /*
  protected abstract onSuccess(response: any): void;
  protected abstract onError(error: any): void;
  protected abstract doBodyRequest(metadata: GenericRequest): void //??????
  */


  private generateBody(req: GenericRequest) {
    // TODO -> comprobar que se monta el GenericRequest con los datos y sino capturar error
    this.bodyRequest = req; //de momento suponemos que la request viene correctamente
  }

  private initDefaultParameters() {
    this.httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/x-www-form-urlencoded'
      })
    };

    /*this.observable = {
      /!*next: (response: any) => this.onSuccess(response),
      error: (error: any) => this.onError(error)*!/
      next: (response: any) => console.log("ON-NEXT", response),
      error: (error: any) => console.log("ON-ERROR", error),
    };*/
  }

  protected sendPost(request: GenericRequest) {
    let url = environment.servers.urlCRMServlet;

    if (request.ByPass)
      url = environment.servers.urlByPass;

    //TODO -> comprobar segun docu tanto para observable como promise
    this.generateBody(request);

    return this.http.post<GenericResponse>(url, this.bodyRequest, this.httpOptions)
  }
}
