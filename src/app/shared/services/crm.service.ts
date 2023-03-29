import { Injectable } from '@angular/core';
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

  protected serviceRequest = 'servicios';
  protected methodRequest: string = "";
  //protected body: CrmBody;
  protected body: { setHistorial_cambios: undefined; Tipo: string; Metodo: string; ByPass?: string; recuerdame_id: string; Servicio: string; Id: string; setHistorialCambios?: string | undefined; Entrada?: any; URL: string };
  protected httpOptions: any;
  protected observable: any;
  protected bodyRequest : GenericRequest | undefined;

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
    //this.body.Id = this.cookies.getSessionId() !== undefined ? this.cookies.getSessionId() : '';
    this.body.Id = this.cookies.getSessionId() !== undefined ? this.cookies.getSessionId() : '';
    console.log("en generateBodyReq", this.body)
  }



  //TODO : el id deberia extraerse desde la cookie??? no seria mejor propagarlo desde el "controlador" usuario
  protected generateBody2(req: GenericRequest) {
    this.bodyRequest = req;
    this.body ={...req, Tipo:"", URL:"", recuerdame_id:"", setHistorial_cambios:undefined}

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
