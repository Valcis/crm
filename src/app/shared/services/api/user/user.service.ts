import {Injectable} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {CrmService} from "../crm.service";
import {LoginService} from "./login.service";
import {UserConfigService} from "./endpoints/user-config.service";
import {UserMenuService} from "./endpoints/user-menu.service";
import {LoginEntrada} from "../../../models/user/login.model";
import {ActivitiesAlertsService} from "./endpoints/activities-alerts.service";
import {NotificationsService} from "./endpoints/notifications.service";
import {CookiesService} from "../../cookies/cookies.service";
import {CrmLoaderService} from "../../crmLoader/crm-loader.service";
import {GenericIntranetResponse} from "../../../models/petition/petition.model";
import {DateTime} from "luxon";

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
    //console.log("USER. empezando a lanzar el retrieve user...")
    let petition;
    if (typeof (credenciales) !== "string") petition = this._login.sendGetLogin(credenciales);
    else petition = this._login.sendGetLoginById(credenciales);

    // @ts-ignore
    petition.subscribe(async (res: GenericIntranetResponse) => {
      //console.log("USER. retrieveUser petition  response ", res)
      const {Salida: {empl_code}, Id} = res;

      if (res.Status === "OK") {
        this.cookie.setSessionId(Id);
        this.userData.intranetDetails = res.Salida;

        //lanzamos peticion de datos de neo del usuario para lanzar la peti de baja
        this.userData.crmDetails = await this.getUsuarioByEmplCode(empl_code, Id);
        resolve(true)
      } else {
        this.cookie.deleteSessionId();
        resolve(false)
      }
    })
  });

  private getUsuarioByEmplCode = (empl_code: number, sessionId: string) => new Promise((resolve, reject) =>
    // @ts-ignore
    this._login.getUsuarioByEmplCode(empl_code, sessionId).subscribe((res: GenericIntranetResponse) => {
      //console.log("USER. getUsuarioByEmplCode response ", res)
      if (res.Status && res.Status !== "OK") reject(res.StatusMsg);
      //TODO -> testear esta situacion (forzar con malas credenciales en funct)
      else resolve(res.Salida.datos_peticion);
    })
  );

  public isDischarged = (neoId: number, emplCode: number, sessionId: string) => new Promise((resolve, reject) =>
    // @ts-ignore
    this._login.sendGetBajaTemporalUsuario(neoId, sessionId).subscribe(async (response: GenericIntranetResponse) => {
      console.log("getBajaTemporalUsuario response", response);
      // Compruebo si el usuario esta dado de baja. De no ser asi, lanzo peticiones con toda la info restante de usuario

      const {Status, Salida: {baja_temporal}} = response
      console.log("¿?¿?¿?¿?¿?¿", baja_temporal)

      if (Status === "OK") {
        if (baja_temporal) resolve(true);
        else {
          await Promise.all([
            this.getConfig(emplCode, sessionId),
            this.getMenu(sessionId),
            this.getActivitiesAlert(neoId, emplCode, sessionId),
            this.getNotifications(sessionId),
          ]).then(([config, menu, activities, notif]) => {

            this.userData.intranetSettings = config;
            this.userData.menu = menu;
            this.userData.activities = activities;
            this.userData.notifications = notif;
            resolve(false);
          })
        }
      } else reject("sendGetConfig : credenciales erroneas")
    })
  );

  private getConfig = (empl_code: number, sessionId: string) => new Promise((resolve, reject) =>
    this._userConfig.sendGetConfig({id: empl_code.toString()}, sessionId).subscribe(
      // @ts-ignore
      (response: GenericIntranetResponse) => {
        //console.log("sendGetConfig response", response);
        const {Status, Salida} = response
        if (Status && Status === "OK") resolve(Salida)
        else reject("sendGetConfig : credenciales erroneas")
      })
  );

  private getMenu = (sessionId: string) => new Promise((resolve, reject) =>
    this._userMenu.sendGetMenu(sessionId).subscribe(
      // @ts-ignore
      (response: GenericIntranetResponse) => {
        //console.log("sendGetMenu response", response);
        if (response.Salida) resolve(response.Salida)
        else reject("sendGetMenu : credenciales erroneas")
      })
  );

  private getActivitiesAlert = (neoId: number, emplCode: number, sessionId: string) => new Promise((resolve, reject) => {
     const entrada = {
      tiposActividad: ["Llamada", "Tarea", "Evento", "ActCompras"],
      estadoActividad: "pendiente",
      favoritaActividad: false,
      comentarioActividad: "",
      fechaActividad: DateTime.now().startOf("day"),
      fechaActividadFin: DateTime.now().endOf("day"),
      neoIdUsuarioActividad: neoId,
      motivoLlamadaActividad: "",
      nombreEvento: "",
      nombreTarea: "",
      tipoNota: "",
      tiposReferencia: [],
      pagina: "1",
      num_resultados: "100",
      orden: "fecha",
      tipo_orden: "ASC",
      tipoActividad: "MIAS"
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
