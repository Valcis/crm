import {Component, ViewEncapsulation} from '@angular/core';
import {CrmLoaderService} from "../../services/crmLoader/crm-loader.service";

@Component({
  selector: 'app-crm-loader',
  templateUrl: './crm-loader.component.html',
  styleUrls: ['./crm-loader.component.css'],
  encapsulation: ViewEncapsulation.ShadowDom
})

export class CrmLoaderComponent {
  constructor(public loader: CrmLoaderService) {
  }
}
