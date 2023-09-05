import {Injectable} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {CrmService} from "../crm.service";
import {LoginService} from "./login.service";
import {UserConfigService} from "./user-config.service";
import {UserMenuService} from "./user-menu.service";
import {LoginEntrada} from "../../../models/user/login.model";
import {ActivitiesAlertsService} from "./activities-alerts.service";
import {NotificationsService} from "./notifications.service";
import {CookiesService} from "../../cookies/cookies.service";
import {CrmLoaderService} from "../../crmLoader/crm-loader.service";
import {GenericIntranetResponse} from "../../../models/petition/petition.model";

@Injectable({
  providedIn: 'root'
})
export class UserService extends CrmService {
  public userData: any = {};

  constructor(
    private cookie: CookiesService,
    private _http: HttpClient,
    private _login: LoginService,
    private _userConfig: UserConfigService,
    private _userMenu: UserMenuService,
    private _activitiesAlert: ActivitiesAlertsService,
    private _notifications: NotificationsService,
    private _loader: CrmLoaderService
  ) {
    super(_http);
  }

  public retrieveUser = (credenciales: LoginEntrada | string) => new Promise((resolve, reject) => {
    console.log("USER. empezando a lanzar el retrieve user...")
    let petition
    if (typeof (credenciales) !== "string") {
      //console.log("lanza SENDGETLOGIN con usuario y pass : ", credenciales)
      petition = this._login.sendGetLogin(credenciales);
    } else {
      //console.log("lanza SENDGETLOGINBYID con sessionId : ", credenciales)
      petition = this._login.sendGetLoginById(credenciales);
    }

    // @ts-ignore
    petition.subscribe(async (res: GenericIntranetResponse) => {
      //console.log("USER. retrieveUser petition  response ", res)
      const {Salida: {empl_code}, Id} = res

      if (res.Status === "OK") {
        this.cookie.setSessionId(Id);
        this.userData.detalles = res.Salida

        // al saber que es valido el intento de login, conseguimos el resto de datos haciendo las llamadas
        // pertientes con estas credenciales (validadas ya) y seteando los datos a los atributos de esta clase.

        await Promise.all([
          this.getUsuarioByEmplCode(empl_code, Id),
          this.getConfig(empl_code, Id),
          this.getMenu(Id),
          //this.getActivitiesAlert(),
          //this.getBajaTemporalUsuario() ??????
          this.getNotifications(Id),
        ]).then(([neoData, config, menu, notif]) => {
          this.userData.neo = neoData;
          this.userData.configuraciones = config;
          this.userData.menu = menu;
          this.userData.notificaciones = notif;
        })

        resolve(true)
      } else {
        this.cookie.deleteSessionId();
        resolve(false)
      }
    })
  });

  public getUsuarioByEmplCode = (empl_code: number, sessionId: string) => new Promise((resolve, reject) =>
    // @ts-ignore
    this._login.getUsuarioByEmplCode(empl_code, sessionId).subscribe((res: GenericIntranetResponse) => {
      //console.log("USER. getUsuarioByEmplCode response ", res)

      if (res.Status && res.Status !== "OK") {
        reject(res.StatusMsg)
        //TODO -> testear esta situacion (forzar con malas credenciales en funct)
      } else resolve(res.Salida.datos_peticion)
    })
  )

  private getConfig = (empl_code: number, sessionId: string) => new Promise((resolve, reject) =>
    this._userConfig.sendGetConfig({id: empl_code.toString()}, sessionId).subscribe(
      // @ts-ignore
      (response: GenericIntranetResponse) => {
        //console.log("sendGetConfig response", response);
        const {Status, Salida} = response
        if (Status && Status === "OK") resolve(Salida)
        else reject("sendGetConfig : credenciales erroneas")
      })
  )

  private getMenu = (sessionId: string) => new Promise((resolve, reject) =>
    this._userMenu.sendGetMenu(sessionId).subscribe(
      // @ts-ignore
      (response: GenericIntranetResponse) => {
        //console.log("sendGetMenu response", response);
        if (response.Salida) resolve(response.Salida)
        else reject("sendGetMenu : credenciales erroneas")
      })
  );

  private getActivitiesAlert = (sessionId: string) => new Promise((resolve, reject) => {
    // TODO :> generar dinamicamente, de momento harcoded:
    const entrada = {
      "tiposActividad": [
        "Llamada",
        "Tarea",
        "Evento",
        "ActCompras"
      ],
      "estadoActividad": "pendiente",
      "favoritaActividad": false,
      "comentarioActividad": "",
      "fechaActividad": "1681934400000",
      "fechaActividadFin": "1682020799059",
      "neoIdUsuarioActividad": 145272,
      "motivoLlamadaActividad": "",
      "nombreEvento": "",
      "nombreTarea": "",
      "tipoNota": "",
      "tiposReferencia": [],
      "pagina": "1",
      "num_resultados": "1000",
      "orden": "fecha",
      "tipo_orden": "ASC",
      "tipoActividad": "MIAS"
    };
    // @ts-ignore
    this._activitiesAlert.sendGetActAlert(entrada, sessionId).subscribe((response: GenericIntranetResponse) => {
      console.log("getActividadesAlertas", response);
      if (response.Salida) resolve(response.Salida)
      else reject("fallo en getActivitiesAlert")
    })

  });

  private getNotifications = (sessionId: string) => new Promise((resolve, reject) => {
    // TODO :> generar dinamicamente, de momento harcoded:
    const entrada = {
      "tipo_modulo": "",
      "nombre": "",
      "leida": "",
      "tipo": [],
      "neo_id": 145272,
      "pagina": "1",
      "num_resultados": "1000",
      "orden": "fecha_creacion_ts",
      "tipo_orden": "DESC"
    };
    // @ts-ignore
    this._notifications.sendGetNotifications(entrada, sessionId).subscribe((response: GenericIntranetResponse) => {
      //console.log("getNotifications", response);
      if (response.Salida) resolve(response.Salida)
      else reject("falllo en getNotifications")
    })
  });

}
