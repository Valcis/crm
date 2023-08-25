import {Component, ElementRef, Injectable, Input, OnInit, ViewChild} from '@angular/core';

import {Title} from "@angular/platform-browser";

import {TranslateService} from "@ngx-translate/core";
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
    private _title: Title,
    protected _translate: TranslateService,
    private breadcrumbService: BreadcrumbService,
    private _shared: sharedDataService
) {
  }
  ngOnInit(){
    let shared = this._shared.userData;
    let menu = shared.menu.menuList;
    console.log("shared", menu);

    this.breadcrumbService.set('@graf', menu[0].descripcion);
    this.breadcrumbService.set('@initDev', menu[1].descripcion);
    this.breadcrumbService.set('@providers', menu[6].descripcion);
    this.breadcrumbService.set('@calendar', menu[8].descripcion);
    this.breadcrumbService.set('@activitiesList', menu[9].descripcion);
    this.breadcrumbService.set('@notificationList', menu[10].descripcion);
    this.breadcrumbService.set('@links', menu[13].subMenu[1].descripcion);
    this.breadcrumbService.set('@channelManager', menu[13].subMenu[2].descripcion);
    this.breadcrumbService.set('@files', menu[13].subMenu[0].descripcion);

  }
}
