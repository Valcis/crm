import { Component } from '@angular/core';
import {sharedDataService} from "../../../../shared/services/shared-data/shared-data.service";

@Component({
  selector: 'app-proveedores-producto',
  templateUrl: './proveedores-producto.component.html',
  styleUrls: ['./proveedores-producto.component.scss']
})
export class ProveedoresProductoComponent {
  constructor(protected _shared: sharedDataService) {
  }
}
