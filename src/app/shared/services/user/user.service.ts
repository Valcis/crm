import {Injectable} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {environment} from "../../../../environments/environment.local";
import {Observable} from "rxjs";
import {Router} from "@angular/router";
import {CrmService} from "../crm.service";

@Injectable({
  providedIn: 'root'
})
export class UserService extends CrmService {

  constructor(
    private router: Router,
    private _http: HttpClient,
  ) {
    super(_http);
  }

  // TODO -> migra a send2Back...
  /*send(request: any): Observable<any> {  }*/


  /** FUNCION QUE ESPERARA LOS DATOS ESPECIFICOS DE LA PETICION, LOS AÑADIRA A LA GENERICA
   ** PARA FINALMENTE LANZARA AL BACK
   *  @requestData -> los datos especificos de la peticion
   */
  send2Back(requestData: any): Observable<any> {
    this.generateBody(requestData);
    console.log("igualando->", this.bodyRequest)
    return this.sendPost(environment.servers.urlByPass);
  }


  /*load(request: any) {
    this.generateBody(request);
    this.postSubject.next(environment.servers.urlByPass);
  }*/

  onError(error: any) {
    this.crmSubject.error(error);
  }

  onSuccess(response: any) {
    this.crmSubject.next(response);
  }
}
