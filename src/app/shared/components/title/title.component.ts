import {Component, Injectable, Input} from '@angular/core';
import {LangChangeEvent, TranslateService} from "@ngx-translate/core";
import {BreadcrumbService} from "xng-breadcrumb";
import {sharedDataService} from "../../services/shared-data/shared-data.service";



@Injectable({
  providedIn: 'root'
})
@Component({
  selector: 'app-title',
  templateUrl: './title.component.html',
  styleUrls: ['./title.component.scss'],


})
export class TitleComponent {
  @Input() titulo: string= "";


  constructor(
    protected _translate: TranslateService,
    private breadcrumbService: BreadcrumbService,
    private _shared: sharedDataService
) {
  }
  ngOnInit(){
    this.setBread();

    this._translate.onLangChange.subscribe((event: LangChangeEvent) => {
      this.setBread();
    });
  }

  private setBread(){
    let menu = this._shared.userData.menu.menuList;

    this.breadcrumbService.set('@graficos',this._translate.instant(menu[0].descripcion));
    this.breadcrumbService.set('@inicioDesarrollador', this._translate.instant(menu[1].descripcion));
    this.breadcrumbService.set('@proveedoresProducto', this._translate.instant(menu[6].descripcion));
    this.breadcrumbService.set('@calendario', this._translate.instant(menu[8].descripcion));
    this.breadcrumbService.set('@actividades', this._translate.instant(menu[9].descripcion));
    this.breadcrumbService.set('@notificaciones', this._translate.instant(menu[10].descripcion));
    this.breadcrumbService.set('@links', this._translate.instant(menu[13].subMenu[1].descripcion));
    this.breadcrumbService.set('@channelManager', this._translate.instant(menu[13].subMenu[2].descripcion));
    this.breadcrumbService.set('@ficheros', this._translate.instant(menu[13].subMenu[0].descripcion));
    this.breadcrumbService.set('@proveedorAgencia', this._translate.instant(menu[14].subMenu[2].descripcion));
  }
}
