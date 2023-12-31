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
import {CrmLoaderService} from "../../crm-loader/crm-loader.service";
import {GenericIntranetResponse} from "../../../models/petition.model";
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
    petition.subscribe(async (response: GenericIntranetResponse) => {
        //console.log("USER. retrieveUser petition  response ", response)
        const {Salida: {empl_code}, Id} = response;

        if (response.Status === "OK") {
          this.cookie.setSessionId(Id);
          this.userData.intranetDetails = response.Salida;

          //lanzamos peticion de datos de neo del usuario para lanzar la peti de baja
          try {
            this.userData.crmDetails = await this.getUserByEmplCode(empl_code, Id);
            const isDischarged = await this.isDischarged(this.userData.crmDetails.metadata.neo_id, empl_code, Id);
            if (!isDischarged) resolve("OK");
            else resolve("Usuario temporalmente dado de baja");
          } catch (error) {
            reject(error);
          }
        } else {
          this.cookie.deleteSessionId();
          resolve("Usuario no encontrado con esas credenciales");
        }
      },
      error => reject("sendGetLogin : intento de conexion fallido"));
  });

  private getUserByEmplCode = (empl_code: number, sessionId: string) => new Promise((resolve, reject) => {
    this._login.getUsuarioByEmplCode(empl_code, sessionId).subscribe(
      // @ts-ignore
      (response: GenericIntranetResponse) => {
        //console.log("USER. getUsuarioByEmplCode response ", response)
        const {Status, StatusMsg, Salida} = response;
        if (Status && Status == "OK") resolve(Salida.datos_peticion);
        else reject("getUsuarioByEmplCode : peticion con datos erroneos");
      },
      error => reject("Fallo al intentar peticion getUsuarioByEmplCode"));
  });

  private isDischarged = (neoId: number, emplCode: number, sessionId: string) => new Promise((resolve, reject) => {
    this._login.sendGetBajaTemporalUsuario(neoId, sessionId).subscribe(
      // @ts-ignore
      async (response: GenericIntranetResponse) => {
        //console.log("getBajaTemporalUsuario response", response);

        // Compruebo si el usuario esta dado de baja. De no ser asi, lanzo peticiones con toda la info restante de usuario
        if (response.Status === "OK") {
          if (response.Salida.baja_temporal) resolve(true);
          else {
            await Promise.all([
              this.getConfig(emplCode, sessionId),
              this.getMenu(sessionId),
              this.getActivitiesAlert(neoId, emplCode, sessionId),
              this.getNotifications(neoId, sessionId),
            ]).then(([config, menu, activities, notif]) => {

              this.userData.intranetSettings = config;
              this.userData.menu = menu;
              this.userData.activities = activities;
              this.userData.notifications = notif;
              resolve(false);
            }).catch(reject); // === catch(err => reject(err))
          }
        } else reject("sendGetBajaTemporalUsuario : " + response.StatusMsg);
      },
      error => reject("Fallo al intentar peticion sendGetBajaTemporalUsuario"));
  });

  private getConfig = (empl_code: number, sessionId: string) => new Promise((resolve, reject) => {
    this._userConfig.sendGetConfig(empl_code, sessionId).subscribe(
      // @ts-ignore
      (response: GenericIntranetResponse) => {
        //console.log("sendGetConfig response", response);
        const {Status, Salida} = response;
        if (Status && Status === "OK" && Salida) resolve(Salida);
        else reject("sendGetConfig : credenciales erroneas");
      },
      error => reject("Fallo al intentar peticion sendGetConfig"));
  });

  private getMenu = (sessionId: string) => new Promise((resolve, reject) => {
    this._userMenu.sendGetMenu(sessionId).subscribe(
      // @ts-ignore
      (response: GenericIntranetResponse) => {
        //console.log("sendGetMenu response", response);
        if (!response.Status) resolve(response.Salida);
        else reject("sendGetMenu : " + response.Salida.mensaje);
      },
      error => reject("Fallo al intentar peticion sendGetMenu"));
  });

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

    this._activitiesAlert.sendGetActAlert(entrada, sessionId).subscribe(
      // @ts-ignore
      (response: GenericIntranetResponse) => {
        //console.log("getActividadesAlertas", response);
        if (response && response.Status == "OK") resolve(response.Salida);
        else reject("sendGetActAlert : peticion con datos erroneos");
      },
      error => reject("Fallo al intentar peticion sendGetActAlert"));
  });

  private getNotifications = (neoId: number, sessionId: string) => new Promise((resolve, reject) => {
    const entrada = {
      "tipo_modulo": "",
      "nombre": "",
      "leida": "",
      "tipo": [],
      "neo_id": neoId,
      "pagina": "1",
      "num_resultados": "1000",
      "orden": "fecha_creacion_ts",
      "tipo_orden": "DESC"
    };

    this._notifications.sendGetNotifications(entrada, sessionId).subscribe(
      // @ts-ignore
      (response: GenericIntranetResponse) => {
        //console.log("getNotifications", response);
        if (response && response.Status == "OK") resolve(response.Salida);
        else reject("sendGetNotifications : peticion con datos erroneos");
      },
      error => reject("Fallo al intentar peticion sendGetNotifications"));
  });

}
