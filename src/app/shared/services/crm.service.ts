import { Injectable } from '@angular/core';
import {CrmBody, CrmResponse} from "../models/crm.model";
import {HttpClient, HttpHeaders, HttpParams} from "@angular/common/http";
import {Subject} from "rxjs";
import {CookieService} from "ngx-cookie-service";
import {CookiesService} from "./cookies/cookies.service";

@Injectable({
  providedIn: 'root'
})
export abstract class CrmService {

  protected serviceRequest = 'servicios';
  protected methodRequest: string = "";
  protected body: CrmBody;
  protected httpOptions: any;
  protected observable: any;

  protected crmSubject: Subject<CrmResponse> = new Subject<CrmResponse>();
  protected postSubject: Subject<any> = new Subject();


  protected constructor(
    private http: HttpClient,
    private cookies: CookiesService,
  ) {
    this.body = new CrmBody();
    this.initDefaultParameters()
  }

  protected abstract onSuccess(response: any): void;

  protected abstract onError(error: any): void;

  protected generateBody(inRQ: any) {

    this.body.ByPass = 'usuario';
    this.body.Servicio = this.serviceRequest;
    this.body.Metodo = this.methodRequest;
    this.body.Tipo = '';
    this.body.Entrada = inRQ;
    this.body.setHistorial_cambios = undefined;
    this.body.recuerdame_id = '';
    this.body.URL = '';
    this.body.Id = this.cookies.getSessionId() !== undefined ? this.cookies.getSessionId() : '';
    console.log("en generateBodyReq", this.body)
  }


  protected generateBody2(inRQ: any) {

    this.body.ByPass = 'usuario';
    this.body.Servicio = "menu";
    this.body.Metodo = "GetMenu";
    this.body.Tipo = '';
    this.body.Entrada = {
      "app": "CRM"
    };
    this.body.setHistorial_cambios = undefined;
    this.body.recuerdame_id = '';
    this.body.URL = '';
    this.body.Id = this.cookies.getSessionId() !== undefined ? this.cookies.getSessionId() : '';
    console.log("en generateBodyReq", this.body)
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

  protected sendPost(url: string) {
    let resp = this.http.post<CrmResponse>(url, this.body, this.httpOptions);
    return resp;
  }
}
