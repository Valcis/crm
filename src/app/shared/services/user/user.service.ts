import {Injectable} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {environment} from "../../../../environments/environment.local";
import {Observable} from "rxjs";
import {Router} from "@angular/router";
import {CrmService} from "../crm.service";
import {CookiesService} from "../cookies/cookies.service";

@Injectable({
  providedIn: 'root'
})
export class UserService extends CrmService {

  constructor(
    private router: Router,
    private _http: HttpClient,
    private _cookies: CookiesService
  ) {
    super(_http, _cookies);
    this.serviceRequest = 'usuarios';
  }

  send(request: any, method: string): Observable<any> {
    this.methodRequest = method;
    this.generateBody(request);
    return this.sendPost(environment.servers.urlByPass);
  }


  /** FUNCION QUE ESPERARA LOS DATOS ESPECIFICOS DE LA PETICION, LOS AÑADIRA A LA GENERICA
   ** PARA FINALMENTE LANZARA AL BACK
   *  requestData -> los datos especificos de la peticion
   * */

  send2Back(requestData: any): Observable<any> {
//  console.log("que viene????", requestData)
    this.bodyRequest = requestData
    return this.sendPost(environment.servers.urlByPass);
  }


  load(request: any, method: string) {
    this.methodRequest = method;
    this.generateBody(request);
    this.postSubject.next(environment.servers.urlByPass);
  }

  onError(error: any) {
    this.crmSubject.error(error);
  }

  onSuccess(response: any) {
    this.crmSubject.next(response);
  }
}
