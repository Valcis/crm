import {Injectable} from '@angular/core';
import {CrmBody, CrmResponse} from "../models/crm.model";
import {HttpClient, HttpHeaders, HttpParams} from "@angular/common/http";
import {Subject} from "rxjs";
import {CookieService} from "ngx-cookie-service";
import {CookiesService} from "./cookies/cookies.service";
import {GenericRequest} from "../models/petition/petition.model";

@Injectable({
  providedIn: 'root'
})
export abstract class CrmService {
  protected httpOptions: any;
  protected observable: any;
  protected bodyRequest: GenericRequest | undefined;
  protected crmSubject: Subject<CrmResponse> = new Subject<CrmResponse>();
  protected postSubject: Subject<any> = new Subject();
  protected http: HttpClient | undefined;

  protected constructor(
    //private cookies: CookiesService, // De momento no me es necesario, la id lo propago
  ) {
    this.initDefaultParameters()
  }

  protected abstract onSuccess(response: any): void;

  protected abstract onError(error: any): void;

  protected generateBody(req: any) {
    console.log("en generateBody OFICIAL para ", req.Metodo, "\n",
      this.bodyRequest, req);
    // TODO -> comporbar que se monta el GenericRequest con los datos y sino rellenar unos validos por defecto

    this.bodyRequest = req;
    // @ts-ignore
    this.bodyRequest.Id = "undefined";

  }

  private initDefaultParameters() {
    this.httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/x-www-form-urlencoded'
      })
    };
    this.observable = {
      next: (response: any) => this.onSuccess(response),
      error: (error: any) => this.onError(error)
    };
  }

  public sendPost(url: string) {
    return this.http.post<CrmResponse>(url, this.bodyRequest, this.httpOptions);
  }
}
