import { Component } from '@angular/core';
import {sharedDataService} from "../../../../shared/services/shared-data/shared-data.service";

@Component({
  selector: 'app-actividades',
  templateUrl: './actividades.component.html',
  styleUrls: ['./actividades.component.scss']
})
export class ActividadesComponent {
  protected title:string="";
  constructor(protected _shared: sharedDataService) {
    this.title = _shared.userData.menu.menuList[9].descripcion;
  }
}
