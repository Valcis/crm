import {Injectable} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {CrmService} from "../crm.service";
import {LoginService} from "./login.service";
import {UserConfigService} from "./user-config.service";
import {UserMenuService} from "./user-menu.service";
import {LoginEntrada} from "../../models/user/login.model";
import {ActivitiesAlertsService} from "./activities-alerts.service";
import {NotificationsService} from "./notifications.service";
import {CookiesService} from "../cookies/cookies.service";

@Injectable({
  providedIn: 'root'
})
export class UserService extends CrmService {
  public userData: any = {};
  private localdata: any;

  constructor(
    private cookie: CookiesService,
    private _http: HttpClient,
    private _login: LoginService,
    private _userConfig: UserConfigService,
    private _userMenu: UserMenuService,
    private _activitiesAlert: ActivitiesAlertsService,
    private _notifications: NotificationsService
  ) {
    super(_http);
  }

  public retrieveUser = (credenciales: LoginEntrada) => new Promise((resolve, reject) => {
    //console.log("credenciales ", credenciales);
    this._login.sendGetLogin(credenciales).subscribe(response => {
      this.localdata = response;
      console.log("retrieveUser", this.localdata.Id);
      if (this.localdata.Status && this.localdata.Status === "OK") {
        this.cookie.setSessionId(this.localdata.Id);
        this.userData.details = this.localdata.Salida;
        //console.log("NUEVOS DATOS USUARIO", this.userData)
        resolve(this.cookie.getSessionId().length > 0)
      } else reject("no user id");
    });

  });

  public getConfig() {
    if (this.cookie.getSessionId().length)
      this._userConfig.sendGetConfig({id: this.userData.details.empl_code}, this.cookie.getSessionId()).subscribe(response => {
        //console.log("getConfig", response);
        this.localdata = response;
        if (this.localdata.Status && this.localdata.Status === "OK") {
          this.userData.config = this.localdata.Salida;
          //console.log("NUEVOS DATOS USUARIO", this.userData)
        } else {
          // TODO : lanzar toast con mensaje like "error al cargar la configuracion del usuario"
          console.error("credenciales erroneas")
        }
      })
  }

  public getMenu() {
    if (this.cookie.getSessionId().length)
      this._userMenu.sendGetMenu(this.cookie.getSessionId()).subscribe(response => {
        //console.log("getMenu", response);
        this.localdata = response;
        if (this.localdata.Salida) {
          this.userData.menu = this.localdata.Salida;
          //console.log("NUEVOS DATOS USUARIO", this.userData)
        } else {
          // TODO : lanzar toast con mensaje de "XXXX???"
        }
      })
  }

  public getActivitiesAlert() {
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
    }
    if (this.cookie.getSessionId().length)
      this._activitiesAlert.sendGetActAlert(entrada, this.cookie.getSessionId()).subscribe(response => {
        //console.log("getActividadesAlertas", response);
        this.localdata = response;
        if (this.localdata.Salida) {
          this.userData.activities = this.localdata.Salida;
          //console.log("NUEVOS DATOS USUARIO", this.userData)
        } else {
          // TODO : lanzar toast con mensaje de "XXXX???"
        }
      })
  }

  public getNotifications() {
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
    if (this.cookie.getSessionId().length)
      this._notifications.sendGetNotifications(entrada, this.cookie.getSessionId()).subscribe(response => {
        //console.log("getNotifications", response);
        this.localdata = response;
        if (this.localdata.Salida) {
          this.userData.notifications = this.localdata.Salida;
          //console.log("NUEVOS DATOS USUARIO", this.userData)
        } else {
          // TODO : lanzar toast con mensaje de "XXXX???"
        }
      })
  }


}
