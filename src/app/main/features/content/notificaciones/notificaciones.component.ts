import { Component } from '@angular/core';
import {sharedDataService} from "../../../../shared/services/shared-data/shared-data.service";

@Component({
  selector: 'app-notificaciones',
  templateUrl: './notificaciones.component.html',
  styleUrls: ['./notificaciones.component.scss']
})
export class NotificacionesComponent {
  protected title:string = "";
  constructor(protected _shared: sharedDataService) {
  this.title = _shared.userData.menu.menuList[10].descripcion;
  }
}
